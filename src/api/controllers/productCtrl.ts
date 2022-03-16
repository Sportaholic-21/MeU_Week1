import { getSortOrder, validateProductInput } from "../../helpers/productHelpers"
const db = require('../../config/database.js')

//  GET
const getProductListing = async (req: any, res: any) => {
    try {
        //  pagination variables
        let page = req.query.page || 1
        let size = req.query.size || 10
        let offset = (page - 1) * size
        // query
        const productList = await db.query("SELECT * FROM product LIMIT ?, ?", [offset, size])
        // sort & dir
        let sort = req.query.sort || "id"
        let dir = req.query.dir || "asc"
        productList.sort(getSortOrder(sort))
        if (dir == "desc") {
            productList.reverse()
        }
        return res.status(200).json(productList)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getProduct = async (req: any, res: any) => {
    try {
        const product = await db.query("SELECT * FROM product WHERE code=?", req.params.code)
        if (product.length < 1) {
            return res.status(500).json("Product not found")
        }
        return res.json(product)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getProductCount = async (req: any, res: any) => {
    try {
        let count = await db.query("SELECT COUNT(*) FROM product", [])
        let output
        for (var i in count[0]) {
            output = count[0][i]
        }
        console.log(output)
        return res.json(output)
    } catch (error) {
        return res.sendStatus(404)
    }

}

//  POST
const createProduct = async (req: any, res: any) => {
    try {
        const productInput = req.body
        try {
            validateProductInput(productInput)
            if (!productInput.code) {
                throw new Error("No product code is provided")
            }
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
        const { code, name, category, brand, type, description } = productInput
        const created_at = Date().toString()
        const sql = `INSERT INTO product (code, name, category, brand, type, description, created_at)
                     VALUES (@code, @name, @category, @brand, @type, @description, @created_at)`
        const result = await db.run(sql, { code, name, category, brand, type, description, created_at })
        let message = 'Error in creating product';
        if (result.changes) {
            message = 'Product created successfully';
        }
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

//  PUT
const updateProduct = async (req: any, res: any) => {
    try {
        const productInput = req.body
        const code = req.params.code
        try {
            validateProductInput(productInput)
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
        const { name, category, brand, type, description } = productInput
        const updated_at = Date().toString()
        const sql = `
                        UPDATE product 
                        SET name = @name, 
                            category = @category, 
                            brand = @brand, 
                            type = @type, 
                            description = @description, 
                            updated_at = @updated_at
                        WHERE code = @code
                    `
        const result = await db.run(sql, { code, name, category, brand, type, description, updated_at })
        let message = 'Error in updating product';
        if (result.changes) {
            message = 'Product updated successfully';
        }
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// DELETE
const deleteProduct = async (req: any, res: any) => {
    try {
        const code = req.params.code
        if (!code) {
            throw new Error("No product code is provided")
        }
        const sql = `
                        DELETE FROM product
                        WHERE code = @code
                    `
        const result = await db.run(sql, { code })
        let message = 'Error in deleting product';
        if (result.changes) {
            message = 'Product deleted successfully';
        }
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export {
    getProductListing,
    getProduct,
    getProductCount,
    createProduct,
    updateProduct,
    deleteProduct
}
import { getSortOrder, validateProductInput } from "../../helpers/productHelpers"
import { db } from '../../config/database'

//  GET
const getProductListing = async (req: any, res: any) => {
    try {
        //  pagination variables
        let page = req.query.page || 1
        let size = req.query.size || 10
        let offset = (page - 1) * size
        // sort & dir
        let sort = req.query.sort || "id"
        let dir = req.query.dir || "asc"
        // query
        const sql =
            `SELECT * FROM product ORDER BY ${sort} ${dir} LIMIT ${size} OFFSET ${offset} `
        db.query(sql, (err, productList) => {
            if (err) throw err;
            return res.status(200).json(productList)
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getProduct = async (req: any, res: any) => {
    try {
        const sql = `SELECT * FROM product WHERE code = '${req.params.code}'`
        let query = db.query(sql, (err, product) => {
            if (err) throw err
            if (product.length < 1) return res.status(500).json("No product found")
            console.log(product)
            return res.json(product)
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getProductCount = async (req: any, res: any) => {
    try {
        db.query("SELECT COUNT(*) FROM product", (err, result) => {
            if (err) throw err;
            console.log(result)
            return res.json(result)
        })
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
                     VALUES ('${code}', '${name}', '${category}', '${brand}', '${type}', '${description}', '${created_at}')`
        let query = db.query(sql, (err, result) => {
            if (err) throw err
            return res.status(200).json('Product created successfully')
        })
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
                        SET name = '${name}', 
                            category = '${category}', 
                            brand = '${brand}', 
                            type = '${type}', 
                            description = '${description}', 
                            updated_at = '${updated_at}'
                        WHERE code = '${code}'
                    `
        let query = db.query(sql, (err, result) => {
            if (err) throw err
            return res.status(200).json('Product updated successfully')
        })
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
                        WHERE code = '${code}'
                    `
        let query = db.query(sql, (err, result) => {
            if (err) throw err
            return res.status(200).json('Product deleted successfully')
        })
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
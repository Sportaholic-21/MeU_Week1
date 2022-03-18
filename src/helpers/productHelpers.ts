function getSortOrder(prop: any) {
    return function (a: any, b: any) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

function validateProductInput (product: any) {
    let messages = []

    if (!product) {
        messages.push("No product is provided")
    } else {
        if (!product.code) {
            messages.push("No product code is provided")
        }
    
        if (!product.name) {
            messages.push("No product name is provided")
        }
    
        if (!product.category) {
            messages.push("No product category is provided")
        }
    
        if (!product.brand) {
            messages.push("No product brand is provided")
        }
    
        if (!product.type) {
            messages.push("No product type is provided")
        }
    
        if (!product.description) {
            messages.push("No product description is provided")
        }
    }

    return messages
}

export { getSortOrder, validateProductInput }
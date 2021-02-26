
const service = require('../../models/admin/products.model');

const getProducts = async (req, res, next) => {
    try {
        
        const result = await service.getProducts();

        if(result && result.length > 0)
            res.json({ products: result });
        else 
            res.json({ message: 'Error to get products.' });

    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = {
    getProducts
}

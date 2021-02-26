
const service = require('../../models/admin/customers.model');

const getCustomers = async(req, res, next) => {
    try {
        
        const result = await service.getCustomers();

        if(result && result.length > 0) {
            res.json({ customers: result });
        } else {
            res.json({ message: 'Error to get all customers.' });
        }

    } catch (error) {
        res.sendStatues(500);
    }
}

module.exports = {
    getCustomers
}

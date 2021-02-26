
const { Router } = require('express');
const router = new Router();
const {
    getCustomers
} = require('../../controllers/admin/customers.controller');

router.get('/', getCustomers);

module.exports = router;


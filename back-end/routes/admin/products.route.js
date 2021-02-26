
const { Router } = require('express');
const router = new Router();

const {
    getProducts
} = require('../../controllers/admin/products.controller');

router.get('/', getProducts);

module.exports = router;

const { Router } = require('express');
const router = new Router();

const {
    getOrder,
    createOrder,
    getAllOrders,
    deleteOrder
} = require('../../controllers/admin/orders.controller');

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrder);
router.delete('/:id', deleteOrder);

module.exports = router;

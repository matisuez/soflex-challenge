
const serviceOrders = require('../../models/admin/orders.model');

const createOrder = async (req, res, next) => {
    try {
        
        const orderToCreate = req.body;
        console.log(orderToCreate)
        const result = await serviceOrders.createOrder(orderToCreate);

        if(result) {
            res.json({ pedidoId: result});
        } else {
            res.json({ message: 'Error to create the order.' });
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getAllOrders = async(req, res, next) => {
    try {
        
        const resultOrders = await serviceOrders.getOrders();

        if(resultOrders && resultOrders.length > 0)
            res.json({ pedidos: resultOrders });
        else 
            res.json({ message: 'Error to get orders.' });


    } catch (error) {
        res.sendStatus(500);
    }
}

const getOrder = async (req, res, next) => {
    try {
        
        const {id: pedidoId} = req.params;

        const order = await serviceOrders.getOrder(pedidoId);

        if(order && order.length > 0) {
            
            const orderDetails = await serviceOrders.getOrderDetails(pedidoId);
            Object.assign( order, { details: orderDetails} );
            
            if(order.details && order.details.length > 0) 
                res.json({ order });
            else
                res.json({ message: 'Error to get order details.' });

        } else {
            res.json({ message: 'Error to get order.' });
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        
        const { id: pedidoId } = req.params;
        const result = await serviceOrders.deleteOrder(pedidoId);

        if(result)
            res.json({ pedidoId: result });
        else 
            res.json({ message: 'Error to delete the order.' });

    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = {
    getOrder,
    createOrder,
    getAllOrders,
    deleteOrder
}

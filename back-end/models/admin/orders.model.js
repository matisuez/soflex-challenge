
const knex = require('../../utils/db');
const {
    DB_T_PEDIDOS,
    DB_T_CLIENTES,
    DB_T_PEDIDOS_DETALLE
} = process.env;

const createOrder = async(obj) => {
    try {
        
        let orderId = [];

        const result = await knex.transaction(async trx => {
            console.log(obj);
            const idOrder = await knex(DB_T_PEDIDOS).insert({ 
                fecha: obj.fecha,
                clienteId: obj.clienteId
            }).transacting(trx);

            orderId.push(idOrder[0]);

            obj.detallePedido.map( dp => {
                delete dp.descripcion;
                Object.assign(dp, { pedidoId: orderId[0] });
            });

            const orderDetailId = await knex(DB_T_PEDIDOS_DETALLE)
                .insert(obj.detallePedido)
                .transacting(trx);

        });

        return orderId;

    } catch (error) {
        throw error;
    }
}

const getOrders = async() => {
    try {

        const result = await knex(DB_T_PEDIDOS)
            .select(
                `${DB_T_PEDIDOS}.pedidoId`,
                `${DB_T_PEDIDOS}.fecha`,
                `${DB_T_CLIENTES}.clienteId`,
                `${DB_T_CLIENTES}.nombre`,
            )

            .innerJoin(
                `${DB_T_CLIENTES}`,
                `${DB_T_PEDIDOS}.clienteId`,
                `${DB_T_CLIENTES}.clienteId`,
            )

            .where(`${DB_T_PEDIDOS}.available`, 1);

        return result;

    } catch (error) {
        throw error;
    }
}

const getOrder = async(id) => {
    try {
        
        const result = await knex(DB_T_PEDIDOS)
            .select(
                `${DB_T_PEDIDOS}.pedidoId`,
                `${DB_T_PEDIDOS}.clienteId`,
                `${DB_T_PEDIDOS}.fecha`,
            )
            .where(`${DB_T_PEDIDOS}.pedidoId`, id)
            .andWhere(`${DB_T_PEDIDOS}.available`, 1);
                console.log(result);
        return result;


    } catch (error) {
        throw error;
    }
}

const getOrderDetails = async (id) => {
    try {
        
        const result = await knex(DB_T_PEDIDOS_DETALLE)
            .select(
                `${DB_T_PEDIDOS_DETALLE}.detalleId`,
                `${DB_T_PEDIDOS_DETALLE}.productoId`,
                `${DB_T_PEDIDOS_DETALLE}.cantidad`,
                `${DB_T_PEDIDOS_DETALLE}.precio`,
            )
            .where(`${DB_T_PEDIDOS_DETALLE}.pedidoId`, id)
            .andWhere(`${DB_T_PEDIDOS_DETALLE}.available`, 1);

        return result;

    } catch (error) {
        throw error;
    }
}

const deleteOrder = async (id) => {
    try {
        
        const result = await knex(DB_T_PEDIDOS)
            .where(`${DB_T_PEDIDOS}.pedidoId`, id)
            .andWhere(`${DB_T_PEDIDOS}.available`, 1)
            .update({
                available: 0
            });
        
        return result;
        
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getOrder,
    getOrderDetails,
    createOrder,
    getOrders,
    deleteOrder
}

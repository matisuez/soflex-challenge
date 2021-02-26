
const knex = require('../../utils/db');
const {
    DB_T_PRODUCTOS
} = process.env;

const getProducts = async () => {
    try {
        
        const result = await knex(DB_T_PRODUCTOS)
            .select(
                `${DB_T_PRODUCTOS}.productoId`,
                `${DB_T_PRODUCTOS}.descripcion`,
                `${DB_T_PRODUCTOS}.precio`
            );

        return result;

    } catch (error) {
        throw error;
    }
}


module.exports = {
    getProducts
}
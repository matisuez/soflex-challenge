
const knex = require('../../utils/db');
const {
    DB_T_CLIENTES
} = process.env;

const getCustomers = async () => {
    try {
        
        const result = await knex(DB_T_CLIENTES)
            .select(
                `${DB_T_CLIENTES}.clienteId`,
                `${DB_T_CLIENTES}.nombre`,
            )

        return result;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCustomers
}

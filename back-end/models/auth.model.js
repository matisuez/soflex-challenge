
const knex = require('../utils/db');
const { 
    DB_T_USUARIOS
} = process.env;

const authenticate = async (obj) => {
    try {
        
        const result = await knex(DB_T_USUARIOS)
            .select(
                `${DB_T_USUARIOS}.usuarioId`,
                `${DB_T_USUARIOS}.email`,
                `${DB_T_USUARIOS}.role`,
            )
            .where(`${DB_T_USUARIOS}.email`, obj.email)
            .andWhere(`${DB_T_USUARIOS}.password`, obj.password)
            .andWhere(`${DB_T_USUARIOS}.available`, 1)

        return result;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    authenticate
}

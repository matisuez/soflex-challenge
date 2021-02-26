
const service = require('../models/auth.model');
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const authUser = async(req, res, next) => {
    try {
        
        const { email, password } = req.body;

        const result = await service.authenticate({ email, password: sha1(password) });

        if(result && result.length > 0) {
            
            const { usuarioId, email, role } = result[0];

            const payload = { usuarioId, email, role };
            const privateKey = fs.readFileSync('./utils/keys/private.pem', 'utf-8');
            const signOptions = { expiresIn: '8h', algorithm: 'RS256' };

            const token = jwt.sign( payload, privateKey, signOptions);

            res.json({ token });

        } else {
            res.json({ message: 'Error to authenticate.' });
        }

    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = {
    authUser
}
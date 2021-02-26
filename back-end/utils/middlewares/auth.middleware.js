const jwt = require('jsonwebtoken');
const fs = require('fs');

securedAdmin = (req, res, next) => {
    try {
        
        let token = req.headers.authorization;
        token = token.replace('Bearer ', '');
        
        const publicKey = fs.readFileSync('./utils/keys/public.pem');
        const decoded = jwt.verify(token, publicKey);

        req.usuarioId = decoded.usuarioId;
        req.email = decoded.email;
        req.role = decoded.role;
        
        req.usuarioId ? next() : res.status(401).json({ message: 'Unauthorized.' });

    } catch (error) {
        res.sendStatus(401);
    }
}

module.exports = {
    securedAdmin
};

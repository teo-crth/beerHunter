const jwt = require('jsonwebtoken');
const debugLib = require('debug');
const { config } = require('dotenv');

config({ path: '.env' });

const debug = debugLib('app:jwtMiddleware');

const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    debug('Authorization Header', authHeader);


    if (!authHeader) {
        return res.status(401).json({
            message: 'Unauthorized, Header missing',
        });
    }

    const [scheme, token] = authHeader.split(' ');
    debug('Scheme', scheme);
    debug('Token', token);

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({
            message: 'Unauthorized, Invalid authorization format',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        debug('Decoded', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        debug('Error JWT token', error);
        return res.status(401).json({
            message: 'Unauthorized, Invalid token or expired',
        });
    }
};

module.exports = jwtMiddleware;
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');

config({ path: '.env.development' });

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    };

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1d',
    };

    const token = jwt.sign(payload, secret, options);
    return token;
}

module.exports = generateToken;
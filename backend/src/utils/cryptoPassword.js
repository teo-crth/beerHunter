const argon2 = require("argon2");
const crypto = require("crypto");

const hash = async (password) => {
    const salt = crypto.randomBytes(32);
    const hashPassword = argon2.hash(password, { salt });

    return hashPassword;
}

const compare = async (password, hashPassword) => {
    return argon2.verify(hashPassword, password);
}

module.exports = { hash, compare };
require("dotenv").config();
const jwt = require("jsonwebtoken");

//ma hoa 2 chieu

const generateToken = (user) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
    });
    return token;
};

const verifyToken = (token) => {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return data;
};

module.exports = {
    generateToken,
    verifyToken,
};

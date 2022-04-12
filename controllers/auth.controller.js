const res = require("express/lib/response");
const authService = require("../services/auth.service");
//

const login = async (req, res) => {
    const response = await authService.login(req.body);
    res.status(response.status).send(response.data);
};
const register = async (req, res) => {
    const response = await authService.register(req.body);
    res.status(response.status).send(response.data);
};

module.exports = {
    login,
    register,
};

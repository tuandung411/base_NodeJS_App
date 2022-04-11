const security = require("../utils/security");

const requireLogin = (req, res, next) => {
    try {
        const headerAuthorized = req.headers.authorization;
        console.log("auth", headerAuthorized);
        if (!headerAuthorized) {
            res.status(403).send("No token provided.");
        } else {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = security.verifyToken(token);
            if (decodedToken.user) {
                req.user = decodedToken.user;
                next();
            } else {
                res.status(401).send("Unauthorized");
            }
        }
    } catch (error) {
        console.log(error);
        res.status(401).send("Unauthorized");
    }
};

const requireRole = (role) => {
    const middleware = async (req, res, next) => {
        if (req.role == role) next();
        else {
            console.log(req.role);
            console.log(role);
            next("khong duoc cap quyen");
        }
    };
    return middleware();
};

module.exports = {
    requireLogin,
    requireRole,
};

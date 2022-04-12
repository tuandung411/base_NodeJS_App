const authRoute = require("./auth.route");

const route = (app) => {
    app.use("/api/auth", authRoute);
};

module.exports = route;

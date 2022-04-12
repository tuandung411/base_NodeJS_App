const db = require("../utils/db");
const security = require("../utils/security");

const md5 = require("md5");
const jwt = require("jsonwebtoken");
var token = "";

const login = async ({ username, password }) => {
    const sql = `select * from user where TaiKhoan = ? `;
    const user = await db.queryOne(sql, [username]);
    console.log(password, username);
    if (!user) {
        return {
            status: 401,
            data: "no info",
        };
    }
    console.log(user);
    // const passwordValid = await argon2.verify(user.matKhau, password);
    const passwordValid = md5(password);
    if (passwordValid !== user.matKhau) {
        return {
            status: 401,
            data: "incorrect",
        };
    }
    const accessToken = jwt.sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN_SECRET
    );
    console.log(accessToken);
    return {
        status: 200,
        data: { token: accessToken, user: user },
    };
};
const register = async ({
    name,
    username,
    password,
    phoneNumber,
    email,
    address,
}) => {
    if (!username || !password) {
        return {
            status: 401,
            data: "no info",
        };
    }
    try {
        const sql = `select * from user where TaiKhoan = ? `;
        const user = await db.queryOne(sql, [username]);
        if (user) {
            return {
                status: 402,
                data: "exist username",
            };
        }

        // const hashedPassword = await argon2.hash(password);
        const hashedPassword = md5(password);
        const sqlCreate = `insert into user(TaiKhoan,MatKhau,Ten,SDT,diaChi,email) VALUES(?,?,?,?,?,?)`;
        const newUser = await db.queryOne(sqlCreate, [
            username,
            [hashedPassword],
            name,
            phoneNumber,
            address,
            email,
        ]);

        // const accessToken = jwt.sign(
        //     { userId: user.name },
        //     process.env.ACCESS_TOKEN_SECRET
        // );
        return {
            status: 200,
            data: { user: newUser },
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            data: "error",
        };
    }
};

module.exports = {
    login,
    register,
};

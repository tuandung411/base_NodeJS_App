const pagination = (req, res, next) => {
    const {page, perPage} = req.query 
    req.pagination = {
        limit: parseInt(perPage) || 10,
        offset: parseInt((page)-1) * perPage || 0
    };
    next();
}

module.exports = pagination
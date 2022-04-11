const errorHandle = (err, req, res, next) => {
    console.log(err)
    if (err.code > 400 && err.code < 500){
        res.status(err.code)
        res.send(err.message)
    } else {
        res.status(400)
        res.send('Bad request')
    }
}

const pageNotFound = (req, res) => {
    res.status(400).send({
        message: 'Duong dan khong ton tai',
        originalUrl: req.originalUrl
    })
}

const tryCatch = (func) => async (req, res, next) => {
    try {
        await func(req, res)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    errorHandle,
    pageNotFound,
    tryCatch
}
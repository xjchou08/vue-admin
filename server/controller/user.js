exports.login = (req, res, next) => {
    try {
        res.status(200).send('login')
    } catch (err) {
        next(err)
    }
}

exports.getUser = (req, res, next) => {
    try {
        res.status(200).send('getUser')
    } catch (err) {
        next(err)
    }
}
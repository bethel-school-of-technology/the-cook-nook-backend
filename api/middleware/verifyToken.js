const jwt = require('jsonwebtoken')

module.exports

function verifyToken(req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).json({
            message: 'Unauthorized Request'
        })
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token == null){
        return res.status(401).json({
            message: 'Unauthorized Request'
        })
    }
    let payload = jwt.verify(token, process.env.JWT_KEY )
    if(!payload){
        return res.status(401).json({
            message: 'Unauthorized Request'
        })
    }
    req.id = payload.subject //was userId but not sure that matches
    next()
}
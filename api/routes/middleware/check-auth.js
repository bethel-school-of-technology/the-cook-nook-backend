const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{ //still trying to varify this works
        const token = req.cookies.jwt;
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
    } catch (err) {
        return res.status(401).json({
            message: 'failed'
        })
    }
    
    next();
}
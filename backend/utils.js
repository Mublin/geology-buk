const jwt = require('jsonwebtoken')


const generateToken = (user)=>{
    return jwt.sign({
        name: user.name,
        regNo: user.regNo,
        email: user.email
    }, process.env.JWTSECRET, {
        expiresIn: '7d'
    })
}

const isAuth = (req, res, next)=>{
    const {authorization }= req
    if (authorization) {
        const token = authorization.slice(7, authorization.length)
        jwt.verify(token, process.env.JWTSECRET, (err, decode)=>{
            if (err) {
                return res.status(401).send({message: "Invalid token"})
            }else{
                req.user = decode
                next()
            }
        })
    }else{
        return res.status(401).send({message: 'No token'})
    }
}

module.exports = {
    generateToken,
    isAuth
}
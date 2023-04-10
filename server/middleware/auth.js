const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Tidak ada tanda otorisasi!' })
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await Users.findOne({ _id }).select('_id')
        next()
        
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Tidak memiliki otorisasi' })
    }

}

module.exports = auth;
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

const signinUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await Users.signin(email, password)

        const token = createToken(user._id)

        res.status(200).json({user: { ...user._doc, password: '', token }})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

const signupUser = async (req, res) => {
    const {email, nickname, password} = req.body;

    try {
        const user = await Users.signup(email, nickname, password)

        const token = createToken(user._id)

        res.status(200).json({user: { ...user._doc, password: '', token  }})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = {
    signinUser,
    signupUser
}
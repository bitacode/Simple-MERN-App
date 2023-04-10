const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 10
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

// static signup
userSchema.statics.signup = async function (email, nickname, password) {

    if (!email || !password) {
        throw Error('Tidak boleh kosong!')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email salah!')
    }
    if (password.length < 6) {
        throw Error('Password tidak cukup!')
    }
    if (nickname.length > 10) {
        throw Error('Nama panggilan terlalu panjang!')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Anda sudah terdaftar')
    }

    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, nickname, password: hash})

    return user;
}

// static signin
userSchema.statics.signin = async function (email, password) {

    if (!email || !password) {
        throw Error('Tidak boleh kosong!')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Email salah!')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Password salah!');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema)
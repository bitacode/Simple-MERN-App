const Notes = require('../models/noteModel');
const mongoose = require('mongoose');

const getNotes = async (req, res) => {
    const user_id = req.user._id

    const notes = await Notes.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(notes)
}

const getNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Catatan tidak ditemukan' })
    }

    const note = await Notes.findById(id)

    if(!note) {
        return res.status(404).json({ error: 'Catatan tidak ditemukan' })
    }

    res.status(200).json(note)
}

const createNote = async (req, res) => {
    const {title, note} = req.body;

    let emptyFields = []

    if(!title) {
        emptyFields.push('Judul')
    }
    if(!note) {
        emptyFields.push('Catatan')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Tidak boleh kosong!', emptyFields })
    }

    try {
        const user_id = req.user._id
        const noteapp = await Notes.create({title, note, user_id})
        res.status(200).json(noteapp)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Catatan tidak ditemukan' })
    }

    const note = await Notes.findOneAndDelete({_id: id})

    if (!note) {
        return res.status(400).json({ error: 'Catatan tidak ditemukan' })
    }

    res.status(200).json(note)
}

const updateNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Catatan tidak ditemukan' })
    }

    const note = await Notes.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if (!note) {
        return res.status(400).json({ error: 'Catatan tidak ditemukan' })
    }

    res.status(200).json(note)
}

module.exports = {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote
}
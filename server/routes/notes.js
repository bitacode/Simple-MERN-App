const express = require('express');
const {
    getNotes,
    getNote,
    createNote,
    deleteNote,
    updateNote
} = require('../controllers/noteController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', getNotes)

router.get('/:id', getNote)

router.post('/', createNote)

router.delete('/:id', deleteNote)

router.patch('/:id', updateNote)

module.exports = router
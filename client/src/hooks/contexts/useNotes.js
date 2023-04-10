import { NotesContext } from '../providers/NoteContext';
import { useContext } from 'react';

export const useNotes = () => {
    const context = useContext(NotesContext)

    if (!context) {
        throw Error('useNotes harus berada di dalam NotesContextProvider')
    }

    return context
}
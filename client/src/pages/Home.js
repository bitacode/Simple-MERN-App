import React, { useEffect, useState } from 'react'
import NoteDetails from '../components/NoteDetails';
import NoteForm from '../components/NoteForm';
import { Box, Stack } from '@chakra-ui/react'
import { useNotes } from '../hooks/contexts/useNotes';
import { useAuth } from '../hooks/contexts/useAuth';
import EditForm from '../components/EditForm';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const { notes, dispatch } = useNotes();
    const {user} = useAuth();

    const [noteapp, setNoteApp] = useState([]);

    const location = useLocation()
    const id = location.pathname.replace('/', '')

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch('/api/notes', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_NOTES', payload: json })
            }
        }

        if (user) {
            fetchNotes()
        }

    }, [dispatch, user])

    useEffect(() => {
        if (id) {
            const fetchNotes = async () => {
                const response = await fetch('/api/notes/' + id, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()

                if (response.ok) {
                    dispatch({ type: 'GET_NOTE', payload: json })
                    setNoteApp([json])
                }
            }

            if (user) {
                fetchNotes()
            }
        }
    }, [dispatch, user, id])

    return (
        <Box bg='whitesmoke' h='100vh' pl='10%' pr='10%' pb='2%' pt='2%'>
            <Box display='flex'>
                <Box w='50%'>
                    <Stack>
                        {notes && notes.map((note) => (
                            <NoteDetails key={note._id} note={note} id={note._id} />
                        ))}
                    </Stack>
                </Box>
                <Box w='50%'>
                    { id ? 
                        <>
                            {noteapp && noteapp.map((notes) => (
                                <EditForm key={notes._id} notes={notes} />
                            ))}
                        </>
                         :
                        <NoteForm />
                    }
                </Box>
            </Box>
        </Box>
  )
}

export default Home
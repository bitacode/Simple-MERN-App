import React, { useState } from 'react';
import { Box, Button, Input, Stack, Textarea } from '@chakra-ui/react';
import { useNotes } from '../hooks/contexts/useNotes';
import { useAuth } from '../hooks/contexts/useAuth';

const EditForm = ( {notes} ) => {
    const { dispatch } = useNotes();
    const { user } = useAuth();
    
    const [title, setTitle] = useState(notes.title);
    const [note, setNote] = useState(notes.note);
    const [createdAt, setCreatedAt] = useState(new Date());
    const [error, setError] = useState(null);

    const handleUpdate = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('Belum login')
            return
        }

        const noteapp = { title, note, createdAt }

        const response = await fetch('/api/notes/' + notes._id, {
            method: 'PATCH',
            body: JSON.stringify(noteapp),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            window.location.reload();
            setTitle('')
            setNote('')
            setCreatedAt('')
            setError(null)
            console.log('Catatan diupdate', json)
            dispatch({ type: 'UPDATE_NOTE', payload: json })
        }
    }

    return (
        <Box display='flex' alignItems='flex-start' justifyContent='flex-end'>
            <Stack >
                <Box as='h1' fontWeight='bold' fontSize='18px' mb='10px' color='blackAlpha.700'>
                    Edit Catatan
                </Box>
                <Box color='blackAlpha.700'>
                    Judul:
                </Box>
                <Input
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    borderColor='blackAlpha.500'
                    _hover={{ borderColor: 'black' }}
                    focusBorderColor='black'
                />
                <Box color='blackAlpha.700'>
                    Catatan:
                </Box>
                <Textarea
                    name='note'
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    resize='none'
                    borderColor='blackAlpha.500'
                    _hover={{ borderColor: 'black' }}
                    focusBorderColor='black'
                />
                <Button bg='blue.400' color='white' onClick={handleUpdate}>Update</Button>
                <Button bg='red.400' color='white' onClick={() => window.location.reload()}>Batal</Button>
                {error && 
                    <Box bg='red.200' border='1px' borderColor='red.500' color='red.500' p='5px' fontSize='14px'>
                        {error}
                    </Box>
                }
            </Stack>
        </Box>
    )
}

export default EditForm
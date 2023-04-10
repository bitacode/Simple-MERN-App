import React, { useState } from 'react';
import { Box, Button, Input, Stack, Textarea } from '@chakra-ui/react';
import { useNotes } from '../hooks/contexts/useNotes';
import { useAuth } from '../hooks/contexts/useAuth';

const NoteForm = () => {
    const { dispatch } = useNotes();
    const { user } = useAuth();
    
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('Belum login')
            return
        }

        const noteapp = { title, note }

        const response = await fetch('/api/notes', {
            method: 'POST',
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
            setTitle('')
            setNote('')
            setError(null)
            console.log('Catatan disimpan', json)
            dispatch({ type: 'CREATE_NOTES', payload: json })
        }
    }

    return (
        <Box display='flex' alignItems='flex-start' justifyContent='flex-end'>
            <Stack>
                <Box as='h1' fontWeight='bold' fontSize='18px' mb='10px' color='blackAlpha.700'>
                    Tambah Catatan Baru
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
                <Button bg='blue.400' color='white' onClick={handleSubmit}>Simpan</Button>
                {error && 
                    <Box bg='red.200' border='1px' borderColor='red.500' color='red.500' p='5px' fontSize='14px'>
                        {error}
                    </Box>
                }
            </Stack>
        </Box>
    )
}

export default NoteForm
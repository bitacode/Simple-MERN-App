import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Link } from 'react-router-dom';
import { Box, Card, Image, CardBody, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useNotes } from '../hooks/contexts/useNotes';
import { useAuth } from '../hooks/contexts/useAuth';

const NoteDetails = ({note}) => {
    const { dispatch } = useNotes();
    const { user } = useAuth();

    const handleDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/notes/' + note._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_NOTE', payload: json })
        }
    }

    return (
        <Card>
            <CardBody>
                <Box display='flex'>
                    <Box flex='1' as='h1' fontWeight='bold' fontSize='22px' color='blue.400' mb='10px'>
                        {note.title}
                    </Box>
                    <Menu>
                        <MenuButton as='button'>
                            <Image src={require('../assets/icons/more.png')} w='30px' />
                        </MenuButton>
                        <MenuList>
                            <MenuItem color='blackAlpha.700'>
                                <Link to={'/'+ note._id}>
                                    Edit
                                </Link>
                            </MenuItem>
                            <MenuItem color='blackAlpha.700' onClick={handleDelete}>Hapus</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <Box as='p' mb='10px' color='blackAlpha.700'>
                    {note.note}
                </Box>
                <Box as='p' color='gray.400' fontSize='12px'>
                    {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                </Box>
            </CardBody>
        </Card>
        
    )
}

export default NoteDetails
import React, { useState } from 'react';
import { Box, Card, InputGroup, InputLeftElement, Input, Stack, Image, Button, CardBody } from '@chakra-ui/react';
import { useSignin } from '../hooks/contexts/useSignin';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signin, error, isLoading } = useSignin();

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signin(email, password)
    }

    return (
        <Box h='100vh' bg='whitesmoke' display='flex' alignItems='center' justifyContent='center'>
            <Card>
                <CardBody>
                    <Stack>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={ <Image src={require('../assets/icons/at.png')} w='25px' /> }
                            />
                            <Input
                                placeholder='Email' 
                                type='email'
                                name='email'
                                borderColor='blackAlpha.500'
                                _hover={{ borderColor: 'black' }}
                                focusBorderColor='black'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={ <Image src={require('../assets/icons/lock.png')} w='25px' /> }
                            />
                            <Input   
                                placeholder='Password'
                                type='password'
                                name='password'
                                borderColor='blackAlpha.500'
                                _hover={{ borderColor: 'black' }}
                                focusBorderColor='black'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputGroup>
                        <Button bg='blue.400' color='white' disabled={isLoading} onClick={handleSubmit}>Masuk</Button>
                        { error && 
                            <Box bg='red.200' border='1px' borderColor='red.500' color='red.500' p='5px' fontSize='14px'>
                                {error}
                            </Box>
                        }
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    )
}

export default SignIn
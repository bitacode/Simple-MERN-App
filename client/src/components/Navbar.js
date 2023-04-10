import { Box, HStack } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/contexts/useAuth';
import { useSignout } from '../hooks/contexts/useSignout'

const Navbar = () => {
	const { signout } = useSignout();
	const { user } = useAuth();

	const location = useLocation();

	const handleClick = () => {
		signout()
	}

	return (
		<Box bg='white' pl='10%' pr='10%' h='12vh' display='flex' alignItems='center' justifyContent='flex-start'>
			<Box flex='1' as='h1' fontWeight='bold' fontSize='30px' color='blackAlpha.700'>
				<Link to='/'>
					Catatan {user ? (`${user.nickname}`) : 'Kamu'}
				</Link>
			</Box>
			<HStack spacing='35px'>
				{!user && (
					<>
						<Box as='h1' fontWeight='medium' fontSize='18px' color={location.pathname === '/signup' ? 'blue.400' : 'blackAlpha.700'} _hover={{ color: 'blue.400' }}>
							<Link to='/signup'>
								Daftar
							</Link>
						</Box>
						<Box as='h1' fontWeight='medium' fontSize='18px' color={location.pathname === '/signin' ? 'blue.400' : 'blackAlpha.700'} _hover={{ color: 'blue.400' }}>
							<Link to='/signin'>
								Masuk
							</Link>
						</Box>
					</>
				)}
				{ user && (
					<Box as='h1' fontWeight='medium' fontSize='18px' color='white' bg='blue.400' pt='4px' pb='4px' pl='18px' pr='18px' borderRadius='5px' onClick={handleClick}>
						<Link to='/signin'>
							Keluar
						</Link>
					</Box>
				)}
			</HStack>
		</Box>
  )
}

export default Navbar
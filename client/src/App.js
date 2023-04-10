import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/contexts/useAuth';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
	const { user } = useAuth();
	return (
		<Router>
			<Navbar /> 
			<Routes>
				<Route path='/' element={user ? <Home /> : <Navigate to='/signin' />} />
				<Route path='/:id' element={user ? <Home /> : <Navigate to='/signin' />} />
				<Route path='/signin' element={!user ? <SignIn /> : <Navigate to='/' />} />
				<Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
			</Routes>
		</Router>
	);
}

export default App;

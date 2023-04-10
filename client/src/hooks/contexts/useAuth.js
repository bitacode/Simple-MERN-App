import { AuthContext } from '../providers/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuth harus berada di dalam AuthContextProvider')
    }

    return context
}
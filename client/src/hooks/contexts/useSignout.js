import { useAuth } from './useAuth';
import { useNotes } from './useNotes';

export const useSignout = () => {
    const { dispatch } = useAuth();
    const { dispatch: notesDispatch } = useNotes();
    
    const signout = () => {
        localStorage.removeItem('user')

        dispatch({ type: 'SIGNOUT' })
        notesDispatch({ type: 'SET_NOTES', payload: null })

    }

    return { signout }
}
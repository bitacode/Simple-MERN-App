import { useState } from 'react';
import { useAuth } from './useAuth';

export const useSignin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuth();

    const signin = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({ type: 'SIGNIN', payload: json })

            setIsLoading(false)
        }
    }

    return { signin, isLoading, error }
}
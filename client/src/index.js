import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { NotesContextProvider } from './hooks/providers/NoteContext';
import { AuthContextProvider } from './hooks/providers/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthContextProvider>
        <NotesContextProvider>
          <App />
        </NotesContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
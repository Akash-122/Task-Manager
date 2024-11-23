import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';

const root = document.getElementById('todo-list');

createRoot(root).render(<App />);

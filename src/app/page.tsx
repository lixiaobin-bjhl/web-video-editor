
"use client";

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

function home() {
    return (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

export default home;
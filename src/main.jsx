import React from 'react'
import ReactDOM from 'react-dom/client'
import ValidationLanding from './ValidationLanding'
import './index.css'
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ValidationLanding />
        <Toaster />
    </React.StrictMode>,
)

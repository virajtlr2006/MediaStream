import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/react'
import { BrowserRouter, Route, Routes } from "react-router";
import Onboarding from './Onboarding.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/onboard" element={<Onboarding />} />
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
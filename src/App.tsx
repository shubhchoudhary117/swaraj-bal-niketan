import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import PublicRoutes from './routes/public/PublicRoutes'

const App = () => {
  return <>
    <BrowserRouter>
        <PublicRoutes />
    </BrowserRouter>
  </>
}

export default App
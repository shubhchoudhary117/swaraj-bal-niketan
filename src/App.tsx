import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import PublicRoutes from './routes/public/PublicRoutes'
import ScrollToTop from './shared/common/ScrollTop/ScrollTop'

const App = () => {
  return <>
    <BrowserRouter>
      <ScrollToTop />
      <PublicRoutes />
    </BrowserRouter>
  </>
}

export default App
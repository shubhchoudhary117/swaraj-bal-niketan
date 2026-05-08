import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import PublicRoutes from './routes/public/PublicRoutes'
import ScrollToTop from './shared/common/ScrollTop/ScrollTop'
import PrivateRoutes from './routes/private/PrivateRoutes'

const App = () => {
  return <>
    <BrowserRouter>
      <ScrollToTop />
      <PublicRoutes />
      <PrivateRoutes/>
    </BrowserRouter>
  </>
}

export default App
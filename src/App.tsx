import React, { useEffect } from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import PublicRoutes from './routes/public/PublicRoutes'
import ScrollToTop from './shared/common/ScrollTop/ScrollTop'
import PrivateRoutes from './routes/private/PrivateRoutes'
import TeacherRoutes from './routes/private/TeacherRoutes'

const App = () => {

  useEffect(() => {
    document.addEventListener('wheel', function (event) {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    }, { passive: false });

    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && (event.key === '+' || event.key === '-' || event.key === '0')) {
        event.preventDefault();
      }
    });

    document.addEventListener('gesturestart', function (event) {
      event.preventDefault();
    });
  }, []);

  return <>
    <BrowserRouter>
      <ScrollToTop />
      <PublicRoutes />
      <PrivateRoutes />
      <TeacherRoutes/>
    </BrowserRouter>
  </>
}

export default App
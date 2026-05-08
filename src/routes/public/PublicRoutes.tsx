import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import StudentLogin from '../../features/auth/student-login/StudentLogin'
import LandingPage from '../../features/public/landing-page/LandingPage'
import SchoolTeachers from '../../features/public/landing-page/sections/school-teachers/SchoolTeachers'
import StudentRegistration from '../../features/public/student-registration/pages/StudentRegistration'

const PublicRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <LandingPage /> },
    { path: '/teachers', element: <SchoolTeachers /> },
    { path: '/student-login', element: <StudentLogin /> },
    { path: '/student-registration', element: <StudentRegistration /> }
  ])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {routes}
    </Suspense>
  )
}

export default PublicRoutes
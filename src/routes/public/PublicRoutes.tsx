import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import StudentLogin from '../../pages/student-login/StudentLogin'
import StudentRegistration from '../../features/student-registration/forms/StudentRegistration'
import SchoolTeachers from '../../pages/landing-page/sections/school-teachers/SchoolTeachers'

const LandingPage = lazy(() => import('../../pages/landing-page/LandingPage'))

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
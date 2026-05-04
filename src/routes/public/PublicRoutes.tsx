import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const LandingPage = lazy(() => import('../../pages/landing-page/LandingPage'))

const PublicRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <LandingPage /> }
  ])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {routes}
    </Suspense>
  )
}

export default PublicRoutes
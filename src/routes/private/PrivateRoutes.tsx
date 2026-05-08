import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import StudentLayout from '../../features/student/layouts/StudentLayout/StudentLayout'
import Dashboard from '../../features/student/pages/dashboard/Dashboard'
import StudentProfile from '../../features/student/pages/student-profile/StudentProfile'
import StudentAttedance from '../../features/student/pages/student-attendance/StudentAttedance'
import NoticeBoard from '../../features/student/pages/notice-board/NoticeBoard'
import FeesPayment from '../../features/student/pages/fees-payments/FeesPayment'
import ResultsSection from '../../features/student/pages/StudentResults'

const PrivateRoutes = () => {
  const routes = useRoutes([
    {
      path: '/study-v1',
      element: <StudentLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'profile',
          element:<StudentProfile/>
        },
        {
          path: 'attendance',
          element:<StudentAttedance/>
        },
        {
          path: 'notices',
          element:<NoticeBoard/>
        },
         {
          path: 'fees',
          element:<FeesPayment/>
        },
         {
          path: 'results',
          element:<ResultsSection/>
        }
      ],
    },
  ])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {routes}
    </Suspense>
  )
}

export default PrivateRoutes
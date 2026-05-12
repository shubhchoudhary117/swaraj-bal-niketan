import React from 'react'
import { useRoutes } from 'react-router-dom'
import TeachersLayout from '../../features/teachers/layouts/teachers-layout/TeachersLayout'
import TeachersDashboard from '../../features/teachers/pages/teachers-dashboard/TeachersDashboard'
import TeacherClasses from '../../features/teachers/pages/teacher-classes/TeacherClasses'
import { Students } from '../../features/teachers/pages/students/Students'
import TakeAttendance from '../../features/teachers/pages/take-attendance/TakeAttendance'
import CreateExam from '../../features/teachers/pages/create-exam/CreateExam'
import CreateTimetable from '../../features/teachers/pages/create-timetable/CreateTimeTable'
import UploadMarks from '../../features/teachers/pages/upload-marks/UploadMarks'
import CreateNotice from '../../features/teachers/pages/create-notice/CreateNotice'

const TeacherRoutes = () => {
    const routes=useRoutes([
        {
      path: '/teach-v1',
      element: <TeachersLayout />,
      children: [
        {
          index: true,
          element: <TeachersDashboard />,
        },
        {
            path:"classes",
            element:<TeacherClasses/>
        },
        {
            path:"students",
            element:<Students/>
        },
          {
            path:"attendance",
            element:<TakeAttendance/>
        },
        {
            path:"create-exam",
            element:<CreateExam/>
        },
        {
            path:"create-timetable",
            element:<CreateTimetable/>
        },
         {
            path:"upload-marks",
            element:<UploadMarks/>
        },
        {
            path:"create-notice",
            element:<CreateNotice/>
        }
    ]
    }
    ])
  return <>
  {routes}
  </>
}

export default TeacherRoutes
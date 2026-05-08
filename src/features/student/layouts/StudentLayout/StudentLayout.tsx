import React, { useState } from 'react'
import "./StudentLayout.scss"
import StudentSidebar from '../student-sidebar/StudentSidebar'
import StudentHeader from '../student-header/StudentHeader'
import { Outlet } from 'react-router-dom'

const StudentLayout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <section className="stu-layout">

            {/* OVERLAY */}
            {sidebarOpen && (
                <div
                    className="stu-layout__overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <main className="stu-layout__container">

                {/* LEFT SIDEBAR */}
                <div
                    className={`stu-layout__left ${sidebarOpen ? 'stu-layout__left--open' : ''
                        }`}
                >
                    <StudentSidebar
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                    />
                </div>

                {/* RIGHT */}
                <div className="stu-layout__right">

                    <div className="stu-layout__header">
                        <StudentHeader
                            onMenuToggle={() => setSidebarOpen(true)}
                        />
                    </div>

                    <div className="stu-layout__outlet">
                        <Outlet />
                    </div>

                </div>
            </main>
        </section>
    )
}

export default StudentLayout
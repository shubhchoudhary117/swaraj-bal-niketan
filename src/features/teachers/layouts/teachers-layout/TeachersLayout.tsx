import React, { useState } from 'react'
import "./TeachersLayout.scss"
import { Outlet } from 'react-router-dom'
import TeachersSidebar from '../teachers-sidebar/TeachersSidebar';
import TeachersHeader from '../teachers-header/TeachersHeader';

const TeachersLayout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <section className="tech-layout">

            {sidebarOpen && (
                <div
                    className="tech-layout__overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <main className="tech-layout__container">

                <div
                    className={`tech-layout__left ${sidebarOpen ? 'tech-layout__left--open' : ''
                        }`}
                >
                    <TeachersSidebar
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                    />
                </div>

                {/* RIGHT */}
                <div className="tech-layout__right">

                    <div className="tech-layout__header">
                        <TeachersHeader
                            onMenuToggle={() => setSidebarOpen(true)}
                        />
                    </div>

                    <div className="tech-layout__outlet">
                        <Outlet />
                    </div>

                </div>
            </main>
        </section>
    )
}

export default TeachersLayout
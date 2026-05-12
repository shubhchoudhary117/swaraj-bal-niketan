import React, { useState } from 'react';
import './TeachersSidebar.scss';
import {
    LayoutDashboard, User, BookOpen, CalendarCheck,
    ClipboardList, FileText, Clock, Library,
    IndianRupee, Bell, CalendarDays, MessageSquare,
    Image, Trophy, HelpCircle, Settings, LogOut,
    ChevronRight, Shield,
    X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudentSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null, chevron: false, route: '' },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, badge: null, chevron: false, route: 'attendance' },
    { id: 'crete_exam', label: 'Create Exam', icon: CalendarCheck, badge: null, chevron: false, route: 'create-exam' },
    { id: 'crete_timetable', label: 'Create Time Table', icon: CalendarCheck, badge: null, chevron: false, route: 'create-timetable' },
    { id: 'students', label: 'Students', icon: CalendarCheck, badge: null, chevron: false, route: 'students' },
    { id: 'my_classes', label: 'My Classes', icon: CalendarCheck, badge: null, chevron: false, route: 'classes' },
    { id: 'upload_marks', label: 'Upload Marks', icon: FileText, badge: null, chevron: false, route: 'upload-marks' },
    { id: 'notices', label: 'Notices', icon: Bell, badge: 3, chevron: false, route: 'create-notice' },
];



const TeachersSidebar: React.FC<StudentSidebarProps> = ({
    isOpen,
    onClose
}) => {
    const [active, setActive] = useState('dashboard');
    const navigate = useNavigate();
    const isMobile = window.matchMedia("(max-width:768px)").matches;

    const handleMenuClick = (e: any, id: string, route: string) => {
        e.preventDefault();
        setActive(id);
        navigate('/teach-v1/' + route);
        if (isMobile && onClose) {
            onClose();
        }
    }

    const handleLogout = () => {
        navigate("/")
    }

    return <>
        <div
            className={`tech-sidebar__overlay ${isOpen ? 'tech-sidebar__overlay--show' : ''}`}
            onClick={onClose}
        />
        <aside className={`tech-sidebar ${isOpen ? 'tech-sidebar--open' : ''}`}>
            <div className="tech-sidebar__mobile-top">
                <button
                    className="tech-sidebar__close-btn"
                    onClick={onClose}
                >
                    <X />
                </button>
            </div>

            <a href="#" className="tech-sidebar__brand">
                <img src='/assets/comman/school-logo.png' className="tech-sidebar__brand-icon" />
                <div className="tech-sidebar__brand-text">
                    <span className="tech-sidebar__brand-name">SUNRISE</span>
                    <span className="tech-sidebar__brand-school">PUBLIC SCHOOL</span>
                    <span className="tech-sidebar__brand-sub">Learn · Grow · Succeed</span>
                </div>
            </a>

            <div className="tech-sidebar__divider" ></div>

            <nav className="tech-sidebar__nav">
                {NAV_ITEMS.map(({ id, label, icon: Icon, badge, chevron, route }) => (

                    <a key={id}
                        href="#"
                        className={`tech-sidebar__nav-item${active === id ? ' tech-sidebar__nav-item--active' : ''}`}
                        onClick={(e) => { handleMenuClick(e, id, route!) }}
                    >
                        <span className="tech-sidebar__nav-icon">
                            <Icon strokeWidth={1.8} />
                        </span>
                        <span className="tech-sidebar__nav-label">{label}</span>
                        {badge && <span className="tech-sidebar__nav-badge">{badge}</span>}
                        {chevron && !badge && (
                            <span className="tech-sidebar__nav-chevron">
                                <ChevronRight strokeWidth={2} size={15} />
                            </span>
                        )}
                    </a>
                ))}
            </nav>

            <div className="tech-sidebar__divider" style={{ marginTop: 8 }} />


            <div className="tech-sidebar__logout">
                <button className="tech-sidebar__logout-btn">
                    <span className="tech-sidebar__logout-icon" onClick={handleLogout}>
                        <LogOut strokeWidth={1.8} />
                    </span>
                    <span className="tech-sidebar__logout-label">Logout</span>
                </button>
            </div>

        </aside >

    </>

}

export default TeachersSidebar;
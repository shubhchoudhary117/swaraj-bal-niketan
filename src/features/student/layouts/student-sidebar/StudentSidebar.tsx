import React, { useState } from 'react';
import './StudentSidebar.scss';
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
    { id: 'profile', label: 'My Profile', icon: User, badge: null, chevron: false, route: 'profile' },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, badge: null, chevron: false, route: 'attendance' },
    { id: 'exams', label: 'Exams', icon: FileText, badge: null, chevron: false, route: 'exams' },
    { id: 'timetable', label: 'Timetable', icon: Clock, badge: null, chevron: false, route: 'timetable' },
    { id: 'results', label: 'Results', icon: Clock, badge: null, chevron: false, route: 'results' },
    { id: 'fees', label: 'Fees & Payments', icon: IndianRupee, badge: null, chevron: false, route: 'fees' },
    { id: 'notices', label: 'Notices', icon: Bell, badge: 3, chevron: false, route: 'notices' },
];



const StudentSidebar: React.FC<StudentSidebarProps> = ({
    isOpen,
    onClose
}) => {
    const [active, setActive] = useState('dashboard');
    const navigate = useNavigate();
    const isMobile = window.matchMedia("(max-width:768px)").matches;

    const handleMenuClick = (e: any, id: string, route: string) => {
        e.preventDefault();
        setActive(id);
        navigate('/study-v1/' + route);
        if (isMobile && onClose) {
            onClose();
        }
    }

    const handleLogout=()=>{
        navigate("/")
    }

    return <>
        <div
            className={`student-sidebar__overlay ${isOpen ? 'student-sidebar__overlay--show' : ''}`}
            onClick={onClose}
        />
        <aside className={`student-sidebar ${isOpen ? 'student-sidebar--open' : ''}`}>
            <div className="student-sidebar__mobile-top">
                <button
                    className="student-sidebar__close-btn"
                    onClick={onClose}
                >
                    <X />
                </button>
            </div>

            <a href="#" className="student-sidebar__brand">
                <img src='/assets/comman/school-logo.png' className="student-sidebar__brand-icon" />
                <div className="student-sidebar__brand-text">
                    <span className="student-sidebar__brand-name">SUNRISE</span>
                    <span className="student-sidebar__brand-school">PUBLIC SCHOOL</span>
                    <span className="student-sidebar__brand-sub">Learn · Grow · Succeed</span>
                </div>
            </a>

            <div className="student-sidebar__divider" ></div>

            <nav className="student-sidebar__nav">
                {NAV_ITEMS.map(({ id, label, icon: Icon, badge, chevron, route }) => (

                    <a key={id}
                        href="#"
                        className={`student-sidebar__nav-item${active === id ? ' student-sidebar__nav-item--active' : ''}`}
                        onClick={(e) => { handleMenuClick(e, id, route!) }}
                    >
                        <span className="student-sidebar__nav-icon">
                            <Icon strokeWidth={1.8} />
                        </span>
                        <span className="student-sidebar__nav-label">{label}</span>
                        {badge && <span className="student-sidebar__nav-badge">{badge}</span>}
                        {chevron && !badge && (
                            <span className="student-sidebar__nav-chevron">
                                <ChevronRight strokeWidth={2} size={15} />
                            </span>
                        )}
                    </a>
                ))}
            </nav>

            <div className="student-sidebar__divider" style={{ marginTop: 8 }} />


            <div className="student-sidebar__logout">
                <button className="student-sidebar__logout-btn">
                    <span className="student-sidebar__logout-icon" onClick={handleLogout}>
                        <LogOut strokeWidth={1.8} />
                    </span>
                    <span className="student-sidebar__logout-label">Logout</span>
                </button>
            </div>

        </aside >

    </>

}

export default StudentSidebar;
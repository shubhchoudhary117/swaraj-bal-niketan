import React from 'react';
import './Dashboard.scss';

// ── SVG Icons (inline, no external deps needed) ─────────
const AttendanceIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M9 16l2 2 4-4" />
    </svg>
);

const AssignmentIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
    </svg>
);

const ExamIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2v-4" />
        <path d="M15 12h6M19 9l3 3-3 3" />
    </svg>
);

const GradeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

// ── Types ────────────────────────────────────────────────
interface StatCardProps {
    label: string;
    value: string | number;
    unit?: string;
    sub: string;
    icon: React.ReactNode;
    iconVariant: 'blue' | 'amber' | 'purple' | 'green';
    isGrade?: boolean;
}

// ── StatCard ─────────────────────────────────────────────
const StatCard: React.FC<StatCardProps> = ({
    label, value, unit, sub, icon, iconVariant, isGrade,
}) => (
    <div className="dashboard-hero__stat-card">
        <div className="dashboard-hero__stat-left">
            <span className="dashboard-hero__stat-label">{label}</span>
            {isGrade ? (
                <>
                    <span className="dashboard-hero__stat-grade">{value}</span>
                    <span className="dashboard-hero__stat-grade-sub">{sub}</span>
                </>
            ) : (
                <>
                    <span className="dashboard-hero__stat-value">
                        {value}
                        {unit && <span className="dashboard-hero__stat-unit">{unit}</span>}
                    </span>
                    <span className="dashboard-hero__stat-sub">{sub}</span>
                </>
            )}
        </div>
        <div className={`dashboard-hero__stat-icon dashboard-hero__stat-icon--${iconVariant}`}>
            {icon}
        </div>
    </div>
);

// ── DashboardHero ────────────────────────────────────────
const Dashboard: React.FC = () => {
    return <>
        <section className="dashboard">
            <main className="dashboard__container">

                <div className="dashboard-hero">
                    <div className="dashboard-hero__banner">
                        <div className="dashboard-hero__banner-content">
                            <p className="dashboard-hero__greeting">Welcome back,</p>
                            <h1 className="dashboard-hero__name">
                                Ananya!
                                <span className="dashboard-hero__name-emoji">👋</span>
                            </h1>
                            <p className="dashboard-hero__tagline">
                                Stay curious, keep learning, and<br />make today amazing!
                            </p>
                        </div>
                    </div>

                    <div className="dashboard-hero__stats">
                        <StatCard
                            label="Attendance"
                            value={95}
                            unit="%"
                            sub="Present"
                            icon={<AttendanceIcon />}
                            iconVariant="blue"
                        />
                        <StatCard
                            label="Assignments"
                            value={5}
                            sub="Pending"
                            icon={<AssignmentIcon />}
                            iconVariant="amber"
                        />
                        <StatCard
                            label="Exams"
                            value={2}
                            sub="Upcoming"
                            icon={<ExamIcon />}
                            iconVariant="purple"
                        />
                        <StatCard
                            label="Overall Grade"
                            value="A"
                            sub="Excellent"
                            icon={<GradeIcon />}
                            iconVariant="green"
                            isGrade
                        />
                    </div>
                </div>

                <div className="dashboard__bottom-hero">
                    <div className="dashboard__bottom-hero-overlay"></div>
                    <div className="dashboard__bottom-hero-content">
                        <div className="dashboard__bottom-hero-desc">
                            “Education is the most powerful weapon
                            which you can use to change the world.”
                        </div>
                        <div className="dashboard__bottom-hero-signature">
                            – Nelson Mandela
                        </div>
                    </div>
                </div>
            </main>
        </section>

    </>
};

export default Dashboard;
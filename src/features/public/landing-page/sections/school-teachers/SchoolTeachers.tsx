import React, { useState } from "react";
import "./SchoolTeachers.scss";
import {
    Phone,
    Clock,
    Users,
    GraduationCap,
    Trophy,
    Building2,
    Star,
    UserCheck,
} from "lucide-react";
import PublicHeader from "../../../../../shared/layouts/public-header/PublicHeader";


const TEACHERS = [
    {
        id: 1,
        name: "Dr. Priya Sharma",
        role: "Senior Faculty",
        subject: "Mathematics",
        subjectKey: "math",
        experience: 14,
        qualification: "Ph.D. Mathematics, DU",
        classes: "Class 9 – 12",
        rating: 5,
        photo: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&h=500&fit=crop&q=80",
    },
    {
        id: 2,
        name: "Mr. Arjun Mehta",
        role: "Senior Faculty",
        subject: "Science",
        subjectKey: "science",
        experience: 10,
        qualification: "M.Sc. Physics, IIT Delhi",
        classes: "Class 6 – 10",
        rating: 5,
        photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop&q=80",
    },
    {
        id: 3,
        name: "Ms. Neha Kapoor",
        role: "Department Head",
        subject: "English",
        subjectKey: "english",
        experience: 12,
        qualification: "M.A. English Lit., JNU",
        classes: "Class 1 – 12",
        rating: 5,
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&q=80",
    },
    {
        id: 4,
        name: "Mr. Ramesh Gupta",
        role: "Senior Faculty",
        subject: "Hindi",
        subjectKey: "hindi",
        experience: 18,
        qualification: "M.A. Hindi, BHU",
        classes: "Class 1 – 12",
        rating: 4,
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&q=80",
    },
    {
        id: 5,
        name: "Ms. Anjali Verma",
        role: "Faculty",
        subject: "Social Studies",
        subjectKey: "social",
        experience: 8,
        qualification: "M.A. History, IGNOU",
        classes: "Class 6 – 10",
        rating: 5,
        photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=500&fit=crop&q=80",
    },
    {
        id: 6,
        name: "Mr. Vikram Singh",
        role: "Faculty",
        subject: "Computer Science",
        subjectKey: "computer",
        experience: 7,
        qualification: "MCA, GGSIPU",
        classes: "Class 8 – 12",
        rating: 5,
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80",
    },
    {
        id: 7,
        name: "Ms. Pooja Nair",
        role: "Faculty",
        subject: "Art & Drawing",
        subjectKey: "art",
        experience: 6,
        qualification: "BFA, Mumbai Art School",
        classes: "Class 1 – 8",
        rating: 5,
        photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&q=80",
    },
    {
        id: 8,
        name: "Mr. Suresh Patel",
        role: "Sports Coach",
        subject: "Sports & PE",
        subjectKey: "sports",
        experience: 11,
        qualification: "B.P.Ed, Lakshmibai NI",
        classes: "All Classes",
        rating: 4,
        photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop&q=80",
    },
];

const STATS = [
    { number: "80+",  label: "Expert Teachers",      icon: <UserCheck color="#fff" size={26} /> },
    { number: "15+",  label: "Departments",           icon: <Building2 color="#fff" size={26} /> },
    { number: "25+",  label: "Years Experience",      icon: <Trophy  color="#fff"     size={26} /> },
    { number: "98%",  label: "Student Satisfaction",  icon: <Star  color="#fff"     size={26} /> },
];

const SUBJECT_LABELS: Record<string, string> = {
    all:      "All Teachers",
    math:     "Mathematics",
    science:  "Science",
    english:  "English",
    hindi:    "Hindi",
    social:   "Social Studies",
    computer: "Computer",
    art:      "Art",
    sports:   "Sports",
};


const Stars = ({ rating }: { rating: number }) => (
    <div className="teacher-card__rating">
        {[1, 2, 3, 4, 5].map((s) => (
            <span
                key={s}
                className={`teacher-card__star${s <= rating ? " teacher-card__star--filled" : ""}`}
            >★</span>
        ))}
        <span className="teacher-card__rating-text">{rating}.0</span>
    </div>
);


const TeacherCard = ({ teacher }: { teacher: typeof TEACHERS[0] }) => (
    <div className="teacher-card">
        <div className="teacher-card__img-wrap">
            <img
                className="teacher-card__img"
                src={teacher.photo}
                alt={teacher.name}
                loading="lazy"
            />
            <div className="teacher-card__overlay">
                <a className="teacher-card__contact-btn" href="#contact">
                    <Phone size={13} strokeWidth={2.2} />
                    Contact
                </a>
            </div>
            <div className="teacher-card__exp-badge">
                <Star size={10} strokeWidth={2.5} />
                {teacher.experience} yrs
            </div>
        </div>

        <div className="teacher-card__body">
            <h3 className="teacher-card__name">{teacher.name}</h3>
            <p className="teacher-card__role">{teacher.role}</p>

            <span className={`teacher-card__subject teacher-card__subject--${teacher.subjectKey}`}>
                📚 {teacher.subject}
            </span>

            <div className="teacher-card__meta">
                <div className="teacher-card__meta-item">
                    <GraduationCap size={15} strokeWidth={2} />
                    <span className="teacher-card__meta-label">{teacher.qualification}</span>
                </div>
                <div className="teacher-card__meta-item">
                    <Clock size={15} strokeWidth={2} />
                    <span className="teacher-card__meta-label">{teacher.experience} Years Experience</span>
                </div>
                <div className="teacher-card__meta-item">
                    <Users size={15} strokeWidth={2} />
                    <span className="teacher-card__meta-label">{teacher.classes}</span>
                </div>
            </div>

            <Stars rating={teacher.rating} />
        </div>
    </div>
);


const SchoolTeachers = () => {
    const [filter, setFilter] = useState("all");

    const subjects = ["all", ...new Set(TEACHERS.map((t) => t.subjectKey))];
    const filtered  = filter === "all"
        ? TEACHERS
        : TEACHERS.filter((t) => t.subjectKey === filter);

    return (
        <>
            <PublicHeader />
            <section className="teachers-section" id="teachers">
                <div className="teachers-section__container">
                    <div className="teachers-section__header">
                        <span className="teachers-section__eyebrow">OUR FACULTY</span>
                        <h2 className="teachers-section__title">
                            Meet Our <span>Expert Teachers</span>
                        </h2>
                        <p className="teachers-section__subtitle">
                            Our dedicated faculty brings passion, expertise, and years of experience
                            to shape the minds of tomorrow's leaders.
                        </p>
                    </div>

                    <div className="teachers-section__filters">
                        {subjects.map((s) => (
                            <button
                                key={s}
                                className={`filter-btn${filter === s ? " filter-btn--active" : ""}`}
                                onClick={() => setFilter(s)}
                            >
                                {SUBJECT_LABELS[s] || s}
                            </button>
                        ))}
                    </div>
                    <div className="teachers-section__grid">
                        {filtered.map((teacher) => (
                            <TeacherCard key={teacher.id} teacher={teacher} />
                        ))}
                    </div>

                    <div className="teachers-section__stats">
                        {STATS.map((stat, i) => (
                            <div key={i} className="teachers-section__stat">
                                <span className="teachers-section__stat-icon">{stat.icon}</span>
                                <div className="teachers-section__stat-number">{stat.number}</div>
                                <div className="teachers-section__stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </>
    );
};

export default SchoolTeachers;
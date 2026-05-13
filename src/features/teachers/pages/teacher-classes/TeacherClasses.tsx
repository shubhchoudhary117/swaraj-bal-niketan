
import { useState, useRef, useEffect } from "react";
import {
  Users,
  CalendarDays,
  BookOpen,
  Bell,
  Mail,
  ChevronDown,
  Search,
  MoreVertical,
  GraduationCap,
  BookMarked,
  CheckCircle,
  Info,
} from "lucide-react";

import "./TeacherClasses.scss";

const STATS: any = [
  {
    icon: Users,
    label: "Total Classes",
    value: "3",
    sub: "Classes you teach",
    color: "purple",
  },
  {
    icon: Users,
    label: "Total Students",
    value: "68",
    sub: "Across all classes",
    color: "green",
  },
  {
    icon: BookMarked,
    label: "Total Subjects",
    value: "3",
    sub: "You are teaching",
    color: "orange",
  },
  {
    icon: CalendarDays,
    label: "Today's Classes",
    value: "2",
    sub: "Classes today",
    color: "blue",
  },
];

const CLASSES: any = [
  {
    id: 1,
    name: "Class 10 A",
    subject: "Mathematics",
    role: "Class Teacher",
    students: 32,
    attendance: "92%",
    time: "08:00 AM",
    period: "Period 1",
    color: "purple",
  },
  {
    id: 2,
    name: "Class 9 B",
    subject: "Mathematics",
    role: "Subject Teacher",
    students: 24,
    attendance: "89%",
    time: "10:30 AM",
    period: "Period 3",
    color: "green",
  },
  {
    id: 3,
    name: "Class 8 C",
    subject: "Mathematics",
    role: "Subject Teacher",
    students: 12,
    attendance: "88%",
    time: "09:00 AM",
    period: "Period 2",
    color: "orange",
  },
];

const COLOR_MAP: any = {
  purple: {
    accent: "#7c3aed",
    bg: "#ede9fe",
  },
  green: {
    accent: "#10b981",
    bg: "#d1fae5",
  },
  orange: {
    accent: "#f97316",
    bg: "#ffedd5",
  },
  blue: {
    accent: "#2563eb",
    bg: "#dbeafe",
  },
};

function TeachClsDropdown({ color }: any) {
  const [open, setOpen] = useState(false);
  const ref = useRef<any>(null);

  const accent = COLOR_MAP[color]?.accent;

  useEffect(() => {
    const fn = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", fn);

    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <div className="teach-cls__dropdown" ref={ref}>
      <button
        className="teach-cls__dropdown-trigger"
        onClick={() => setOpen(!open)}
      >
        <MoreVertical className="icon"  />
      </button>

      {open && (
        <div className="teach-cls__dropdown-menu">
          {[
            { label: "Attendance", icon: CheckCircle },
            { label: "View Students", icon: Users },
          ].map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="teach-cls__dropdown-item"
              onClick={() => setOpen(false)}
            >
              <Icon size={15} color={accent} />
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TeachClsCard({ cls }: any) {
  const cm = COLOR_MAP[cls.color];

  return (
    <div className={`teach-cls__card teach-cls__card--${cls.color}`}>
      <div className="teach-cls__card-left">
        <div
          className="teach-cls__card-icon"
          style={{
            background: cm.bg,
            color: cm.accent,
          }}
        >
          <GraduationCap   className="icon" />
        </div>

        <div>
          <h3>{cls.name}</h3>

          <p
            className="teach-cls__card-subject"
            style={{ color: cm.accent }}
          >
            {cls.subject}
          </p>

          <span className="teach-cls__card-badge">{cls.role}</span>
        </div>
      </div>

      <div className="teach-cls__card-meta">
        <div>
          <small>Total Students</small>

          <strong>
            <Users size={16} color={cm.accent} />
            {cls.students}
          </strong>
        </div>

        <div>
          <small>Attendance</small>

          <strong>
            <CheckCircle size={16} color={cm.accent} />
            {cls.attendance}
          </strong>
        </div>

        <div>
          <small>Today's Class</small>

          <strong>
            <CalendarDays size={16} color={cm.accent} />
            {cls.time}
          </strong>

          <span>{cls.period}</span>
        </div>
      </div>

      <div className="teach-cls__card-actions">
        <button>
          <CheckCircle size={15} color={cm.accent} />
          Attendance
        </button>

        <button>
          <Users size={15} color={cm.accent} />
          Students
        </button>

        <TeachClsDropdown color={cls.color} />
      </div>
    </div>
  );
}

export default function TeacherClasses() {
  return (
    <div className="teach-cls">

      <section className="teach-cls__content">
        <div className="teach-cls__page-header">
          <h1>My Classes</h1>

          <p>Manage and view all the classes assigned to you.</p>
        </div>

        <div className="teach-cls__stats-grid">
          {STATS.map(({ icon: Icon, label, value, sub, color }: any) => {
            const cm = COLOR_MAP[color];

            return (
              <div className="teach-cls__stat-card" key={label}>
                <div
                  className="teach-cls__stat-icon"
                  style={{
                    background: cm.bg,
                    color: cm.accent,
                  }}
                >
                  <Icon className="icon" />
                </div>

                <div>
                  <small>{label}</small>

                  <h2>{value}</h2>

                  <p>{sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="teach-cls__filter-bar">
          <div className="teach-cls__filter-search">
            <input
              type="text"
              placeholder="Search by class or section..."
            />

            <Search size={14} />
          </div>

          <select>
            <option>All Sections</option>
            <option>Section A</option>
            <option>Section B</option>
            <option>Section C</option>
          </select>

          <select>
            <option>All Subjects</option>
            <option>Mathematics</option>
            <option>Science</option>
            <option>English</option>
          </select>
        </div> */}

        <div className="teach-cls__list">
          {CLASSES.map((cls: any) => (
            <TeachClsCard key={cls.id} cls={cls} />
          ))}
        </div>

        <div className="teach-cls__info-banner">
          <Info size={16} />

          <p>
            You can view students, timetable, performance and other
            details of each class.
          </p>
        </div>
      </section>
    </div>
  );
}
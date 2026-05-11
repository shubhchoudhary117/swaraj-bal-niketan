import { useState } from "react";
import "./TeachersDashboard.scss";
import {
  Users, ClipboardCheck, FileText, BarChart2,
  MonitorPlay, ClipboardX, ArrowRight, CalendarDays,
  Zap, FilePlus, Upload, Megaphone, FolderUp,
  CalendarRange, LogOut, Plus, ChevronDown, MessageSquare,
} from "lucide-react";

// ── STAT CARDS ────────────────────────────────────────────────
const statsData = [
  { icon: MonitorPlay, label: "Today's Classes",    value: "4",         link: "View Timetable", colorKey: "purple" },
  { icon: Users,       label: "Total Students",     value: "68",        link: "View Students",  colorKey: "green"  },
  { icon: ClipboardX,  label: "Pending Attendance", value: "2 Classes", link: "Mark Now",       colorKey: "orange" },
  { icon: FileText,    label: "Pending Homework",   value: "5",         link: "View Now",       colorKey: "red"    },
];

function StatsCards() {
  return (
    <div className="stats">
      {statsData.map(({ icon: Icon, label, value, link, colorKey }) => (
        <div key={label} className="stats__card">
          <div className={`stats__icon stats__icon--${colorKey}`}>
            <Icon className="icon" />
          </div>
          <div className="stats__body">
            <span className="stats__label">{label}</span>
            <span className="stats__value">{value}</span>
            <a href="#" className={`stats__link stats__link--${colorKey}`}>
              {link} <ArrowRight className="icon" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── TIMETABLE ─────────────────────────────────────────────────
const periods = [
  { label: "Period 1", time: "08:00 AM – 08:45 AM", cls: "Class 10 A", subject: "Mathematics", done: true  },
  { label: "Period 2", time: "08:45 AM – 09:30 AM", cls: "Class 10 A", subject: "Mathematics", done: true  },
  { label: "Period 3", time: "09:45 AM – 10:30 AM", cls: "Class 9 B",  subject: "Mathematics", done: false },
  { label: "Period 4", time: "10:30 AM – 11:15 AM", cls: "Class 9 B",  subject: "Mathematics", done: false },
  { label: "Period 5", time: "12:00 PM – 12:45 PM", cls: "Class 8 C",  subject: "Mathematics", done: false },
];
function Timetable() {
  const [open, setOpen] = useState<any>(null);

  return (
    <div className="timetable">
      <div className="timetable__header">
        <div className="timetable__title-group">
          <CalendarDays className="timetable__icon" />
          <div className="timetable__meta">
            <span className="timetable__title">Today's Timetable</span>
            <span className="timetable__date">Monday, 12 May 2025</span>
          </div>
        </div>
        <button className="timetable__btn-full">View Full Timetable</button>
      </div>

      {periods.map((p, i) => (
        <div key={i} className="timetable__row">
          <div className={`timetable__indicator timetable__indicator--${p.done ? "done" : "upcoming"}`} />

          <div className="timetable__period">
            <span className="timetable__period-name">{p.label}</span>
            <span className="timetable__period-time">{p.time}</span>
          </div>

          <div className="timetable__class">
            <span className="timetable__class-name">{p.cls}</span>
            <span className="timetable__class-subject">{p.subject}</span>
          </div>

          <span className={`timetable__badge timetable__badge--${p.done ? "done" : "upcoming"}`}>
            {p.done ? "Completed" : "Upcoming"}
          </span>

          <button
            className="timetable__chevron-btn"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <ChevronDown
              className={`timetable__chevron-icon${open === i ? " timetable__chevron-icon--open" : ""}`}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

// ── QUICK ACTIONS ─────────────────────────────────────────────
const actions = [
  { icon: ClipboardCheck, label: "Mark Attendance", colorKey: "green"  },
  { icon: FilePlus,       label: "Create Homework", colorKey: "blue"   },
  { icon: Upload,         label: "Upload Marks",    colorKey: "orange" },
  { icon: Megaphone,      label: "Post Notice",     colorKey: "purple" },
  { icon: FolderUp,       label: "Upload Material", colorKey: "teal"   },
  { icon: BarChart2,      label: "View Reports",    colorKey: "red"    },
  { icon: CalendarRange,  label: "Exam Schedule",   colorKey: "indigo" },
  { icon: LogOut,         label: "Leave Request",   colorKey: "amber"  },
  { icon: MessageSquare,  label: "Send Message",    colorKey: "cyan"   },
];

function QuickActions() {
  return (
    <div className="quick-actions">
      <div className="quick-actions__header">
        <Zap className="quick-actions__icon" />
        <span className="quick-actions__title">Quick Actions</span>
      </div>
      <div className="quick-actions__grid">
        {actions.map(({ icon: Icon, label, colorKey }) => (
          <button key={label} className="quick-actions__btn">
            <div className={`quick-actions__btn-icon quick-actions__btn-icon--${colorKey}`}>
              <Icon className="icon" />
            </div>
            <span className="quick-actions__btn-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── MY CLASSES ────────────────────────────────────────────────
const classes = [
  { name: "Class 10 A", subject: "Mathematics", students: 32, attendance: 92, colorKey: "blue"   },
  { name: "Class 9 B",  subject: "Mathematics", students: 24, attendance: 89, colorKey: "green"  },
  { name: "Class 8 C",  subject: "Mathematics", students: 12, attendance: 88, colorKey: "orange" },
];

function MyClasses() {
  return (
    <section className="my-classes">
      <div className="my-classes__header">
        <div className="my-classes__title-group">
          <Users  className="my-classes__icon" />
          <span className="my-classes__title">My Classes</span>
        </div>
        <a href="#" className="my-classes__view-all">
          View All Classes <ArrowRight className="icon" />
        </a>
      </div>

      <div className="my-classes__grid">
        {classes.map(({ name, subject, students, attendance, colorKey }) => (
          <div key={name} className="my-classes__card">
            <div className="my-classes__card-top">
              <div className={`my-classes__class-icon my-classes__class-icon--${colorKey}`}>
                <Users className="icon" />
              </div>
              <div className="my-classes__class-info">
                <span className={`my-classes__class-name my-classes__class-name--${colorKey}`}>{name}</span>
                <span className="my-classes__class-subject">{subject}</span>
              </div>
            </div>

            <div className="my-classes__stats">
              <div>
                <div className="my-classes__stat-label">Students</div>
                <div className="my-classes__stat-value">{students}</div>
              </div>
              <div>
                <div className="my-classes__stat-label">Attendance</div>
                <div className="my-classes__stat-value">{attendance}%</div>
              </div>
            </div>

            <div className="my-classes__progress">
              <div
                className={`my-classes__progress-bar my-classes__progress-bar--${colorKey}`}
                style={{ width: `${attendance}%` }}
              />
            </div>

            <button className={`my-classes__view-btn my-classes__view-btn--${colorKey}`}>
              View Class <ArrowRight className="icon" />
            </button>
          </div>
        ))}

      </div>
    </section>
  );
}

// ── ROOT ──────────────────────────────────────────────────────
export default function TeachersDashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard__inner">

        <div className="dashboard__greeting">
          <div className="dashboard__greeting-text">
            <h1 className="dashboard__greeting-title">
              Good Morning, Mr. Amit Sharma! 👋
            </h1>
            <p className="dashboard__greeting-sub">
              Here's what's happening in your classes today.
            </p>
          </div>
          <div className="dashboard__date">
            <CalendarDays className="icon" />
            Monday, 12 May 2025
          </div>
        </div>

        <div className="dashboard__stats">
          <StatsCards />
        </div>

        <div className="dashboard__grid">
          <Timetable />
          <QuickActions />
        </div>

        <MyClasses />
      </div>
    </div>
  );
}
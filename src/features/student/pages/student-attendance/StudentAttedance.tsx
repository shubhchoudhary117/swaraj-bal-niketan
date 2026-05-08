import { useState } from "react";
import "./StudentAttendance.scss";

import {
  CalendarCheck,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";

const CALENDAR_DAYS = [
  { date: 29, other: true },
  { date: 30, other: true },
  { date: 31, other: true },

  { date: 1, status: "present" },
  { date: 2, status: "present" },
  { date: 3, status: "late" },
  { date: 4, status: "holiday" },

  { date: 5, status: "present" },
  { date: 6, status: "present" },
  { date: 7, status: "absent" },
  { date: 8, status: "present" },

  { date: 9, status: "late" },
  { date: 10, status: "present" },
  { date: 11, status: "holiday" },
  { date: 12, status: "present" },

  { date: 13, status: "present" },
  { date: 14, status: "absent" },
  { date: 15, status: "holiday" },
  { date: 16, status: "present" },

  { date: 17, status: "present" },
  { date: 18, status: "holiday" },
  { date: 19, status: "present" },
  { date: 20, status: "present" },

  { date: 21, status: "absent" },
  { date: 22, status: "present" },
  { date: 23, status: "present" },
  { date: 24, status: "late" },

  { date: 25, status: "holiday" },
  { date: 26, status: "present" },
  { date: 27, status: "present" },
  { date: 28, status: "absent" },

  { date: 29, status: "present" },
  { date: 30, status: "absent" },
  { date: 31, status: "present" },

  { date: 1, other: true },
];

const RECORDS = [
  {
    date: "12 Aug 2024",
    day: "Monday",
    subject: "Mathematics",
    status: "present",
    remarks: "—",
  },
  {
    date: "11 Aug 2024",
    day: "Sunday",
    subject: "—",
    status: "holiday",
    remarks: "Weekly Holiday",
  },
  {
    date: "10 Aug 2024",
    day: "Saturday",
    subject: "Science",
    status: "absent",
    remarks: "Medical Leave",
  },
  {
    date: "9 Aug 2024",
    day: "Friday",
    subject: "English",
    status: "late",
    remarks: "Entered at 09:20 AM",
  },
  {
    date: "8 Aug 2024",
    day: "Thursday",
    subject: "Social Studies",
    status: "present",
    remarks: "—",
  },
  {
    date: "7 Aug 2024",
    day: "Wednesday",
    subject: "Hindi",
    status: "present",
    remarks: "—",
  },
  {
    date: "6 Aug 2024",
    day: "Tuesday",
    subject: "Computer",
    status: "present",
    remarks: "—",
  },
  {
    date: "5 Aug 2024",
    day: "Monday",
    subject: "Mathematics",
    status: "present",
    remarks: "—",
  },
  {
    date: "3 Aug 2024",
    day: "Saturday",
    subject: "Science",
    status: "late",
    remarks: "Traffic",
  },
  {
    date: "2 Aug 2024",
    day: "Friday",
    subject: "English",
    status: "present",
    remarks: "—",
  },
];

const LEGEND = [
  ["present", "Present"],
  ["absent", "Absent"],
  ["late", "Late"],
  ["holiday", "Holiday"],
];

const STATS = [
  {
    color: "blue",
    Icon: CalendarCheck,
    label: "Total Attendance",
    value: "92%",
    sub: "This Month",
  },
  {
    color: "green",
    Icon: CalendarCheck,
    label: "Present Days",
    value: "120",
    sub: "This Month",
  },
  {
    color: "red",
    Icon: CalendarCheck,
    label: "Absent Days",
    value: "8",
    sub: "This Month",
  },
  {
    color: "orange",
    Icon: Clock,
    label: "Late Days",
    value: "3",
    sub: "This Month",
  },
];

export default function StudentAttendance() {
  const [activePage, setActivePage] = useState(1);

  return (
    <section className="student-attendance">
      <div className="student-attendance__header">
        <h1 className="student-attendance__title">Attendance</h1>

        <div className="student-attendance__breadcrumb">
          <a href="#">Dashboard</a>

          <ChevronRight
            size={13}
            className="student-attendance__breadcrumb-separator"
          />

          <span className="student-attendance__breadcrumb-active">
            Attendance
          </span>
        </div>
      </div>

      {/* ======================================
            STATS
      ====================================== */}

      <div className="student-attendance__stats">
        {STATS.map(({ color, Icon, label, value, sub }) => (
          <div className="student-attendance__stat-card" key={label}>
            <div
              className={`student-attendance__stat-icon student-attendance__stat-icon--${color}`}
            >
              <Icon size={24} />
            </div>

            <div className="student-attendance__stat-content">
              <div className="student-attendance__stat-label">
                {label}
              </div>

              <div className="student-attendance__stat-value">
                {value}
              </div>

              <div className="student-attendance__stat-subtitle">
                {sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ======================================
            CALENDAR CARD
      ====================================== */}

      <div className="student-attendance__card">
        <div className="student-attendance__section-header">
          <h2 className="student-attendance__section-title">
            Attendance Calendar
          </h2>

          <div className="student-attendance__calendar-controls">
            <button className="student-attendance__calendar-month-btn">
              <Calendar size={14} />

              <span>August 2024</span>

              <ChevronDown size={14} />
            </button>

            <button className="student-attendance__calendar-nav-btn">
              <ChevronLeft size={14} />
            </button>

            <button className="student-attendance__calendar-nav-btn">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="student-attendance__calendar">
          <div className="student-attendance__calendar-head">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day) => (
                <div
                  key={day}
                  className="student-attendance__calendar-head-cell"
                >
                  {day}
                </div>
              )
            )}
          </div>

          <div className="student-attendance__calendar-body">
            {CALENDAR_DAYS.map((cell, index) => (
              <div
                key={index}
                className={[
                  "student-attendance__calendar-cell",

                  cell.other
                    ? "student-attendance__calendar-cell--other-month"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="student-attendance__calendar-date">
                  {cell.date}
                </div>

                {cell.status && (
                  <div
                    className={`student-attendance__calendar-dot student-attendance__calendar-dot--${cell.status}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="student-attendance__legend">
          {LEGEND.map(([key, label]) => (
            <div
              key={key}
              className="student-attendance__legend-item"
            >
              <div
                className={`student-attendance__legend-dot student-attendance__calendar-dot--${key}`}
              />

              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================
            RECORDS CARD
      ====================================== */}

      <div className="student-attendance__card">
        <div className="student-attendance__section-header">
          <h2 className="student-attendance__section-title">
            Attendance Records
          </h2>

          <div className="student-attendance__filters">
            <button className="student-attendance__filter-btn">
              <Calendar size={13} />

              <span>August 2024</span>

              <ChevronDown size={13} />
            </button>

            <button className="student-attendance__filter-btn">
              <BookOpen size={13} />

              <span>All Subjects</span>

              <ChevronDown size={13} />
            </button>
          </div>
        </div>

        <table className="student-attendance__table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {RECORDS.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>

                <td>{record.day}</td>

                <td>{record.subject}</td>

                <td>
                  <span
                    className={`student-attendance__badge student-attendance__badge--${record.status}`}
                  >
                    {record.status.charAt(0).toUpperCase() +
                      record.status.slice(1)}
                  </span>
                </td>

                <td className="student-attendance__remark">
                  {record.remarks}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="student-attendance__footer">
          <span className="student-attendance__footer-info">
            Showing 1 to 10 of 22 entries
          </span>

          <div className="student-attendance__pagination">
            <button className="student-attendance__page-btn">
              <ChevronLeft size={13} />
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`student-attendance__page-btn ${
                  activePage === page
                    ? "student-attendance__page-btn--active"
                    : ""
                }`}
              >
                {page}
              </button>
            ))}

            <button className="student-attendance__page-btn">
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
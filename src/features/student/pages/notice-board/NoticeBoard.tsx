import { useState } from "react";
import "./NoticeBoard.scss"
import {
  ChevronRight,
  Bell,
  School,
  BookOpen,
  Megaphone,
  FileText,
  Trophy,
  AlertCircle,
  Clock,
  Pin,
} from "lucide-react";


const SCHOOL_NOTICES = [
  {
    id: 1,
    title: "Independence Day Celebration – Attendance Mandatory",
    desc: "School will celebrate Independence Day on 14th August at 8:00 AM in the main ground. All students and staff must attend. Please wear school uniform.",
    date: "12 Aug 2024",
    tag: "event",
    icon: Megaphone,
    iconBg: "#f0fdf4",
    iconColor: "#22c55e",
    pinned: true,
    unread: true,
  },
  {
    id: 2,
    title: "Annual Sports Day – Registration Open",
    desc: "Students can register for Annual Sports Day 2024. Events include running, long jump, cricket, and kabaddi. Last date to register is 20th August.",
    date: "11 Aug 2024",
    tag: "event",
    icon: Trophy,
    iconBg: "#eff6ff",
    iconColor: "#3b82f6",
    pinned: false,
    unread: true,
  },
  {
    id: 3,
    title: "Fee Payment Deadline – August 2024",
    desc: "All parents are requested to pay the school fee before 25th August 2024. Late payment will attract a fine of ₹50 per day.",
    date: "08 Aug 2024",
    tag: "fee",
    icon: AlertCircle,
    iconBg: "#fef2f2",
    iconColor: "#ef4444",
    pinned: false,
    unread: false,
  },
  {
    id: 4,
    title: "New Library Books Available",
    desc: "New books on Science, Hindi Literature, and General Knowledge have been added to the library. Students can borrow from Monday onwards.",
    date: "06 Aug 2024",
    tag: "general",
    icon: BookOpen,
    iconBg: "#eff6ff",
    iconColor: "#3b82f6",
    pinned: false,
    unread: false,
  },
  {
    id: 5,
    title: "School Closed on 12th August",
    desc: "Due to local elections, school will remain closed on 12th August (Monday). Classes will resume normally from 13th August.",
    date: "05 Aug 2024",
    tag: "holiday",
    icon: Bell,
    iconBg: "#fffbeb",
    iconColor: "#f59e0b",
    pinned: false,
    unread: false,
  },
];

const CLASS_NOTICES = [
  {
    id: 1,
    title: "Maths Unit Test on 18th August",
    desc: "Unit test for Mathematics (Chapter 4 and Chapter 5) will be held on 18th August. Bring your own pen, pencil, and geometry box. No borrowing allowed.",
    date: "12 Aug 2024",
    tag: "exam",
    icon: FileText,
    iconBg: "#fef2f2",
    iconColor: "#ef4444",
    pinned: true,
    unread: true,
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting – 24th August",
    desc: "PTM for Class 10 Section A will be held on 24th August from 9 AM to 1 PM. All parents must attend to collect the progress report.",
    date: "10 Aug 2024",
    tag: "general",
    icon: Bell,
    iconBg: "#eff6ff",
    iconColor: "#3b82f6",
    pinned: false,
    unread: true,
  },
  {
    id: 3,
    title: "Science Assignment – Submit by 16th August",
    desc: "Submit your Science assignment on 'Light and Reflection' by 16th August. Write in the practical notebook. Late submissions will not be accepted.",
    date: "08 Aug 2024",
    tag: "activity",
    icon: BookOpen,
    iconBg: "#f0fdf4",
    iconColor: "#22c55e",
    pinned: false,
    unread: true,
  },
  {
    id: 4,
    title: "Half-Yearly Exam Timetable Released",
    desc: "Half-yearly exams will start from 10th September. The full timetable is available on the notice board. Start preparing early.",
    date: "06 Aug 2024",
    tag: "exam",
    icon: AlertCircle,
    iconBg: "#fef2f2",
    iconColor: "#ef4444",
    pinned: false,
    unread: false,
  },
  {
    id: 5,
    title: "English Debate Competition – 22nd August",
    desc: "Class 10 debate competition on 22nd August. Topic: 'Mobile phones should be banned in schools'. Interested students meet the English teacher by Friday.",
    date: "04 Aug 2024",
    tag: "activity",
    icon: Megaphone,
    iconBg: "#f5f3ff",
    iconColor: "#8b5cf6",
    pinned: false,
    unread: false,
  },
];


export default function NoticeBoard() {
  const [activeTab, setActiveTab] = useState("school");

  const notices = activeTab === "school" ? SCHOOL_NOTICES : CLASS_NOTICES;

  return (
    <>
      <div className="nb-page">
        <div className="nb__header">
          <h1 className="nb__title">Notice Board</h1>
          <div className="nb__breadcrumb">
            <a href="#">Dashboard</a>
            <ChevronRight size={13} />
            <span>Notice Board</span>
          </div>
        </div>

        <div className="nb__tabs">
          <button
            className={`nb__tab${activeTab === "school" ? " active" : ""}`}
            onClick={() => setActiveTab("school")}
          >
            <School size={14} />
            School Notices
            <span className="nb__tab-count">5</span>
          </button>
          <button
            className={`nb__tab${activeTab === "class" ? " active" : ""}`}
            onClick={() => setActiveTab("class")}
          >
            <BookOpen size={14} />
            Class Notices
            <span className="nb__tab-count">5</span>
          </button>
        </div>

        <div className="nb__list">
          {notices.map(notice => {
            const Icon = notice.icon;
            return (
              <div
                key={notice.id}
                className={[
                  "nb__notice",
                  notice.pinned ? "pinned" : notice.unread ? "unread" : "",
                ].filter(Boolean).join(" ")}
              >
                {notice.unread && !notice.pinned && (
                  <div className="nb__unread-dot" />
                )}

                <div className="nb__notice-icon" style={{ background: notice.iconBg }}>
                  <Icon size={20} color={notice.iconColor} />
                </div>

                <div className="nb__notice-body">
                  <div className="nb__notice-top">
                    <div className="nb__notice-title">{notice.title}</div>
                    {notice.pinned && (
                      <span className="nb__pin-badge">
                        <Pin size={10} /> Pinned
                      </span>
                    )}
                  </div>
                  <div className="nb__notice-desc">{notice.desc}</div>
                  <div className="nb__notice-footer">
                    <span className={`nb__tag nb__tag--${notice.tag}`}>
                      {notice.tag}
                    </span>
                    <div className="nb__notice-date">
                      <Clock size={11} />
                      {notice.date}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}
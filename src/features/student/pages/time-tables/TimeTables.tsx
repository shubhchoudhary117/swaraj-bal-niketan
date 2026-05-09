import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Download,
  Printer,
  Users,
  BookOpen,
  CalendarDays,
  Calendar,
  ClipboardList,
  Info,
} from "lucide-react";
import "./TimeTables.scss"



const DAYS:any = [
  { key: "mon", label: "Mon", date: "12 May" },
  { key: "tue", label: "Tue", date: "13 May" },
  { key: "wed", label: "Wed", date: "14 May" },
  { key: "thu", label: "Thu", date: "15 May" },
  { key: "fri", label: "Fri", date: "16 May" },
  { key: "sat", label: "Sat", date: "17 May" },
];

const EXAM_ROWS:any = [
  {
    timeStart: "08:00 AM",
    timeEnd: "– 11:00 AM",
    slots: {
      mon: { name: "English",      type: "Exam" },
      tue: { name: "Science",      type: "Exam" },
      wed: { name: "Mathematics",  type: "Exam" },
      thu: { name: "Hindi",        type: "Exam" },
      fri: { name: "Biology",      type: "Exam" },
      sat: null,
    },
  },
  {
    timeStart: "11:30 AM",
    timeEnd: "– 02:30 PM",
    slots: {
      mon: { name: "Mathematics",    type: "Exam" },
      tue: { name: "Social Science", type: "Exam" },
      wed: { name: "English",        type: "Exam" },
      thu: { name: "Physics",        type: "Exam" },
      fri: { name: "IT / Computer",  type: "Exam" },
      sat: null,
    },
  },
  {
    timeStart: "03:00 PM",
    timeEnd: "– 06:00 PM",
    slots: {
      mon: { name: "Science",   type: "Exam" },
      tue: { name: "Hindi",     type: "Exam" },
      wed: { name: "Computer",  type: "Exam" },
      thu: { name: "Chemistry", type: "Exam" },
      fri: { name: "Sanskrit",  type: "Exam" },
      sat: null,
    },
  },
];

const TEST_ROWS:any = [
  {
    timeStart: "08:00 AM",
    timeEnd: "– 09:30 AM",
    slots: {
      mon: { name: "Maths Unit Test", type: "Test" },
      tue: { name: "Science Test",    type: "Test" },
      wed: { name: "English Test",    type: "Test" },
      thu: { name: "SST Test",        type: "Test" },
      fri: { name: "Computer Test",   type: "Test" },
      sat: null,
    },
  },
  {
    timeStart: "10:00 AM",
    timeEnd: "– 11:30 AM",
    slots: {
      mon: { name: "English Test",    type: "Test" },
      tue: { name: "Hindi Test",      type: "Test" },
      wed: { name: "Maths Unit Test", type: "Test" },
      thu: { name: "Science Test",    type: "Test" },
      fri: { name: "Maths Quiz",      type: "Test" },
      sat: null,
    },
  },
  {
    timeStart: "12:00 PM",
    timeEnd: "– 01:30 PM",
    slots: {
      mon: null,
      tue: { name: "SST Test",     type: "Test" },
      wed: null,
      thu: { name: "Hindi Test",   type: "Test" },
      fri: { name: "English Test", type: "Test" },
      sat: null,
    },
  },
  {
    timeStart: "02:00 PM",
    timeEnd: "– 03:30 PM",
    slots: {
      mon: { name: "Science Test",  type: "Test" },
      tue: null,
      wed: { name: "Computer Test", type: "Test" },
      thu: null,
      fri: null,
      sat: null,
    },
  },
];

function TimetableGrid({ rows }:any) {
  return (
    <div className="tt-table__wrap">
      <table className="tt-table__grid">
        <thead>
          <tr>
            <th className="tt-table__head-time">Time / Date</th>
            {DAYS.map((d:any) => (
              <th key={d.key} className={`tt-table__head-day tt-table__head-day--${d.key}`}>
                <span className={`tt-table__day-name tt-table__day-name--${d.key}`}>{d.label}</span>
                <span className="tt-table__day-date">{d.date}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row:any, i:any) => (
            <tr key={i} className="tt-table__body-row">
              <td className="tt-table__time-cell">
                <span className="tt-table__time-value">{row.timeStart}</span>
                <span className="tt-table__time-end">{row.timeEnd}</span>
              </td>
              {DAYS.map((d:any) => {
                const slot = row.slots[d.key];
                return (
                  <td key={d.key} className={`tt-table__subject-cell tt-table__subject-cell--${d.key}`}>
                    {slot ? (
                      <>
                        <span className="tt-table__subject-name">{slot.name}</span>
                        <span className="tt-table__subject-type">({slot.type})</span>
                      </>
                    ) : (
                      <span className="tt-table__empty">--</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Timetables() {
  const [classVal] = useState("10 A");
  const [yearVal]  = useState("2024 – 2025");
  const [termVal]  = useState("Term 2");

  return (
    <div className="timetable-page">

      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header__left">
          <h1 className="page-header__title">Timetable</h1>
          <nav className="page-header__breadcrumb" aria-label="breadcrumb">
            <span className="page-header__breadcrumb-item">Dashboard</span>
            <span className="page-header__breadcrumb-sep">
              <ChevronRight size={13} />
            </span>
            <span className="page-header__breadcrumb-item page-header__breadcrumb-item--active">
              Timetable
            </span>
          </nav>
        </div>

        <div className="page-header__actions">
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="filter-bar">
        <div className="filter-bar__item">
          <div className="filter-bar__icon filter-bar__icon--indigo">
            <Users size={18} />
          </div>
          <div className="filter-bar__content">
            <div className="filter-bar__label">Class</div>
            <div className="filter-bar__select-wrap">
              <span className="filter-bar__value">{classVal}</span>
              <ChevronDown size={16} className="filter-bar__chevron" />
            </div>
          </div>
        </div>

        <div className="filter-bar__item">
          <div className="filter-bar__icon filter-bar__icon--green">
            <BookOpen size={18} />
          </div>
          <div className="filter-bar__content">
            <div className="filter-bar__label">Academic Year</div>
            <div className="filter-bar__select-wrap">
              <span className="filter-bar__value">{yearVal}</span>
              <ChevronDown size={16} className="filter-bar__chevron" />
            </div>
          </div>
        </div>

        <div className="filter-bar__item">
          <div className="filter-bar__icon filter-bar__icon--orange">
            <CalendarDays size={18} />
          </div>
          <div className="filter-bar__content">
            <div className="filter-bar__label">Term</div>
            <div className="filter-bar__select-wrap">
              <span className="filter-bar__value">{termVal}</span>
              <ChevronDown size={16} className="filter-bar__chevron" />
            </div>
          </div>
        </div>

        <div className="filter-bar__item">
          <div className="filter-bar__icon filter-bar__icon--blue">
            <Calendar size={18} />
          </div>
          <div className="filter-bar__content">
            <div className="filter-bar__label">Effective From</div>
            <span className="filter-bar__static">05 Feb 2025</span>
          </div>
        </div>
      </div>

      {/* ── Exams Timetable ── */}
      <section className="timetable-section">
        <div className="timetable-section__header">
          <div className="timetable-section__title-wrap">
            <div className="timetable-section__icon timetable-section__icon--indigo">
              <ClipboardList size={18} />
            </div>
            <h2 className="timetable-section__title">Exams Timetable</h2>
          </div>
          <div className="timetable-section__actions">
            <button className="btn btn--outline">
              <Download size={14} /> Download as PDF
            </button>
            <button className="btn btn--outline">
              <Printer size={14} /> Print Timetable
            </button>
          </div>
        </div>
        <TimetableGrid rows={EXAM_ROWS} />
      </section>

      {/* ── Tests Timetable ── */}
      <section className="timetable-section">
        <div className="timetable-section__header">
          <div className="timetable-section__title-wrap">
            <div className="timetable-section__icon timetable-section__icon--green">
              <ClipboardList size={18} />
            </div>
            <h2 className="timetable-section__title">Tests Timetable</h2>
          </div>
          <div className="timetable-section__actions">
            <button className="btn btn--outline">
              <Download size={14} /> Download as PDF
            </button>
            <button className="btn btn--outline">
              <Printer size={14} /> Print Timetable
            </button>
          </div>
        </div>
        <TimetableGrid rows={TEST_ROWS} />
      </section>

      {/* ── Notice ── */}
      <div className="notice-bar">
        <Info size={15} className="notice-bar__icon" />
        Please note: Timetable is subject to change. Regularly check for updates.
      </div>

    </div>
  );
}
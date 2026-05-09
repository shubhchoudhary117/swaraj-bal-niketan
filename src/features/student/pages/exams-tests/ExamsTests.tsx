import { useState } from "react";
import "./ExamsTests.scss"
import {
  ChevronRight,
  Calendar,
  ClipboardList,
  ClipboardCheck,
  BookOpen,
  FlaskConical,
  Calculator,
  Globe,
  Monitor,
  FileText,
  Clock,
  MapPin,
  Download,
  SlidersHorizontal,
  Home,
} from "lucide-react";
import Breadcrumb from "../../../../shared/common/breadcrumb/Breadcrumb";



const exams = [
  {
    id: "01", name: "Annual Examination 2024-25", subject: "All Subjects",
    type: "Exam", icon: "exam", class: "10 A",
    startDate: "10 Apr 2025", startDay: "Thu",
    endDate: "24 Apr 2025", endDay: "Thu",
    timeL1: "09:00 AM", timeL2: "– 12:00 PM",
    venue: "Main Hall", status: "Upcoming",
  },
  {
    id: "02", name: "Science Unit Test 2", subject: "Physics, Chemistry, Biology",
    type: "Test", icon: "science", class: "10 A",
    startDate: "05 Mar 2025", startDay: "Wed",
    endDate: "05 Mar 2025", endDay: "Wed",
    timeL1: "10:30 AM", timeL2: "– 12:00 PM",
    venue: "Science Lab", status: "Upcoming",
  },
  {
    id: "03", name: "Maths Unit Test 2", subject: "Mathematics",
    type: "Test", icon: "maths", class: "10 A",
    startDate: "12 Mar 2025", startDay: "Wed",
    endDate: "12 Mar 2025", endDay: "Wed",
    timeL1: "10:30 AM", timeL2: "– 12:00 PM",
    venue: "Room 12", status: "Upcoming",
  },
  {
    id: "04", name: "English Half Yearly Exam", subject: "English",
    type: "Exam", icon: "english", class: "10 A",
    startDate: "15 Mar 2025", startDay: "Tue",
    endDate: "15 Mar 2025", endDay: "Tue",
    timeL1: "09:00 AM", timeL2: "– 12:00 PM",
    venue: "Main Hall", status: "Upcoming",
  },
  {
    id: "05", name: "Computer Practical", subject: "Computer",
    type: "Practical", icon: "computer", class: "10 A",
    startDate: "22 Mar 2025", startDay: "Sat",
    endDate: "24 Mar 2025", endDay: "Mon",
    timeL1: "01:00 PM", timeL2: "–04:00 PM",
    venue: "Computer Lab", status: "Upcoming",
  },
  {
    id: "06", name: "Social Studies Test", subject: "History, Civics, Geography",
    type: "Test", icon: "social", class: "10 A",
    startDate: "27 Mar 2025", startDay: "Thu",
    endDate: "27 Mar 2025", endDay: "Thu",
    timeL1: "10:30 AM", timeL2: "– 12:00 PM",
    venue: "Room 14", status: "Upcoming",
  },
];

const iconMap:any = {
  exam:     { el: <FileText size={15} />,     mod: "exam-cell__icon--purple" },
  science:  { el: <FlaskConical size={15} />, mod: "exam-cell__icon--green"  },
  maths:    { el: <Calculator size={15} />,   mod: "exam-cell__icon--teal"   },
  english:  { el: <BookOpen size={15} />,     mod: "exam-cell__icon--indigo" },
  computer: { el: <Monitor size={15} />,      mod: "exam-cell__icon--orange" },
  social:   { el: <Globe size={15} />,        mod: "exam-cell__icon--blue"   },
};

const typeMod:any = { Exam: "type-badge--exam", Test: "type-badge--test", Practical: "type-badge--practical" };

export default function ExamsTests() {
  const [session, setSession] = useState("2024 - 2025");
  const [term,    setTerm]    = useState("Term 2");
  const [type,    setType]    = useState("All (Exams + Tests)");

  return (
    <>
      <main className="exams-page">
        <Breadcrumb title="Exams & Tests" pageName="exams & tests"/>

        <div className="stats">
          <div className="stats__card">
            <div className="stats__icon stats__icon--blue"><Calendar size={22} /></div>
            <div className="stats__body">
              <div className="stats__label">Upcoming Exams</div>
              <div className="stats__value">3</div>
            </div>
          </div>
          <div className="stats__card">
            <div className="stats__icon stats__icon--green"><ClipboardList size={22} /></div>
            <div className="stats__body">
              <div className="stats__label">Upcoming Tests</div>
              <div className="stats__value">5</div>
            </div>
          </div>
          <div className="stats__card">
            <div className="stats__icon stats__icon--orange"><ClipboardCheck size={22} /></div>
            <div className="stats__body">
              <div className="stats__label">Completed</div>
              <div className="stats__value">8</div>
            </div>
          </div>
          <div className="stats__card">
            <div className="stats__icon stats__icon--indigo"><BookOpen size={22} /></div>
            <div className="stats__body">
              <div className="stats__label">Total Exams</div>
              <div className="stats__value">11</div>
              <div className="stats__sub">This Academic Year</div>
            </div>
          </div>
        </div>

        <div className="filter">
          <div className="filter__group">
            <label className="filter__label">Session</label>
            <select className="filter__select" value={session} onChange={e => setSession(e.target.value)}>
              <option>2024 - 2025</option>
              <option>2023 - 2024</option>
            </select>
          </div>
          <div className="filter__group">
            <label className="filter__label">Term</label>
            <select className="filter__select" value={term} onChange={e => setTerm(e.target.value)}>
              <option>Term 1</option>
              <option>Term 2</option>
            </select>
          </div>
          <div className="filter__group">
            <label className="filter__label">Type</label>
            <select className="filter__select" value={type} onChange={e => setType(e.target.value)}>
              <option>All (Exams + Tests)</option>
              <option>Exams Only</option>
              <option>Tests Only</option>
              <option>Practicals Only</option>
            </select>
          </div>
          <button className="filter__btn">
            <SlidersHorizontal size={15} />
            Apply Filter
          </button>
        </div>

        {/* Schedule */}
        <section className="schedule">
          <div className="schedule__header">
            <h2 className="schedule__title">Upcoming Exams &amp; Tests</h2>
            <button className="schedule__download-btn">
              <Download size={14} />
              Download Schedule
            </button>
          </div>

          <div className="schedule__table-wrap">
            <table className="schedule__table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Exam / Test Name</th>
                  <th>Type</th>
                  <th>Class</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Time</th>
                  <th>Venue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((exam) => {
                  const ic = iconMap[exam.icon];
                  return (
                    <tr key={exam.id}>
                      <td><span className="row-number">{exam.id}</span></td>

                      <td>
                        <div className="exam-cell">
                          <div className={`exam-cell__icon ${ic.mod}`}>{ic.el}</div>
                          <div className="exam-cell__info">
                            <span className="exam-cell__name">{exam.name}</span>
                            <span className="exam-cell__subject">{exam.subject}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className={`type-badge ${typeMod[exam.type]}`}>{exam.type}</span>
                      </td>

                      <td>{exam.class}</td>

                      <td>
                        <div className="date-cell">
                          <Calendar size={14} className="date-cell__icon" color="#4f46e5" />
                          <div className="date-cell__info">
                            <div className="date-cell__value">{exam.startDate}</div>
                            <div className="date-cell__day">{exam.startDay}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="date-cell">
                          <Calendar size={14} className="date-cell__icon" color="#4f46e5" />
                          <div className="date-cell__info">
                            <div className="date-cell__value">{exam.endDate}</div>
                            <div className="date-cell__day">{exam.endDay}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="time-cell">
                          <Clock size={14} className="time-cell__icon" color="#4f46e5" />
                          <div className="time-cell__value">
                            <div>{exam.timeL1}</div>
                            <div>{exam.timeL2}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="venue-cell">
                          <MapPin size={13} color="#aaa" />
                          {exam.venue}
                        </div>
                      </td>

                      <td>
                        <span className={`status-badge status-badge--${exam.status.toLowerCase()}`}>
                          {exam.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button className="schedule__view-all">
            View All Exams &amp; Tests
            <ChevronRight size={16} />
          </button>
        </section>

      </main>
    </>
  );
}
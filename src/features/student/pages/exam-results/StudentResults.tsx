import { useState } from "react";
import "./StudentResults.scss"
import {
  Percent,
  Award,
  Trophy,
  ClipboardList,
  BookOpen,
  Languages,
  Calculator,
  FlaskConical,
  Users,
  Monitor,
  Eye,
  Download,
  Info,
  Star,
  ChevronDown,
  Filter,
  RotateCcw,
} from "lucide-react";


const subjects = [
  { icon: BookOpen, name: "English", obtained: 92, outOf: 100, pct: 92, grade: "A+", perf: "Excellent" },
  { icon: Languages, name: "Hindi", obtained: 85, outOf: 100, pct: 85, grade: "A", perf: "Very Good" },
  { icon: Calculator, name: "Mathematics", obtained: 94, outOf: 100, pct: 94, grade: "A+", perf: "Excellent" },
  { icon: FlaskConical, name: "Science", obtained: 88, outOf: 100, pct: 88, grade: "A+", perf: "Excellent" },
  { icon: Users, name: "Social Studies", obtained: 78, outOf: 100, pct: 78, grade: "B+", perf: "Good" },
  { icon: Monitor, name: "Computer", obtained: 82, outOf: 100, pct: 82, grade: "A", perf: "Very Good" },
];

function gradeClass(grade:any) {
  if (grade === "A+") return "subject-table__grade-badge--aplus";
  if (grade === "A") return "subject-table__grade-badge--a";
  return "subject-table__grade-badge--bplus";
}

function perfClass(perf:any) {
  if (perf === "Excellent") return "subject-table__perf-label--excellent";
  if (perf === "Very Good") return "subject-table__perf-label--verygood";
  return "subject-table__perf-label--good";
}

export default function StudentResults() {
  const [exam, setExam] = useState("Annual Exam 2024-25");
  const [term, setTerm] = useState("Term 2");
  const [cls, setCls] = useState("Class 10");
  const [section, setSection] = useState("Section A");

  return (
    <>
      <div className="exam-results">

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <span className="breadcrumb__item">Dashboard</span>
          <span className="breadcrumb__separator">›</span>
          <span className="breadcrumb__active">Exam Results</span>
        </nav>

        <h1 className="exam-results__heading">Exam Results</h1>

        {/* ── FILTER BAR ── */}
        <div className="exam-results__filters">

          {/* Mobile: header row — Filters title + Reset btn */}
          <div className="filter-bar__header">
            <span className="filter-bar__header-title">
              <Filter size={16} /> Filters
            </span>
            <button className="filter-bar__header-reset">
              <RotateCcw size={13} /> Reset
            </button>
          </div>

          {/* Dropdowns — 2-col grid on mobile, inline on desktop */}
          <div className="filter-bar__grid">
            <FilterSelect label="Exam"    icon={<ClipboardList size={15} />} value={exam} />
            <FilterSelect label="Term"    value={term} />
            <FilterSelect label="Class"   value={cls} />
            <FilterSelect label="Section" value={section} />
          </div>

          {/* Desktop only: action buttons */}
          <div className="filter-actions">
            <button className="btn btn--primary">
              <Filter size={15} /> Apply Filters
            </button>
            <button className="btn btn--ghost">
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* ── STATS — Desktop 4-col (hidden on mobile) ── */}
        <div className="exam-results__stats">
          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--blue">
              <Percent size={19} />
            </div>
            <div className="stat-card__body">
              <div className="stat-card__label">Overall Percentage</div>
              <div className="stat-card__value">86.50%</div>
              <span className="stat-card__badge">Passed</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--green">
              <Award size={19} />
            </div>
            <div className="stat-card__body">
              <div className="stat-card__label">Overall Grade</div>
              <div className="stat-card__value">A+</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--purple">
              <Trophy size={19} />
            </div>
            <div className="stat-card__body">
              <div className="stat-card__label">Class Rank</div>
              <div className="stat-card__value">3 / 45</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card__icon-wrap stat-card__icon-wrap--orange">
              <ClipboardList size={19} />
            </div>
            <div className="stat-card__body">
              <div className="stat-card__label">Total Marks</div>
              <div className="stat-card__value">519 / 600</div>
            </div>
          </div>
        </div>

        {/* ── QUICK SUMMARY — Mobile 2×2 (hidden on desktop) ── */}
        <div className="quick-summary">
          <div className="quick-summary__title">Quick Summary</div>
          <div className="quick-summary__grid">
            <div className="quick-summary__card">
              <div className="quick-summary__card-icon-wrap quick-summary__card-icon-wrap--blue">
                <Percent size={18} />
              </div>
              <div className="quick-summary__card-label">Percentage</div>
              <div className="quick-summary__card-value">86.50%</div>
              <span className="quick-summary__card-badge">Passed</span>
            </div>
            <div className="quick-summary__card">
              <div className="quick-summary__card-icon-wrap quick-summary__card-icon-wrap--green">
                <Award size={18} />
              </div>
              <div className="quick-summary__card-label">Grade</div>
              <div className="quick-summary__card-value">A+</div>
            </div>
            <div className="quick-summary__card">
              <div className="quick-summary__card-icon-wrap quick-summary__card-icon-wrap--purple">
                <Trophy size={18} />
              </div>
              <div className="quick-summary__card-label">Class Rank</div>
              <div className="quick-summary__card-value">3 / 45</div>
            </div>
            <div className="quick-summary__card">
              <div className="quick-summary__card-icon-wrap quick-summary__card-icon-wrap--orange">
                <ClipboardList size={18} />
              </div>
              <div className="quick-summary__card-label">Total Marks</div>
              <div className="quick-summary__card-value">519 / 600</div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Table + Actions ── */}
        <div className="exam-results__bottom">

          {/* Subject Table */}
          <div className="subject-table">
            <div className="subject-table__header">Subject Performance</div>
            <div className="subject-table__table-wrapper">
            <table className="subject-table__table">
              <thead>
                <tr>
                  <th className="subject-table__th">Subject</th>
                  <th className="subject-table__th">Obtained Marks</th>
                  <th className="subject-table__th subject-table__th--outof">Out of</th>
                  <th className="subject-table__th">Percentage</th>
                  <th className="subject-table__th">Grade</th>
                  <th className="subject-table__th">Performance</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((s) => (
                  <tr key={s.name} className="subject-table__row">
                    <td className="subject-table__td">
                      <div className="subject-table__subject-cell">
                        <s.icon size={16} className="subject-table__subject-icon" />
                        {s.name}
                      </div>
                    </td>
                    <td className="subject-table__td">{s.obtained}</td>
                    <td className="subject-table__td subject-table__td--outof">{s.outOf}</td>
                    <td className="subject-table__td">{s.pct}%</td>
                    <td className="subject-table__td">
                      <span className={`subject-table__grade-badge ${gradeClass(s.grade)}`}>
                        {s.grade}
                      </span>
                    </td>
                    <td className="subject-table__td">
                      <div className="subject-table__perf-cell">
                        <span className={`subject-table__perf-label ${perfClass(s.perf)}`}>
                          {s.perf}
                        </span>
                        <div className="subject-table__perf-bar-track">
                          <div
                            className="subject-table__perf-bar-fill"
                            style={{ width: `${s.pct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="subject-table__row subject-table__row--total">
                  <td className="subject-table__td"><strong>Total</strong></td>
                  <td className="subject-table__td"><strong>519</strong></td>
                  <td className="subject-table__td subject-table__td--outof"><strong>600</strong></td>
                  <td className="subject-table__td"><strong>86.50%</strong></td>
                  <td className="subject-table__td">
                    <span className="subject-table__grade-badge subject-table__grade-badge--aplus">A+</span>
                  </td>
                  <td className="subject-table__td"></td>
                </tr>
              </tbody>
            </table>
             </div>
            <div className="subject-table__footer">
              <Info size={14} />
              Passing Marks: 33% in each subject
            </div>
          </div>

          {/* Actions Panel */}
          <div className="actions-panel">
            <div className="actions-panel__title">Actions</div>
            <div className="actions-panel__buttons">
              <button className="btn btn--block">
                <Eye size={15} /> View Full Marksheet
              </button>
              <button className="btn btn--outline">
                <Download size={15} /> Download Marksheet
              </button>
            </div>
            <div className="actions-panel__help">
              <Info size={15} className="actions-panel__help-icon" />
              <div>
                <div className="actions-panel__help-title">Need help?</div>
                <div className="actions-panel__help-text">
                  If you have any questions about your results, contact your class teacher.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Congrats Banner */}
        <div className="exam-results__congrats">
          <div className="exam-results__congrats-left">
            <Star size={19} className="exam-results__congrats-icon" fill="#f5a623" />
            <div>
              <div className="exam-results__congrats-title">Great Job, Ananya! 🎉</div>
              <div className="exam-results__congrats-sub">Keep up the good work and aim even higher!</div>
            </div>
          </div>
          <div className="exam-results__congrats-img">🎓</div>
        </div>

      </div>
    </>
  );
}

function FilterSelect({ label, icon, value }:any) {
  return (
    <div className="filter-select">
      <div className="filter-select__label">{label}</div>
      <div className="filter-select__control">
        {icon && <span className="filter-select__control-icon">{icon}</span>}
        <span className="filter-select__control-text">{value}</span>
        <ChevronDown size={14} className="filter-select__control-chevron" />
      </div>
    </div>
  );
}
import { useState } from "react";
import "./FessPayment.scss"
import {
  School,
  User,
  CreditCard,
  Calendar,
  Hash,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Wallet,
  ArrowRight,
  X,
  Info,
} from "lucide-react";


/* ─── DUMMY DATA ─────────────────────────────── */

const student = {
  studentname: "Rahul Kumar Sharma",
  fathername: "Ramesh Kumar Sharma",
  enrollment: "EN2022CS101",
  classname: "10th",
  section: "C",
  scholarNumber: "11210306888",
  feesType: "0832CS201156",
  feesDetails: { duefees: "13550.00", paidfees: "27100.00" },
  studentCategory: { totalFees: "54200.00" },
};

const feesRows = [
  { sr: 1, head: "Tuition Fees (BE)", due: "13550.00", rec: "13550.00", from: "01-Jul-2022", to: "30-Jun-2023", dueDate: "01-Jul-2022" },
  { sr: 2, head: "Bus Fees", due: "6000.00", rec: "6000.00", from: "01-Jul-2022", to: "30-Jun-2023", dueDate: "01-Jul-2022" },
  { sr: 3, head: "Exam Fees", due: "1500.00", rec: "1500.00", from: "01-Jul-2022", to: "30-Jun-2023", dueDate: "01-Sep-2022" },
  { sr: 4, head: "Library Fees", due: "500.00", rec: "500.00", from: "01-Jul-2022", to: "30-Jun-2023", dueDate: "01-Jul-2022" },
  { sr: 5, head: "Sports Fees", due: "750.00", rec: "0.00", from: "01-Jul-2022", to: "30-Jun-2023", dueDate: "01-Aug-2022" },
];

export default function FeesPayment() {
  const [amount, setAmount] = useState(student.feesDetails.duefees);

  const total = parseFloat(student.studentCategory.totalFees);
  const paid = parseFloat(student.feesDetails.paidfees);
  const due = parseFloat(student.feesDetails.duefees);
  const paidPct = Math.round((paid / total) * 100);

  const totalDue = feesRows.reduce((s, r) => s + parseFloat(r.due), 0).toFixed(2);
  const totalRec = feesRows.reduce((s, r) => s + parseFloat(r.rec), 0).toFixed(2);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(`Proceeding to payment of ₹${amount}`);
  };

  return (
    <>

      <div className="fp-page">

        {/* ── HEADER ────────────────────────────── */}
        <div className="fp-header">
          <div className="fp-header-top">
            <div className="fp-school-info">
              <div className="fp-school-logo"><School size={22} /></div>
              <div>
                <div className="fp-school-name">Swaraj bal niketan high school badud</div>
                <div className="fp-student-name-header">{student.studentname}</div>
              </div>
            </div>
            <div className="fp-header-right">
              <span className="fp-year-badge">2022 – 2023</span>
              <span className="fp-page-title">Online Fees Payment</span>
            </div>
          </div>

          <div className="fp-header-bottom">
            <div className="fp-info-chip"><User size={12} /><span className="fp-chip-label">Name:</span>{student.studentname}</div>
            <div className="fp-info-chip"><User size={12} /><span className="fp-chip-label">Father:</span>{student.fathername}</div>
            <div className="fp-info-chip"><Hash size={12} /><span className="fp-chip-label">Scholar No:</span>{student.scholarNumber}</div>
            <div className="fp-info-chip"><BookOpen size={12} /><span className="fp-chip-label">Class:</span>{student.classname} – {student.section}</div>
            <div className="fp-info-chip"><Calendar size={12} /><span className="fp-chip-label">Enrollment:</span>{student.enrollment}</div>
          </div>
        </div>

        {/* ── ID DETAILS ────────────────────────── */}
        <div className="fp-id-card">
          <div className="fp-id-card-header">
            <Hash size={14} color="var(--primary)" />
            <h3>Student Identification Details</h3>
          </div>
          <div className="fp-id-grid">
            <div className="fp-id-field">
              <label>Serial Number</label>
              <div className="fp-id-value">{student.scholarNumber}</div>
            </div>
            <div className="fp-id-field">
              <label>Enrollment</label>
              <div className="fp-id-value">{student.enrollment}</div>
            </div>
            <div className="fp-id-field">
              <label>Fees Type</label>
              <div className="fp-id-value">{student.feesType}</div>
            </div>
            <div className="fp-id-field">
              <label>Year</label>
              <div className="fp-current-year">
                Current Year (2022–23)
              </div>
            </div>
          </div>
        </div>

        {/* ── FEES STRUCTURE TABLE ──────────────── */}
        <div className="fp-fees-card">
          <div className="fp-fees-card-header">
            <div className="fp-fees-card-header-left">
              <CreditCard size={16} color="var(--primary)" />
              <h3>Fees Structure</h3>
            </div>
            <span className="fp-current-badge">Current Year</span>
          </div>
          <div className="fp-fees-table-wrap">   {/* ← add this */}

            <table className="fp-fees-table">
              <thead>
                <tr>
                  <th className="fp-sr">Sr.</th>
                  <th>Head Name</th>
                  <th>Due Amount (₹)</th>
                  <th>Received Amount (₹)</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {feesRows.map(row => (
                  <tr key={row.sr}>
                    <td className="fp-sr">{row.sr}</td>
                    <td className="fp-head-name">{row.head}</td>
                    <td className="fp-amount">₹ {row.due}</td>
                    <td className={`fp-amount${parseFloat(row.rec) > 0 ? " paid" : ""}`}>
                      ₹ {row.rec}
                    </td>
                    <td className="fp-date">{row.from}</td>
                    <td className="fp-date">{row.to}</td>
                    <td className="fp-date">{row.dueDate}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="fp-sr"></td>
                  <td>Total</td>
                  <td>₹ {totalDue}</td>
                  <td>₹ {totalRec}</td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ── BOTTOM GRID ───────────────────────── */}
        <div className="fp-bottom">
          <div className="fp-summary-card">
            <div className="fp-summary-card-header">
              <h3><CheckCircle size={16} color="var(--green)" /> Fees Summary</h3>
            </div>
            <div className="fp-summary-body">
              <div className="fp-summary-row">
                <div className="fp-summary-left">
                  <div className="fp-summary-icon" style={{ background: "#eef1fd" }}>
                    <CreditCard size={16} color="var(--primary)" />
                  </div>
                  <span className="fp-summary-label">Total Amount</span>
                </div>
                <span className="fp-summary-value blue">₹ {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="fp-summary-row">
                <div className="fp-summary-left">
                  <div className="fp-summary-icon" style={{ background: "var(--green-bg)" }}>
                    <CheckCircle size={16} color="var(--green)" />
                  </div>
                  <span className="fp-summary-label">Received Amount</span>
                </div>
                <span className="fp-summary-value green">₹ {paid.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="fp-summary-row">
                <div className="fp-summary-left">
                  <div className="fp-summary-icon" style={{ background: "var(--red-bg)" }}>
                    <AlertCircle size={16} color="var(--red)" />
                  </div>
                  <span className="fp-summary-label">Due Amount</span>
                </div>
                <span className="fp-summary-value red">₹ {due.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="fp-progress-bar-wrap">
                <div className="fp-progress-bar-label">
                  <span>Payment Progress</span>
                  <span style={{ color: "var(--green)", fontWeight: 700 }}>{paidPct}% Paid</span>
                </div>
                <div className="fp-progress-track">
                  <div className="fp-progress-fill" style={{ width: `${paidPct}%` }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
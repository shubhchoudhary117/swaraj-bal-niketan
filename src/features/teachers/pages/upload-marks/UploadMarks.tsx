import { useState } from "react";
import "./UploadMarks.scss";
import {
    Calendar,
    ClipboardList,
    ChevronRight,
    ChevronLeft,
    ChevronDown,
    Info,
    CheckCircle2,
    Save,
    ArrowRight,
    Upload,
    Users,
    UserCheck,
    UserX,
    Clock,
} from "lucide-react";

const STUDENTS = [
    { roll: 1, admission: "SPS/2023/1001", name: "Aarav Sharma", marks: "78" },
    { roll: 2, admission: "SPS/2023/1002", name: "Prisha Verma", marks: "91" },
    { roll: 3, admission: "SPS/2023/1003", name: "Kabir Singh", marks: "66" },
    { roll: 4, admission: "SPS/2023/1004", name: "Ananya Patel", marks: "88" },
    { roll: 5, admission: "SPS/2023/1005", name: "Rohan Mehta", marks: "73" },
    { roll: 6, admission: "SPS/2023/1006", name: "Diya Gupta", marks: "85" },
];

const STATS = [
    { key: "total", label: "Total Students", value: 52, mod: "--total", Icon: Users },
    { key: "present", label: "Present", value: 48, mod: "--present", Icon: UserCheck },
    { key: "absent", label: "Absent", value: 4, mod: "--absent", Icon: UserX },
    { key: "pending", label: "Not Entered", value: 0, mod: "--pending", Icon: Clock },
];

export default function UploadMarks() {
    const [activeTab, setActiveTab] = useState("exam");
    const [marks, setMarks] = useState(
        Object.fromEntries(STUDENTS.map((s) => [s.roll, s.marks]))
    );
    const [absent, setAbsent] = useState<Record<number, boolean>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 6;

    return (
        <div className="upload-marks">
            {/* ── Header ───────────────────────────────────────── */}
            <div className="upload-marks__header">
                <h1 className="upload-marks__title">Upload Marks</h1>
                <nav className="upload-marks__breadcrumb">
                    <span>Dashboard</span>
                    <ChevronRight />
                    <span>Results</span>
                    <ChevronRight />
                    <span style={{ color: "#1e1e2f" }}>Upload Marks</span>
                </nav>
            </div>

            {/* ── Tabs ─────────────────────────────────────────── */}
            <div className="upload-marks__tabs">
                <div className="upload-marks__tab-group">
                    {[
                        { id: "exam", label: "Exam", Icon: Calendar },
                        { id: "test", label: "Test", Icon: ClipboardList },
                    ].map(({ id, label, Icon }) => (
                        <button
                            key={id}
                            className={`upload-marks__tab${activeTab === id ? " upload-marks__tab--active" : ""}`}
                            onClick={() => setActiveTab(id)}
                        >
                            <Icon /> {label}
                        </button>
                    ))}
                </div>

                <div className="upload-marks__info-banner">
                    <Info />
                    You are uploading marks for your subject only.
                </div>
            </div>

            {/* ── Filters ──────────────────────────────────────── */}
            <div className="upload-marks__filters">
                {[
                    {
                        label: "Select Exam",
                        id: "exam",
                        options: ["Final Term Exam 2023-24", "Mid Term Exam 2023-24"],
                    },
                    {
                        label: "Select Class",
                        id: "class",
                        options: [6, 7, 8, 9, 10].map((c) => `Class ${c}`),
                    },
                    {
                        label: "Select Section",
                        id: "section",
                        options: ["A", "B", "C"],
                    },
                    {
                        label: "Subject (You Teach)",
                        id: "subject",
                        options: ["Mathematics", "Science", "English"],
                    },
                ].map(({ label, id, options }) => (
                    <div className="upload-marks__field" key={id}>
                        <label className="upload-marks__label upload-marks__label--required">
                            {label}
                        </label>
                        <div className="upload-marks__select-wrapper">
                            <select className="upload-marks__select">
                                {options.map((o) => (
                                    <option key={String(o)}>{String(o)}</option>
                                ))}
                            </select>
                            <ChevronDown className="select-icon" />
                        </div>
                    </div>
                ))}

                <div className="upload-marks__field">
                    <label className="upload-marks__label upload-marks__label--required">
                        Maximum Marks
                    </label>
                    <input className="upload-marks__input" type="number" defaultValue={100} />
                </div>
            </div>

            {/* ── Stats — card grid ────────────────────────────── */}
            <div className="upload-marks__stats">
                {STATS.map(({ key, label, value, mod, Icon }) => (
                    <div
                        key={key}
                        className={`upload-marks__stat-card upload-marks__stat-card${mod}`}
                    >
                        <div className="upload-marks__stat-icon-wrap">
                            <Icon />
                        </div>
                        <div className="upload-marks__stat-body">
                            <span className="upload-marks__stat-label">{label}</span>
                            <span className="upload-marks__stat-value">{value}</span>
                        </div>
                    </div>
                ))}

                {/* Saved row — spans full width */}
                <div className="upload-marks__stat-saved-row">
                    <span className="upload-marks__saved-time">
                        🕐 Last Saved: 11 May 2024, 11:45 AM
                    </span>
                    <span className="upload-marks__saved-badge">
                        <CheckCircle2 /> Saved
                    </span>
                </div>
            </div>

            {/* ── Table section ─────────────────────────────────── */}
            <div className="upload-marks__table-section">
                <div className="upload-marks__table-header">Enter Marks</div>

                {/* Desktop table */}
                <div className="upload-marks__table-wrapper">
                    <table className="upload-marks__table">
                        <thead className="upload-marks__thead">
                            <tr>
                                <th>Roll No.</th>
                                <th>Admission No.</th>
                                <th>Student Name</th>
                                <th>Marks Obtained (out of 100)</th>
                                <th>Absent</th>
                            </tr>
                        </thead>
                        <tbody className="upload-marks__tbody">
                            {STUDENTS.map((s) => (
                                <tr key={s.roll}>
                                    <td className="upload-marks__roll">{s.roll}</td>
                                    <td className="upload-marks__admission">{s.admission}</td>
                                    <td className="upload-marks__name">{s.name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            className="upload-marks__marks-input"
                                            value={marks[s.roll]}
                                            disabled={!!absent[s.roll]}
                                            onChange={(e) =>
                                                setMarks((prev) => ({ ...prev, [s.roll]: e.target.value }))
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="upload-marks__checkbox"
                                            checked={!!absent[s.roll]}
                                            onChange={(e) =>
                                                setAbsent((prev) => ({ ...prev, [s.roll]: e.target.checked }))
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



                {/* ── Pagination ─────────────────────────────────── */}
                <div className="upload-marks__pagination">
                    <div className="upload-marks__show-entries">
                        Show
                        <select className="upload-marks__entries-select" defaultValue={10}>
                            {[5, 10, 25, 50].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                        entries
                    </div>

                    <div className="upload-marks__pages">
                        <button
                            className="upload-marks__page-btn"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft />
                        </button>

                        {[1, 2, 3].map((p) => (
                            <button
                                key={p}
                                className={`upload-marks__page-btn${currentPage === p ? " upload-marks__page-btn--active" : ""}`}
                                onClick={() => setCurrentPage(p)}
                            >
                                {p}
                            </button>
                        ))}

                        <button className="upload-marks__page-btn" disabled>…</button>

                        <button
                            className={`upload-marks__page-btn${currentPage === totalPages ? " upload-marks__page-btn--active" : ""}`}
                            onClick={() => setCurrentPage(totalPages)}
                        >
                            {totalPages}
                        </button>

                        <button
                            className="upload-marks__page-btn"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
            <div className="upload-marks__actions">
                <button className="upload-marks__btn upload-marks__btn--draft">
                    <Save /> <span>Save Draft</span>
                </button>
                <button className="upload-marks__btn upload-marks__btn--next">
                    <ArrowRight /> Save &amp; Next
                </button>
                <button className="upload-marks__btn upload-marks__btn--publish">
                    <Upload /> Publish
                </button>
            </div>
        </div>
    );
}
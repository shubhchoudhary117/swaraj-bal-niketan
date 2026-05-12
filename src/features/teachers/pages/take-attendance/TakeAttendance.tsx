import React, { useState, useRef, useEffect } from 'react';
import './TakeAttendance.scss';
import {
    Users,
    CheckCircle2,
    XCircle,
    MinusCircle,
    Search,
    Calendar,
    ChevronDown,
    BookOpen,
    Save,
    X,
    SlidersHorizontal,
    ChevronLeft,
    ChevronRight,
    FileText,
    BarChart2,
    UserCheck,
    UserX,
    HelpCircle,
    CheckSquare,
    Square,
    Trash2,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────
type AttendanceStatus = 'present' | 'absent' | 'unmarked';

interface Student {
    id: number;
    roll: string;
    name: string;
    avatar: string;
    status: AttendanceStatus;
    remark: string;
}

// ─── Data ────────────────────────────────────────────────
const INITIAL_STUDENTS: Student[] = [
    { id: 1,  roll: '10A01', name: 'Aarav Sharma',   avatar: 'AS', status: 'present',  remark: '' },
    { id: 2,  roll: '10A02', name: 'Ananya Gupta',   avatar: 'AG', status: 'absent',   remark: '' },
    { id: 3,  roll: '10A03', name: 'Vihaan Mehta',   avatar: 'VM', status: 'present',  remark: '' },
    { id: 4,  roll: '10A04', name: 'Diya Patel',     avatar: 'DP', status: 'unmarked', remark: '' },
    { id: 5,  roll: '10A05', name: 'Reyansh Singh',  avatar: 'RS', status: 'present',  remark: '' },
    { id: 6,  roll: '10A06', name: 'Ishita Verma',   avatar: 'IV', status: 'absent',   remark: '' },
    { id: 7,  roll: '10A07', name: 'Kabir Khan',     avatar: 'KK', status: 'present',  remark: '' },
    { id: 8,  roll: '10A08', name: 'Meera Joshi',    avatar: 'MJ', status: 'unmarked', remark: '' },
    { id: 9,  roll: '10A09', name: 'Arjun Nair',     avatar: 'AN', status: 'present',  remark: '' },
    { id: 10, roll: '10A10', name: 'Saanvi Reddy',   avatar: 'SR', status: 'present',  remark: '' },
    { id: 11, roll: '10A11', name: 'Dhruv Chauhan',  avatar: 'DC', status: 'absent',   remark: '' },
    { id: 12, roll: '10A12', name: 'Priya Iyer',     avatar: 'PI', status: 'present',  remark: '' },
];

const CLASSES   = ['Class 9 A', 'Class 9 B', 'Class 10 A', 'Class 10 B', 'Class 11 A', 'Class 11 B', 'Class 12 A'];
const SUBJECTS  = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science'];
const AVATAR_COLORS = ['#6366f1','#0ea5e9','#10b981','#f59e0b','#ec4899','#8b5cf6','#ef4444','#14b8a6'];

// ─── Helpers ─────────────────────────────────────────────
const avatarColor = (name: string) =>
    AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric',
});

// ─── Small Dropdown ───────────────────────────────────────
interface DropdownProps {
    value: string;
    options: string[];
    icon: React.ReactNode;
    onChange: (v: string) => void;
    label?: string;
}
const Dropdown: React.FC<DropdownProps> = ({ value, options, icon, onChange, label }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const h = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', h);
        return () => document.removeEventListener('mousedown', h);
    }, []);

    return (
        <div className={`ta__select ${open ? 'ta__select--open' : ''}`} ref={ref}>
            {label && <span className="ta__select-label">{label}</span>}
            <button className="ta__select-btn" onClick={() => setOpen(o => !o)}>
                <span className="ta__select-icon">{icon}</span>
                <span className="ta__select-val">{value}</span>
                <ChevronDown size={14} className="ta__select-chevron" />
            </button>
            {open && (
                <div className="ta__select-menu">
                    {options.map(opt => (
                        <button
                            key={opt}
                            className={`ta__select-item ${opt === value ? 'ta__select-item--active' : ''}`}
                            onClick={() => { onChange(opt); setOpen(false); }}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────
const TakeAttendance: React.FC = () => {
    const [students, setStudents]         = useState<Student[]>(INITIAL_STUDENTS);
    const [selectedClass, setSelectedClass] = useState('Class 10 A');
    const [selectedSubject, setSelectedSubject] = useState('Mathematics');
    const [date, setDate]                 = useState(today);
    const [tab, setTab]                   = useState<'all' | 'present' | 'absent' | 'unmarked'>('all');
    const [search, setSearch]             = useState('');
    const [selected, setSelected]         = useState<number[]>([]);
    const [mobileSheet, setMobileSheet]   = useState(false);
    const [savedToast, setSavedToast]     = useState(false);
    const [page, setPage]                 = useState(1);
    const PER_PAGE = 8;

    // stats
    const total    = students.length;
    const present  = students.filter(s => s.status === 'present').length;
    const absent   = students.filter(s => s.status === 'absent').length;
    const unmarked = students.filter(s => s.status === 'unmarked').length;
    const pct      = total ? Math.round((present / total) * 100) : 0;

    // filtered list
    const filtered = students.filter(s => {
        const matchTab =
            tab === 'all' ? true :
            tab === 'present' ? s.status === 'present' :
            tab === 'absent'  ? s.status === 'absent'  :
            s.status === 'unmarked';
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                            s.roll.toLowerCase().includes(search.toLowerCase());
        return matchTab && matchSearch;
    });

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const setStatus = (id: number, status: AttendanceStatus) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    };

    const setRemark = (id: number, remark: string) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, remark } : s));
    };

    const toggleSelect = (id: number) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const markAllPresent  = () => setStudents(prev => prev.map(s => ({ ...s, status: 'present'  })));
    const markAllAbsent   = () => setStudents(prev => prev.map(s => ({ ...s, status: 'absent'   })));

    const bulkMark = (status: AttendanceStatus) => {
        setStudents(prev => prev.map(s => selected.includes(s.id) ? { ...s, status } : s));
        setSelected([]);
    };

    const handleSave = () => {
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 2800);
    };

    const allOnPageSelected = paginated.every(s => selected.includes(s.id));
    const togglePageSelect  = () => {
        if (allOnPageSelected) {
            setSelected(prev => prev.filter(id => !paginated.find(s => s.id === id)));
        } else {
            setSelected(prev => [...new Set([...prev, ...paginated.map(s => s.id)])]);
        }
    };

    return (
        <div className="ta">

            {/* ── HEADER ─────────────────────────── */}
            <div className="ta__header">
                <div className="ta__header-left">
                    <h1 className="ta__title">Take Attendance</h1>
                    <p className="ta__subtitle">Select class, date and mark attendance for students.</p>
                </div>
                <button className="ta__report-btn">
                    <BarChart2 size={15} />
                    View Attendance Report
                </button>
            </div>

            {/* ── CONFIG BAR ─────────────────────── */}
            <div className="ta__config">
                <Dropdown
                    label="Class"
                    value={selectedClass}
                    options={CLASSES}
                    icon={<Users size={15} />}
                    onChange={setSelectedClass}
                />
                <Dropdown
                    label="Subject (Optional)"
                    value={selectedSubject}
                    options={SUBJECTS}
                    icon={<BookOpen size={15} />}
                    onChange={setSelectedSubject}
                />
                <div className="ta__date-field">
                    <span className="ta__select-label">Date</span>
                    <div className="ta__date-inner">
                        <Calendar size={15} className="ta__date-icon" />
                        <span className="ta__date-val">{date}</span>
                    </div>
                </div>

                {/* Stats chips */}
                <div className="ta__stat-chips">
                    <div className="ta__chip ta__chip--blue">
                        <Users size={16} />
                        <div><span className="ta__chip-label">Total</span><strong>{total}</strong></div>
                    </div>
                    <div className="ta__chip ta__chip--green">
                        <UserCheck size={16} />
                        <div><span className="ta__chip-label">Present</span><strong>{present}</strong></div>
                    </div>
                    <div className="ta__chip ta__chip--red">
                        <UserX size={16} />
                        <div><span className="ta__chip-label">Absent</span><strong>{absent}</strong></div>
                    </div>
                    <div className="ta__chip ta__chip--purple">
                        <BarChart2 size={16} />
                        <div><span className="ta__chip-label">Attendance</span><strong>{pct}%</strong></div>
                    </div>
                </div>
            </div>

            {/* ── PROGRESS BAR ───────────────────── */}
            <div className="ta__progress-wrap">
                <div className="ta__progress-bar">
                    <div className="ta__progress-fill ta__progress-fill--present" style={{ width: `${(present/total)*100}%` }} />
                    <div className="ta__progress-fill ta__progress-fill--absent"  style={{ width: `${(absent/total)*100}%`  }} />
                </div>
                <span className="ta__progress-legend">
                    <span className="ta__dot ta__dot--green" /> Present {present}
                    &nbsp;&nbsp;
                    <span className="ta__dot ta__dot--red" /> Absent {absent}
                    &nbsp;&nbsp;
                    <span className="ta__dot ta__dot--gray" /> Unmarked {unmarked}
                </span>
            </div>

            {/* ── TOOLBAR ────────────────────────── */}
            <div className="ta__toolbar">
                {/* Tabs */}
                <div className="ta__tabs">
                    {([
                        { key: 'all',      label: `All (${total})`,         color: '' },
                        { key: 'present',  label: `Present (${present})`,   color: 'green' },
                        { key: 'absent',   label: `Absent (${absent})`,     color: 'red' },
                        { key: 'unmarked', label: `Unmarked (${unmarked})`, color: 'gray' },
                    ] as const).map(t => (
                        <button
                            key={t.key}
                            className={`ta__tab ta__tab--${t.color || 'default'} ${tab === t.key ? 'ta__tab--active' : ''}`}
                            onClick={() => { setTab(t.key); setPage(1); }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="ta__toolbar-right">
                    {/* Search */}
                    <div className="ta__search">
                        <Search size={15} className="ta__search-icon" />
                        <input
                            placeholder="Search student..."
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                        />
                        {search && (
                            <button className="ta__search-clear" onClick={() => setSearch('')}>
                                <X size={13} />
                            </button>
                        )}
                    </div>

                    {/* Mark all buttons — desktop */}
                    <div className="ta__bulk-actions ta__bulk-actions--desktop">
                        <button className="ta__mark-btn ta__mark-btn--present" onClick={markAllPresent}>
                            <UserCheck size={14} /> Mark All Present
                        </button>
                        <button className="ta__mark-btn ta__mark-btn--absent" onClick={markAllAbsent}>
                            <UserX size={14} /> Mark All Absent
                        </button>
                    </div>

                    {/* Mobile filter sheet trigger */}
                    <button className="ta__mobile-sheet-btn" onClick={() => setMobileSheet(true)}>
                        <SlidersHorizontal size={15} />
                        Actions
                    </button>
                </div>
            </div>

            {/* ── BULK SELECTION BAR ─────────────── */}
            {selected.length > 0 && (
                <div className="ta__bulk-bar">
                    <span>{selected.length} student{selected.length > 1 ? 's' : ''} selected</span>
                    <div className="ta__bulk-bar-actions">
                        <button className="ta__bulk-chip ta__bulk-chip--present" onClick={() => bulkMark('present')}>
                            <CheckCircle2 size={14} /> Mark Present
                        </button>
                        <button className="ta__bulk-chip ta__bulk-chip--absent" onClick={() => bulkMark('absent')}>
                            <XCircle size={14} /> Mark Absent
                        </button>
                        <button className="ta__bulk-chip ta__bulk-chip--clear" onClick={() => setSelected([])}>
                            <X size={13} /> Clear
                        </button>
                    </div>
                </div>
            )}

            {/* ── TABLE ──────────────────────────── */}
            <div className="ta__table-wrap">
                <table className="ta__table">
                    <thead>
                        <tr>
                            <th className="ta__th-check">
                                <button className="ta__checkbox" onClick={togglePageSelect} aria-label="Select all">
                                    {allOnPageSelected
                                        ? <CheckSquare size={17} className="ta__checkbox-icon ta__checkbox-icon--checked" />
                                        : <Square size={17} className="ta__checkbox-icon" />
                                    }
                                </button>
                            </th>
                            <th>Roll No.</th>
                            <th>Student Name</th>
                            <th>Status</th>
                            <th className="ta__th-remark">Remarks (Optional)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length === 0 && (
                            <tr><td colSpan={5} className="ta__empty">No students found</td></tr>
                        )}
                        {paginated.map(student => (
                            <tr
                                key={student.id}
                                className={`ta__row ta__row--${student.status} ${selected.includes(student.id) ? 'ta__row--selected' : ''}`}
                            >
                                {/* Checkbox */}
                                <td className="ta__td-check">
                                    <button className="ta__checkbox" onClick={() => toggleSelect(student.id)} aria-label="Select">
                                        {selected.includes(student.id)
                                            ? <CheckSquare size={17} className="ta__checkbox-icon ta__checkbox-icon--checked" />
                                            : <Square size={17} className="ta__checkbox-icon" />
                                        }
                                    </button>
                                </td>

                                {/* Roll */}
                                <td className="ta__roll">{student.roll}</td>

                                {/* Name */}
                                <td>
                                    <div className="ta__student">
                                        <div
                                            className="ta__avatar"
                                            style={{ background: avatarColor(student.name) }}
                                        >
                                            {student.avatar}
                                        </div>
                                        <span className="ta__student-name">{student.name}</span>
                                    </div>
                                </td>

                                {/* Status toggle buttons */}
                                <td>
                                    <div className="ta__status-group">
                                        <button
                                            className={`ta__status-btn ta__status-btn--present ${student.status === 'present' ? 'ta__status-btn--active' : ''}`}
                                            onClick={() => setStatus(student.id, 'present')}
                                        >
                                            <CheckCircle2 size={14} /> P
                                        </button>
                                        <button
                                            className={`ta__status-btn ta__status-btn--absent ${student.status === 'absent' ? 'ta__status-btn--active' : ''}`}
                                            onClick={() => setStatus(student.id, 'absent')}
                                        >
                                            <XCircle size={14} /> A
                                        </button>
                                        <button
                                            className={`ta__status-btn ta__status-btn--unmarked ${student.status === 'unmarked' ? 'ta__status-btn--active' : ''}`}
                                            onClick={() => setStatus(student.id, 'unmarked')}
                                        >
                                            <MinusCircle size={14} /> N/A
                                        </button>
                                    </div>
                                </td>

                                {/* Remark */}
                                <td className="ta__td-remark">
                                    <div className="ta__remark-wrap">
                                        <input
                                            className="ta__remark-input"
                                            placeholder="Add remark..."
                                            value={student.remark}
                                            onChange={e => setRemark(student.id, e.target.value)}
                                        />
                                        {student.remark && (
                                            <button className="ta__remark-clear" onClick={() => setRemark(student.id, '')}>
                                                <Trash2 size={12} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── FOOTER ─────────────────────────── */}
            <div className="ta__footer">
                <p className="ta__footer-text">
                    Showing {filtered.length === 0 ? 0 : (page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length} students
                </p>

                <div className="ta__pagination">
                    <button className="ta__page-nav" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                        <ChevronLeft size={15} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                        <button
                            key={n}
                            className={`ta__page-btn ${n === page ? 'ta__page-btn--active' : ''}`}
                            onClick={() => setPage(n)}
                        >
                            {n}
                        </button>
                    ))}
                    <button className="ta__page-nav" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)}>
                        <ChevronRight size={15} />
                    </button>
                </div>

                <div className="ta__footer-actions">
                    <button className="ta__cancel-btn" onClick={() => setStudents(INITIAL_STUDENTS)}>
                        Cancel
                    </button>
                    <button className="ta__save-btn" onClick={handleSave}>
                        <Save size={15} />
                        Save Attendance
                    </button>
                </div>
            </div>

            {/* ── MOBILE BOTTOM SHEET ────────────── */}
            {mobileSheet && (
                <>
                    <div className="ta__overlay" onClick={() => setMobileSheet(false)} />
                    <div className="ta__sheet">
                        <div className="ta__sheet-handle" />
                        <div className="ta__sheet-header">
                            <span className="ta__sheet-title">Quick Actions</span>
                            <button className="ta__sheet-close" onClick={() => setMobileSheet(false)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="ta__sheet-body">
                            <p className="ta__sheet-section-label">Mark All Students</p>
                            <button className="ta__sheet-action ta__sheet-action--present"
                                onClick={() => { markAllPresent(); setMobileSheet(false); }}>
                                <UserCheck size={18} />
                                <div>
                                    <strong>Mark All Present</strong>
                                    <span>Set all {total} students as present</span>
                                </div>
                            </button>
                            <button className="ta__sheet-action ta__sheet-action--absent"
                                onClick={() => { markAllAbsent(); setMobileSheet(false); }}>
                                <UserX size={18} />
                                <div>
                                    <strong>Mark All Absent</strong>
                                    <span>Set all {total} students as absent</span>
                                </div>
                            </button>

                            {selected.length > 0 && (
                                <>
                                    <p className="ta__sheet-section-label" style={{ marginTop: 20 }}>
                                        Bulk Mark ({selected.length} selected)
                                    </p>
                                    <button className="ta__sheet-action ta__sheet-action--present"
                                        onClick={() => { bulkMark('present'); setMobileSheet(false); }}>
                                        <CheckCircle2 size={18} />
                                        <div>
                                            <strong>Mark Selected Present</strong>
                                            <span>{selected.length} students</span>
                                        </div>
                                    </button>
                                    <button className="ta__sheet-action ta__sheet-action--absent"
                                        onClick={() => { bulkMark('absent'); setMobileSheet(false); }}>
                                        <XCircle size={18} />
                                        <div>
                                            <strong>Mark Selected Absent</strong>
                                            <span>{selected.length} students</span>
                                        </div>
                                    </button>
                                </>
                            )}

                            <p className="ta__sheet-section-label" style={{ marginTop: 20 }}>Save</p>
                            <button className="ta__sheet-action ta__sheet-action--save"
                                onClick={() => { handleSave(); setMobileSheet(false); }}>
                                <Save size={18} />
                                <div>
                                    <strong>Save Attendance</strong>
                                    <span>Submit today's attendance record</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* ── MOBILE CARD LIST (alternative to table) ── */}
            {/* Handled via CSS — table rows become cards on mobile */}

            {/* ── TOAST ──────────────────────────── */}
            {savedToast && (
                <div className="ta__toast">
                    <CheckCircle2 size={18} />
                    Attendance saved successfully!
                </div>
            )}
        </div>
    );
};

export default TakeAttendance;
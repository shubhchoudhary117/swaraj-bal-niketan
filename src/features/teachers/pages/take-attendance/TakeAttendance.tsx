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
    ChevronLeft,
    ChevronRight,
    BarChart2,
    UserCheck,
    UserX,
    CheckSquare,
    Square,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────
type AttendanceStatus = 'present' | 'absent' | 'unmarked';

interface Student {
    id: number;
    roll: string;
    name: string;
    avatar: string;
    status: AttendanceStatus;
}

// ─── Data ────────────────────────────────────────────────
const INITIAL_STUDENTS: Student[] = [
    { id: 1,  roll: '10A01', name: 'Aarav Sharma',   avatar: 'AS', status: 'present'  },
    { id: 2,  roll: '10A02', name: 'Ananya Gupta',   avatar: 'AG', status: 'absent'   },
    { id: 3,  roll: '10A03', name: 'Vihaan Mehta',   avatar: 'VM', status: 'present'  },
    { id: 4,  roll: '10A04', name: 'Diya Patel',     avatar: 'DP', status: 'unmarked' },
    { id: 5,  roll: '10A05', name: 'Reyansh Singh',  avatar: 'RS', status: 'present'  },
    { id: 6,  roll: '10A06', name: 'Ishita Verma',   avatar: 'IV', status: 'absent'   },
    { id: 7,  roll: '10A07', name: 'Kabir Khan',     avatar: 'KK', status: 'present'  },
    { id: 8,  roll: '10A08', name: 'Meera Joshi',    avatar: 'MJ', status: 'unmarked' },
    { id: 9,  roll: '10A09', name: 'Arjun Nair',     avatar: 'AN', status: 'present'  },
    { id: 10, roll: '10A10', name: 'Saanvi Reddy',   avatar: 'SR', status: 'present'  },
    { id: 11, roll: '10A11', name: 'Dhruv Chauhan',  avatar: 'DC', status: 'absent'   },
    { id: 12, roll: '10A12', name: 'Priya Iyer',     avatar: 'PI', status: 'present'  },
];

const CLASSES  = ['Class 9 A', 'Class 9 B', 'Class 10 A', 'Class 10 B', 'Class 11 A', 'Class 12 A'];
const SUBJECTS = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science'];

const AVATAR_COLORS = ['#6366f1','#0ea5e9','#10b981','#f59e0b','#ec4899','#8b5cf6','#ef4444','#14b8a6'];
const avatarColor   = (name: string) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const todayLabel = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'long', year: 'numeric',
});

// ─── Dropdown ────────────────────────────────────────────
interface DropdownProps {
    label: string;
    value: string;
    options: string[];
    icon: React.ReactNode;
    onChange: (v: string) => void;
}
const Dropdown: React.FC<DropdownProps> = ({ label, value, options, icon, onChange }) => {
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
        <div className={`ta__dd ${open ? 'ta__dd--open' : ''}`} ref={ref}>
            <span className="ta__dd-label">{label}</span>
            <button className="ta__dd-btn" onClick={() => setOpen(o => !o)}>
                <span className="ta__dd-icon">{icon}</span>
                <span className="ta__dd-val">{value}</span>
                <ChevronDown size={14} className="ta__dd-chevron" />
            </button>
            {open && (
                <div className="ta__dd-menu">
                    {options.map(opt => (
                        <button
                            key={opt}
                            className={`ta__dd-item ${opt === value ? 'ta__dd-item--active' : ''}`}
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
    const [students, setStudents]           = useState<Student[]>(INITIAL_STUDENTS);
    const [selectedClass, setSelectedClass] = useState('Class 10 A');
    const [selectedSubject, setSelectedSubject] = useState('Mathematics');
    const [tab, setTab]     = useState<'all' | 'present' | 'absent' | 'unmarked'>('all');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<number[]>([]);
    const [savedToast, setSavedToast] = useState(false);
    const [page, setPage]   = useState(1);
    const PER_PAGE = 10;

    const total    = students.length;
    const present  = students.filter(s => s.status === 'present').length;
    const absent   = students.filter(s => s.status === 'absent').length;
    const unmarked = students.filter(s => s.status === 'unmarked').length;
    const pct      = total ? Math.round((present / total) * 100) : 0;

    const filtered = students.filter(s => {
        const matchTab =
            tab === 'all'      ? true :
            tab === 'present'  ? s.status === 'present' :
            tab === 'absent'   ? s.status === 'absent'  :
            s.status === 'unmarked';
        const q = search.toLowerCase();
        return matchTab && (s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q));
    });

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const setStatus = (id: number, status: AttendanceStatus) =>
        setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));

    const toggleSelect = (id: number) =>
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

    const allOnPageSelected = paginated.length > 0 && paginated.every(s => selected.includes(s.id));
    const togglePageSelect  = () => {
        if (allOnPageSelected) {
            setSelected(prev => prev.filter(id => !paginated.find(s => s.id === id)));
        } else {
            setSelected(prev => [...new Set([...prev, ...paginated.map(s => s.id)])]);
        }
    };

    const markAll  = (status: AttendanceStatus) =>
        setStudents(prev => prev.map(s => ({ ...s, status })));

    const bulkMark = (status: AttendanceStatus) => {
        setStudents(prev => prev.map(s => selected.includes(s.id) ? { ...s, status } : s));
        setSelected([]);
    };

    const handleSave = () => {
        setSavedToast(true);
        setTimeout(() => setSavedToast(false), 2500);
    };

    return (
        <div className="ta">

            {/* ── HEADER ── */}
            <div className="ta__header">
                <div>
                    <h1 className="ta__title">Take Attendance</h1>
                    <p className="ta__subtitle">{todayLabel} &middot; {selectedClass}</p>
                </div>
                <button className="ta__report-btn">
                    <BarChart2 size={15} />
                    <span>Report</span>
                </button>
            </div>

            {/* ── CONFIG ── */}
            <div className="ta__config">
                <Dropdown label="Class" value={selectedClass} options={CLASSES}
                    icon={<Users size={15} />} onChange={v => { setSelectedClass(v); setPage(1); }} />
                <Dropdown label="Subject" value={selectedSubject} options={SUBJECTS}
                    icon={<BookOpen size={15} />} onChange={setSelectedSubject} />
                <div className="ta__date-box">
                    <span className="ta__dd-label">Date</span>
                    <div className="ta__date-inner">
                        <Calendar size={15} />
                        <span>{todayLabel}</span>
                    </div>
                </div>
            </div>

            {/* ── STATS ── */}
            <div className="ta__stats">
                <div className="ta__stat ta__stat--blue">
                    <strong>{total}</strong>
                    <span>Total</span>
                </div>
                <div className="ta__stat ta__stat--green">
                    <strong>{present}</strong>
                    <span>Present</span>
                </div>
                <div className="ta__stat ta__stat--red">
                    <strong>{absent}</strong>
                    <span>Absent</span>
                </div>
                <div className="ta__stat ta__stat--amber">
                    <strong>{unmarked}</strong>
                    <span>Unmarked</span>
                </div>
                <div className="ta__stat ta__stat--purple">
                    <strong>{pct}%</strong>
                    <span>Attendance</span>
                </div>
            </div>

            {/* ── PROGRESS ── */}
            <div className="ta__progress">
                <div className="ta__progress-bar">
                    <div className="ta__progress-present" style={{ width: `${(present / total) * 100}%` }} />
                    <div className="ta__progress-absent"  style={{ width: `${(absent  / total) * 100}%` }} />
                </div>
            </div>

            {/* ── MARK ALL ── */}
            <div className="ta__mark-all">
                <span className="ta__mark-all-label">Quick Mark All:</span>
                <button className="ta__mark-all-btn ta__mark-all-btn--present" onClick={() => markAll('present')}>
                    <UserCheck size={14} /> All Present
                </button>
                <button className="ta__mark-all-btn ta__mark-all-btn--absent" onClick={() => markAll('absent')}>
                    <UserX size={14} /> All Absent
                </button>
            </div>

            {/* ── TABS + SEARCH ── */}
            <div className="ta__toolbar">
                <div className="ta__tabs">
                    {([
                        { key: 'all',      label: 'All',      count: total    },
                        { key: 'present',  label: 'Present',  count: present  },
                        { key: 'absent',   label: 'Absent',   count: absent   },
                        { key: 'unmarked', label: 'Unmarked', count: unmarked },
                    ] as const).map(t => (
                        <button
                            key={t.key}
                            className={`ta__tab ta__tab--${t.key} ${tab === t.key ? 'ta__tab--active' : ''}`}
                            onClick={() => { setTab(t.key); setPage(1); }}
                        >
                            {t.label}
                            <span className="ta__tab-count">{t.count}</span>
                        </button>
                    ))}
                </div>

                <div className="ta__search">
                    <Search size={14} />
                    <input
                        placeholder="Search by name or roll..."
                        value={search}
                        onChange={e => { setSearch(e.target.value); setPage(1); }}
                    />
                    {search && <button onClick={() => setSearch('')}><X size={13} /></button>}
                </div>
            </div>

            {/* ── BULK BAR ── */}
            {selected.length > 0 && (
                <div className="ta__bulk-bar">
                    <span>{selected.length} selected</span>
                    <div className="ta__bulk-actions">
                        <button className="ta__bulk-btn ta__bulk-btn--present" onClick={() => bulkMark('present')}>
                            <CheckCircle2 size={13} /> Present
                        </button>
                        <button className="ta__bulk-btn ta__bulk-btn--absent" onClick={() => bulkMark('absent')}>
                            <XCircle size={13} /> Absent
                        </button>
                        <button className="ta__bulk-btn ta__bulk-btn--clear" onClick={() => setSelected([])}>
                            <X size={13} /> Clear
                        </button>
                    </div>
                </div>
            )}

            {/* ── DESKTOP TABLE ── */}
            <div className="ta__table-wrap">
                <table className="ta__table">
                    <thead>
                        <tr>
                            <th>
                                <button className="ta__check-btn" onClick={togglePageSelect}>
                                    {allOnPageSelected
                                        ? <CheckSquare size={16} className="checked" />
                                        : <Square size={16} />}
                                </button>
                            </th>
                            <th>Roll</th>
                            <th>Student</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length === 0 && (
                            <tr><td colSpan={4} className="ta__empty">No students found</td></tr>
                        )}
                        {paginated.map(s => (
                            <tr key={s.id} className={`ta__row ta__row--${s.status} ${selected.includes(s.id) ? 'ta__row--sel' : ''}`}>
                                <td>
                                    <button className="ta__check-btn" onClick={() => toggleSelect(s.id)}>
                                        {selected.includes(s.id)
                                            ? <CheckSquare size={16} className="checked" />
                                            : <Square size={16} />}
                                    </button>
                                </td>
                                <td className="ta__roll">{s.roll}</td>
                                <td>
                                    <div className="ta__student">
                                        <div className="ta__avatar" style={{ background: avatarColor(s.name) }}>
                                            {s.avatar}
                                        </div>
                                        <span>{s.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="ta__btns">
                                        <button
                                            className={`ta__btn ta__btn--p ${s.status === 'present' ? 'active' : ''}`}
                                            onClick={() => setStatus(s.id, 'present')}
                                        >
                                            <CheckCircle2 size={14} /> Present
                                        </button>
                                        <button
                                            className={`ta__btn ta__btn--a ${s.status === 'absent' ? 'active' : ''}`}
                                            onClick={() => setStatus(s.id, 'absent')}
                                        >
                                            <XCircle size={14} /> Absent
                                        </button>
                                        <button
                                            className={`ta__btn ta__btn--n ${s.status === 'unmarked' ? 'active' : ''}`}
                                            onClick={() => setStatus(s.id, 'unmarked')}
                                        >
                                            <MinusCircle size={14} /> N/A
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── MOBILE CARDS ── */}
            <div className="ta__cards">
                {paginated.length === 0 && (
                    <div className="ta__empty">No students found</div>
                )}
                {paginated.map(s => (
                    <div key={s.id} className={`ta__card ta__card--${s.status}`}>
                        <div className="ta__card-left">
                            <div className="ta__avatar" style={{ background: avatarColor(s.name) }}>
                                {s.avatar}
                            </div>
                            <div className="ta__card-info">
                                <span className="ta__card-name">{s.name}</span>
                                <span className="ta__card-roll">{s.roll}</span>
                            </div>
                        </div>
                        <div className="ta__card-btns">
                            <button
                                className={`ta__btn ta__btn--p ${s.status === 'present' ? 'active' : ''}`}
                                onClick={() => setStatus(s.id, 'present')}
                            >
                                <CheckCircle2 size={15} />
                                <span>P</span>
                            </button>
                            <button
                                className={`ta__btn ta__btn--a ${s.status === 'absent' ? 'active' : ''}`}
                                onClick={() => setStatus(s.id, 'absent')}
                            >
                                <XCircle size={15} />
                                <span>A</span>
                            </button>
                            <button
                                className={`ta__btn ta__btn--n ${s.status === 'unmarked' ? 'active' : ''}`}
                                onClick={() => setStatus(s.id, 'unmarked')}
                            >
                                <MinusCircle size={15} />
                                <span>N/A</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── FOOTER ── */}
            <div className="ta__footer">
                <p className="ta__footer-info">
                    {filtered.length === 0 ? '0' : (page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
                </p>

                <div className="ta__pagination">
                    <button className="ta__pg-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                        <ChevronLeft size={15} />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                        <button key={n} className={`ta__pg-num ${n === page ? 'active' : ''}`} onClick={() => setPage(n)}>
                            {n}
                        </button>
                    ))}
                    <button className="ta__pg-btn" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => p + 1)}>
                        <ChevronRight size={15} />
                    </button>
                </div>

                <div className="ta__footer-actions">
                    <button className="ta__cancel-btn" onClick={() => { setStudents(INITIAL_STUDENTS); setSelected([]); }}>
                        Cancel
                    </button>
                    <button className="ta__save-btn" onClick={handleSave}>
                        <Save size={15} />
                        Save Attendance
                    </button>
                </div>
            </div>

            {/* ── TOAST ── */}
            {savedToast && (
                <div className="ta__toast">
                    <CheckCircle2 size={17} />
                    Attendance saved!
                </div>
            )}
        </div>
    );
};

export default TakeAttendance;
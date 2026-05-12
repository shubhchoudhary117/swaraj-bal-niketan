import React, { useState, useRef, useEffect } from 'react';
import './Students.scss';
import {
    Search,
    ChevronDown,
    Download,
    Users,
    User,
    UserRound,
    Calendar,
    GraduationCap,
    CircleDot,
    Check,
    SlidersHorizontal,
    X,
} from 'lucide-react';
import Breadcrumb from '../../../../shared/common/breadcrumb/Breadcrumb';
const students = [
  {
    id: 1,
    name: 'Aarav Sharma',
    gender: 'Male',
    section: 'A',
    rollNumber: '10A01',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Ananya Gupta',
    gender: 'Female',
    section: 'B',
    rollNumber: '10B02',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    name: 'Vihaan Mehta',
    gender: 'Male',
    section: 'A',
    rollNumber: '10A03',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 4,
    name: 'Diya Patel',
    gender: 'Female',
    section: 'C',
    rollNumber: '10C04',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 5,
    name: 'Reyansh Singh',
    gender: 'Male',
    section: 'B',
    rollNumber: '10B05',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: 6,
    name: 'Ishita Verma',
    gender: 'Female',
    section: 'A',
    rollNumber: '10A06',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    id: 7,
    name: 'Kabir Khan',
    gender: 'Male',
    section: 'C',
    rollNumber: '10C07',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    id: 8,
    name: 'Meera Joshi',
    gender: 'Female',
    section: 'B',
    rollNumber: '10B08',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    id: 9,
    name: 'Arjun Rao',
    gender: 'Male',
    section: 'A',
    rollNumber: '10A09',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    id: 10,
    name: 'Sneha Iyer',
    gender: 'Female',
    section: 'C',
    rollNumber: '10C10',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
  },

  {
    id: 11,
    name: 'Yash Malhotra',
    gender: 'Male',
    section: 'B',
    rollNumber: '10B11',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    id: 12,
    name: 'Pooja Sharma',
    gender: 'Female',
    section: 'A',
    rollNumber: '10A12',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: 13,
    name: 'Rohan Kapoor',
    gender: 'Male',
    section: 'C',
    rollNumber: '10C13',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/13.jpg',
  },
  {
    id: 14,
    name: 'Tanya Bhatia',
    gender: 'Female',
    section: 'B',
    rollNumber: '10B14',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/women/14.jpg',
  },
  {
    id: 15,
    name: 'Dev Patel',
    gender: 'Male',
    section: 'A',
    rollNumber: '10A15',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/15.jpg',
  },
  {
    id: 16,
    name: 'Kiara Nair',
    gender: 'Female',
    section: 'C',
    rollNumber: '10C16',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/16.jpg',
  },
  {
    id: 17,
    name: 'Aditya Jain',
    gender: 'Male',
    section: 'B',
    rollNumber: '10B17',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/men/17.jpg',
  },
  {
    id: 18,
    name: 'Riya Saxena',
    gender: 'Female',
    section: 'A',
    rollNumber: '10A18',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/18.jpg',
  },
  {
    id: 19,
    name: 'Aryan Gupta',
    gender: 'Male',
    section: 'C',
    rollNumber: '10C19',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/19.jpg',
  },
  {
    id: 20,
    name: 'Simran Kaur',
    gender: 'Female',
    section: 'B',
    rollNumber: '10B20',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/women/20.jpg',
  },

  {
    id: 21,
    name: 'Harsh Yadav',
    gender: 'Male',
    section: 'A',
    rollNumber: '10A21',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/21.jpg',
  },
  {
    id: 22,
    name: 'Naina Roy',
    gender: 'Female',
    section: 'C',
    rollNumber: '10C22',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    id: 23,
    name: 'Kunal Verma',
    gender: 'Male',
    section: 'B',
    rollNumber: '10B23',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
  {
    id: 24,
    name: 'Aisha Khan',
    gender: 'Female',
    section: 'A',
    rollNumber: '10A24',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/24.jpg',
  },
  {
    id: 25,
    name: 'Laksh Sharma',
    gender: 'Male',
    section: 'C',
    rollNumber: '10C25',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/25.jpg',
  },

  {
    id: 26,
    name: 'Neha Arora',
    gender: 'Female',
    section: 'B',
    rollNumber: '10B26',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/women/26.jpg',
  },
  {
    id: 27,
    name: 'Rahul Das',
    gender: 'Male',
    section: 'A',
    rollNumber: '10A27',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/27.jpg',
  },
  {
    id: 28,
    name: 'Priya Menon',
    gender: 'Female',
    section: 'C',
    rollNumber: '10C28',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
  },
  {
    id: 29,
    name: 'Siddharth Rao',
    gender: 'Male',
    section: 'B',
    rollNumber: '10B29',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/men/29.jpg',
  },
  {
    id: 30,
    name: 'Anvi Kapoor',
    gender: 'Female',
    section: 'A',
    rollNumber: '10A30',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/30.jpg',
  },

  {
    id: 31,
    name: 'Rudra Singh',
    gender: 'Male',
    section: 'C',
    rollNumber: '10C31',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/31.jpg',
  },
  {
    id: 32,
    name: 'Sara Ali',
    gender: 'Female',
    section: 'B',
    rollNumber: '10B32',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    id: 33,
    name: 'Mohit Chauhan',
    gender: 'Male',
    section: 'A',
    rollNumber: '10A33',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
  },
  {
    id: 34,
    name: 'Ira Bhatt',
    gender: 'Female',
    section: 'C',
    rollNumber: '10C34',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/34.jpg',
  },
  {
    id: 35,
    name: 'Dhruv Mishra',
    gender: 'Male',
    section: 'B',
    rollNumber: '10B35',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/men/35.jpg',
  },

  {
    id: 36,
    name: 'Kashvi Jain',
    gender: 'Female',
    section: 'A',
    rollNumber: '10A36',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/36.jpg',
  },
  {
    id: 37,
    name: 'Parth Shah',
    gender: 'Male',
    section: 'C',
    rollNumber: '10C37',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/37.jpg',
  },
  {
    id: 38,
    name: 'Muskan Verma',
    gender: 'Female',
    section: 'B',
    rollNumber: '10B38',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/women/38.jpg',
  },
  {
    id: 39,
    name: 'Aman Gupta',
    gender: 'Male',
    section: 'A',
    rollNumber: '10A39',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/39.jpg',
  },
  {
    id: 40,
    name: 'Tanisha Roy',
    gender: 'Female',
    section: 'C',
    rollNumber: '10C40',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/40.jpg',
  },

  {
    id: 41,
    name: 'Krish Patel',
    gender: 'Male',
    section: 'B',
    rollNumber: '10B41',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
  {
    id: 42,
    name: 'Navya Sinha',
    gender: 'Female',
    section: 'A',
    rollNumber: '10A42',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/42.jpg',
  },
  {
    id: 43,
    name: 'Ritesh Kumar',
    gender: 'Male',
    section: 'C',
    rollNumber: '10C43',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/43.jpg',
  },
  {
    id: 44,
    name: 'Avni Sharma',
    gender: 'Female',
    section: 'B',
    rollNumber: '10B44',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 45,
    name: 'Yuvraj Singh',
    gender: 'Male',
    section: 'A',
    rollNumber: '10A45',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },

  {
    id: 46,
    name: 'Riya Kapoor',
    gender: 'Female',
    section: 'C',
    rollNumber: '10C46',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/46.jpg',
  },
  {
    id: 47,
    name: 'Aryan Malhotra',
    gender: 'Male',
    section: 'B',
    rollNumber: '10B47',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/men/47.jpg',
  },
  {
    id: 48,
    name: 'Pihu Agarwal',
    gender: 'Female',
    section: 'A',
    rollNumber: '10A48',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/women/48.jpg',
  },
  {
    id: 49,
    name: 'Manav Joshi',
    gender: 'Male',
    section: 'C',
    rollNumber: '10C49',
    status: 'Active',
    image: 'https://randomuser.me/api/portraits/men/49.jpg',
  },
  {
    id: 50,
    name: 'Saanvi Mehra',
    gender: 'Female',
    section: 'B',
    rollNumber: '10B50',
    status: 'Inactive',
    image: 'https://randomuser.me/api/portraits/women/50.jpg',
  },
];

const dropdownData = {
    status: ['All Status', 'Active', 'Inactive'],
    section: ['All Sections', 'A Section', 'B Section', 'C Section'],
    gender: ['All Gender', 'Male', 'Female'],
    class: ['Class 8', 'Class 9', 'Class 10', 'Class 11'],
};

type FilterKey = keyof typeof dropdownData;

interface DropdownProps {
    id: FilterKey;
    value: string;
    options: string[];
    openDropdown: string | null;
    onToggle: (id: string) => void;
    onSelect: (type: FilterKey, value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    id,
    value,
    options,
    openDropdown,
    onToggle,
    onSelect,
}) => {
    const isOpen = openDropdown === id;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onToggle('');
            }
        };
        if (isOpen) document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [isOpen]);

    return (
        <div className="sp__dropdown" ref={ref}>
            <button
                className={`sp__filter-btn ${isOpen ? 'sp__filter-btn--open' : ''}`}
                onClick={() => onToggle(isOpen ? '' : id)}
                aria-expanded={isOpen}
            >
                <span>{value}</span>
                <ChevronDown
                    className={`sp__chevron ${isOpen ? 'sp__chevron--up' : ''}`}
                    size={15}
                />
            </button>

            <div className={`sp__dropdown-menu ${isOpen ? 'sp__dropdown-menu--visible' : ''}`}>
                {options.map((item) => (
                    <button
                        key={item}
                        className={`sp__dropdown-item ${value === item ? 'sp__dropdown-item--active' : ''}`}
                        onClick={() => onSelect(id, item)}
                    >
                        {item}
                        {value === item && <Check size={14} className="sp__check-icon" />}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const Students = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [filters, setFilters] = useState({
        status: 'All Status',
        section: 'All Sections',
        gender: 'All Gender',
        class: 'Class 10',
    });

    const handleSelect = (type: FilterKey, value: string) => {
        setFilters((prev) => ({ ...prev, [type]: value }));
        setOpenDropdown(null);
    };

    const handleToggle = (id: string) => {
        setOpenDropdown(id || null);
    };

    return (
        <section className="sp">
            <Breadcrumb title="Students" pageName="Students" />

            {/* ===== STATS ===== */}
            <div className="sp__stats">
                <div className="sp__stat-card">
                    <div className="sp__stat-icon sp__stat-icon--purple">
                        <Users size={20} />
                    </div>
                    <div>
                        <span className="sp__stat-label">Total Students</span>
                        <h3 className="sp__stat-value">32</h3>
                    </div>
                </div>

                <div className="sp__stat-card">
                    <div className="sp__stat-icon sp__stat-icon--green">
                        <User size={20} />
                    </div>
                    <div>
                        <span className="sp__stat-label">Boys</span>
                        <h3 className="sp__stat-value">18</h3>
                    </div>
                </div>

                <div className="sp__stat-card">
                    <div className="sp__stat-icon sp__stat-icon--pink">
                        <UserRound size={20} />
                    </div>
                    <div>
                        <span className="sp__stat-label">Girls</span>
                        <h3 className="sp__stat-value">14</h3>
                    </div>
                </div>

                <div className="sp__stat-card">
                    <div className="sp__stat-icon sp__stat-icon--amber">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <span className="sp__stat-label">Average Age</span>
                        <h3 className="sp__stat-value">15.3 yrs</h3>
                    </div>
                </div>
            </div>

            {/* ===== TOOLBAR ===== */}
            <div className="sp__toolbar">
                <div className="sp__search">
                    <Search size={16} className="sp__search-icon" />
                    <input type="text" placeholder="Search student..." />
                </div>

                {/* Desktop filters */}
                <div className="sp__filters sp__filters--desktop">
                    {(Object.keys(dropdownData) as FilterKey[]).map((key) => (
                        <Dropdown
                            key={key}
                            id={key}
                            value={filters[key]}
                            options={dropdownData[key]}
                            openDropdown={openDropdown}
                            onToggle={handleToggle}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>

                <div className="sp__toolbar-right">
                    {/* Mobile filter toggle */}
                    <button
                        className="sp__mobile-filter-btn"
                        onClick={() => setMobileFiltersOpen(true)}
                    >
                        <SlidersHorizontal size={16} />
                        Filters
                    </button>

                    <button className="sp__export-btn">
                        <Download size={15} />
                        Export
                    </button>
                </div>
            </div>

            {/* ===== MOBILE FILTER SHEET ===== */}
            {mobileFiltersOpen && (
                <>
                    <div
                        className="sp__sheet-overlay"
                        onClick={() => setMobileFiltersOpen(false)}
                    />
                    <div className="sp__sheet">
                        <div className="sp__sheet-header">
                            <span className="sp__sheet-title">Filters</span>
                            <button
                                className="sp__sheet-close"
                                onClick={() => setMobileFiltersOpen(false)}
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="sp__sheet-body">
                            {(Object.keys(dropdownData) as FilterKey[]).map((key) => (
                                <div key={key} className="sp__sheet-group">
                                    <label className="sp__sheet-label">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </label>
                                    <div className="sp__sheet-pills">
                                        {dropdownData[key].map((item) => (
                                            <button
                                                key={item}
                                                className={`sp__pill ${filters[key] === item ? 'sp__pill--active' : ''}`}
                                                onClick={() => handleSelect(key, item)}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="sp__sheet-footer">
                            <button
                                className="sp__sheet-apply"
                                onClick={() => setMobileFiltersOpen(false)}
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* ===== TABLE ===== */}
            <div className="sp__table-wrapper">
                <table className="sp__table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Student</th>
                            <th>Rll Number</th>
                            <th>Section</th>
                            <th>Gender</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id} className="sp__row">
                                <td className="sp__roll">{index + 1}</td>
                                <td>
                                    <div className="sp__student-cell">
                                        <img
                                            src={student.image}
                                            alt={student.name}
                                            className="sp__avatar"
                                        />
                                        <span className="sp__student-name">{student.name}</span>
                                    </div>
                                </td>
                                <td>{student.rollNumber}</td>
                                <td>
                                    <span className="sp__section-badge">{student.section}</span>
                                </td>
                                <td>{student.gender}</td>
                                <td>
                                    <span
                                        className={`sp__status ${
                                            student.status === 'Inactive'
                                                ? 'sp__status--inactive'
                                                : 'sp__status--active'
                                        }`}
                                    >
                                        <span className="sp__status-dot" />
                                        {student.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ===== FOOTER ===== */}
            <div className="sp__footer">
                <p className="sp__footer-text">Showing 1–2 of 32 students</p>

                <div className="sp__pagination">
                    {[1, 2, 3].map((n) => (
                        <button
                            key={n}
                            className={`sp__page-btn ${n === 1 ? 'sp__page-btn--active' : ''}`}
                        >
                            {n}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};
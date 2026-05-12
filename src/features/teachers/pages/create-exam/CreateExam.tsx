import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    LayoutDashboard,
    User,
    ClipboardCheck,
    Users,
    BookOpen,
    Clock,
    FileText,
    CreditCard,
    Library,
    Bell,
    BarChart2,
    Settings,
    LogOut,
    ChevronDown,
    ChevronRight,
    ArrowLeft,
    CalendarDays,
    Timer,
    Upload,
    Menu,
    X,
    AlertCircle,
    GraduationCap,
} from "lucide-react";
import "./CreateExam.scss";
import Breadcrumb from "../../../../shared/common/breadcrumb/Breadcrumb";

// ─── Zod Schema ───────────────────────────────────────────
const examSchema = z.object({
    examType: z.enum(["annual", "test"]),
    annualExam: z.string().min(1, "Annual exam is required"),
    examTitle: z.string().min(2, "Exam title must be at least 2 characters"),
    class: z.string().min(1, "Class is required"),
    section: z.string().optional(),
    subject: z.string().min(1, "Subject is required"),
    academicYear: z.string().min(1, "Academic year is required"),
    examMode: z.string().min(1, "Exam mode is required"),
    examCategory: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endDate: z.string().min(1, "End date is required"),
    endTime: z.string().min(1, "End time is required"),
    duration: z.string().min(1, "Duration is required"),
    instructions: z.string().max(500).optional(),
});

// ─── Dropdown Options ─────────────────────────────────────
const ANNUAL_EXAMS = ["Annual Exam 1", "Annual Exam 2", "Annual Exam 3"];
const CLASSES = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
const SECTIONS = ["Section A", "Section B", "Section C", "Section D"];
const SUBJECTS = ["Mathematics", "Science", "English", "Hindi", "Social Science", "Physics", "Chemistry", "Biology", "Computer Science", "History", "Geography"];
const ACADEMIC_YEARS = ["2024-25", "2025-26", "2026-27"];
const EXAM_MODES = ["Offline", "Online"];
const EXAM_CATEGORIES = ["Pre-Mid Term", "Mid Term", "Final Term", "Unit Test", "Quiz"];
const DURATIONS = ["30 Minutes", "1 Hour", "1 Hour 30 Minutes", "2 Hours", "2 Hours 30 Minutes", "3 Hours"];
const TIMES = Array.from({ length: 48 }, (_, i) => {
    const h = Math.floor(i / 2);
    const m = i % 2 === 0 ? "00" : "30";
    const ampm = h < 12 ? "AM" : "PM";
    const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${hour}:${m} ${ampm}`;
});

// ─── Nav Items ────────────────────────────────────────────
const NAV_ITEMS = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: User, label: "My Profile" },
    { icon: ClipboardCheck, label: "Attendance" },
    { icon: Users, label: "Students" },
    { icon: BookOpen, label: "Exams & Tests", active: true },
    { icon: Clock, label: "Timetable" },
    { icon: FileText, label: "Assignments" },
    { icon: BarChart2, label: "Results" },
    { icon: CreditCard, label: "Fees & Payments" },
    { icon: Library, label: "Library" },
    { icon: Bell, label: "Notices", badge: 3 },
    { icon: BarChart2, label: "Reports" },
];

// ─── Custom Select Component ──────────────────────────────
function CustomSelect({ options, placeholder, value, onChange, error }: any) {
    const [open, setOpen] = useState(false);
    const ref = useRef<any>(null);

    useEffect(() => {
        const handler = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="custom-select" ref={ref}>
            <button
                type="button"
                className={`custom-select__trigger ${open ? "custom-select__trigger--open" : ""} ${error ? "custom-select__trigger--error" : ""} ${!value ? "custom-select__trigger--placeholder" : ""}`}
                onClick={() => setOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span>{value || placeholder}</span>
            </button>
            <ChevronDown
                size={15}
                className={`custom-select__chevron ${open ? "custom-select__chevron--open" : ""}`}
            />
            {open && (
                <div className="custom-select__dropdown" role="listbox">
                    {options.map((opt: any) => (
                        <div
                            key={opt}
                            className={`custom-select__option ${value === opt ? "custom-select__option--selected" : ""}`}
                            onClick={() => { onChange(opt); setOpen(false); }}
                            role="option"
                            aria-selected={value === opt}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


// ─── Main Component ───────────────────────────────────────
export default function CreateExam() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [fileSelected, setFileSelected] = useState(null);
    const fileRef = useRef<any>(null);

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(examSchema),
        defaultValues: {
            examType: "annual",
            annualExam: "",
            examTitle: "",
            class: "",
            section: "",
            subject: "",
            academicYear: "2025-26",
            examMode: "Offline",
            examCategory: "",
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            duration: "",
            instructions: "",
        },
    });

    const examType = watch("examType");
    const instructionsValue = watch("instructions") || "";

    const onSubmit = (data: any) => {
        alert("Form submitted!\n\n" + JSON.stringify(data, null, 2));
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) setFileSelected(file.name);
    };

    return (
        <div className="app-layout">
            <Breadcrumb title="Create Exam" pageName="Create Exam"/>
            <div className="app-layout__main">
                <main className="page-content">
                    <div className="stepper">
                        <div className="stepper__step">
                            <div className="stepper__step-content">
                                <div className="stepper__circle stepper__circle--active">1</div>
                                <span className="stepper__label stepper__label--active">Exam / Test Information</span>
                            </div>
                        </div>
                        <div className="stepper__connector stepper__connector--inactive" />
                        <div className="stepper__step">
                            <div className="stepper__step-content">
                                <div className="stepper__circle stepper__circle--inactive">2</div>
                                <span className="stepper__label stepper__label--inactive">Marks &amp; Evaluation</span>
                            </div>
                        </div>
                        <div className="stepper__connector stepper__connector--inactive" />
                        <div className="stepper__step">
                            <div className="stepper__step-content">
                                <div className="stepper__circle stepper__circle--inactive">3</div>
                                <span className="stepper__label stepper__label--inactive">Additional Settings</span>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>

                        {/* ── Basic Information ── */}
                        {/* ── Basic Information ── */}
                        <div className="form-card">
                            <div className="form-card__header">
                                <div className="form-card__icon"><FileText size={16} /></div>
                                <h2 className="form-card__title">Basic Information</h2>
                            </div>

                            {/* Row 1 */}
                            <div className="form-grid form-grid--4" style={{ marginBottom: 20 }}>
                                <div className="form-field">
                                    <label className="form-field__label">Annual Exam <span>*</span></label>
                                    <Controller
                                        name="annualExam"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                options={ANNUAL_EXAMS}
                                                placeholder="Select Annual Exam"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={!!errors.annualExam}
                                            />
                                        )}
                                    />
                                    {errors.annualExam && (
                                        <span className="form-field__error"><AlertCircle size={12} />{errors.annualExam.message}</span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Exam / Test Title <span>*</span></label>
                                    <input
                                        className={`form-input ${errors.examTitle ? "form-input--error" : ""}`}
                                        placeholder="Enter exam or test title"
                                        {...register("examTitle")}
                                    />
                                    {errors.examTitle && (
                                        <span className="form-field__error"><AlertCircle size={12} />{errors.examTitle.message}</span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Class <span>*</span></label>
                                    <Controller
                                        name="class"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                options={CLASSES}
                                                placeholder="Select Class"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={!!errors.class}
                                            />
                                        )}
                                    />
                                    {errors.class && (
                                        <span className="form-field__error"><AlertCircle size={12} />{errors.class.message}</span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Section <span style={{ fontWeight: 400, color: "#94a3b8" }}>(Optional)</span></label>
                                    <Controller
                                        name="section"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                options={SECTIONS}
                                                placeholder="Select Section"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="form-grid form-grid--4">
                                <div className="form-field">
                                    <label className="form-field__label">Subject <span>*</span></label>
                                    <Controller
                                        name="subject"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                options={SUBJECTS}
                                                placeholder="Select Subject"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={!!errors.subject}
                                            />
                                        )}
                                    />
                                    {errors.subject && (
                                        <span className="form-field__error"><AlertCircle size={12} />{errors.subject.message}</span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Academic Year <span>*</span></label>
                                    <Controller
                                        name="academicYear"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                options={ACADEMIC_YEARS}
                                                placeholder="Select Year"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={!!errors.academicYear}
                                            />
                                        )}
                                    />
                                    {errors.academicYear && (
                                        <span className="form-field__error"><AlertCircle size={12} />{errors.academicYear.message}</span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Exam Mode <span>*</span></label>
                                    <Controller
                                        name="examMode"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                options={EXAM_MODES}
                                                placeholder="Select Mode"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={!!errors.examMode}
                                            />
                                        )}
                                    />
                                    {errors.examMode && (
                                        <span className="form-field__error"><AlertCircle size={12} />{errors.examMode.message}</span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Exam Category <span style={{ fontWeight: 400, color: "#94a3b8" }}>(Optional)</span></label>
                                    <Controller
                                        name="examCategory"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                options={EXAM_CATEGORIES}
                                                placeholder="Select Category"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <p style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 4 }}>e.g. Pre-Mid Term, Mid Term, Final Term</p>
                                </div>
                            </div>
                        </div>

                        {/* ── Schedule ── */}
                        <div className="form-card">
                            <div className="form-card__header">
                                <div className="form-card__icon"><CalendarDays size={16} /></div>
                                <h2 className="form-card__title">Schedule</h2>
                            </div>

                            <div className="form-grid form-grid--5-col">
                                <div className="form-field">
                                    <label className="form-field__label">Start Date <span>*</span></label>
                                    <div className="input-wrapper">
                                        <span className="input-wrapper__icon"><CalendarDays size={14} /></span>
                                        <input
                                            type="date"
                                            className={`form-input form-input--with-icon ${errors.startDate ? "form-input--error" : ""}`}
                                            {...register("startDate")}
                                        />
                                    </div>
                                    {errors.startDate && (
                                        <span className="form-field__error"><AlertCircle size={12} />{errors.startDate.message}</span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Start Time <span>*</span></label>
                                    <Controller
                                        name="startTime"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="input-wrapper">
                                                <span className="input-wrapper__icon"><Timer size={14} /></span>
                                                <div style={{ width: "100%", paddingLeft: 28 }}>
                                                    <CustomSelect
                                                        options={TIMES}
                                                        placeholder="Select start time"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        error={!!errors.startTime}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    />
                                    {errors.startTime && (
                                        <span className="form-field__error"><AlertCircle size={12} />{errors.startTime.message}</span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">End Date <span>*</span></label>
                                    <div className="input-wrapper">
                                        <span className="input-wrapper__icon"><CalendarDays size={14} /></span>
                                        <input
                                            type="date"
                                            className={`form-input form-input--with-icon ${errors.endDate ? "form-input--error" : ""}`}
                                            {...register("endDate")}
                                        />
                                    </div>
                                    {errors.endDate && (
                                        <span className="form-field__error"><AlertCircle size={12} />{errors.endDate.message}</span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">End Time <span>*</span></label>
                                    <Controller
                                        name="endTime"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="input-wrapper">
                                                <span className="input-wrapper__icon"><Timer size={14} /></span>
                                                <div style={{ width: "100%", paddingLeft: 28 }}>
                                                    <CustomSelect
                                                        options={TIMES}
                                                        placeholder="Select end time"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        error={!!errors.endTime}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    />
                                    {errors.endTime && (
                                        <span className="form-field__error"><AlertCircle size={12} />{errors.endTime.message}</span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Duration <span>*</span></label>
                                    <Controller
                                        name="duration"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="input-wrapper">
                                                <span className="input-wrapper__icon"><Timer size={14} /></span>
                                                <div style={{ width: "100%", paddingLeft: 28 }}>
                                                    <CustomSelect
                                                        options={DURATIONS}
                                                        placeholder="Select duration"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        error={!!errors.duration}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    />
                                    {errors.duration && (
                                        <span className="form-field__error"><AlertCircle size={12} />{errors.duration.message}</span>
                                    )}
                                    <p style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 4 }}>e.g. 2 Hours 30 Minutes</p>
                                </div>
                            </div>
                        </div>

                        {/* ── Instructions ── */}
                        <div className="form-card">
                            <div className="form-card__header">
                                <div className="form-card__icon"><FileText size={16} /></div>
                                <h2 className="form-card__title">Instructions</h2>
                            </div>

                            <div className="instructions-row">
                                <div className="form-field">
                                    <label className="form-field__label">
                                        Instructions for students <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: 12 }}>(will be visible to students)</span>
                                    </label>
                                    <textarea
                                        className={`form-textarea ${errors.instructions ? "form-textarea--error" : ""}`}
                                        placeholder="Write exam instructions..."
                                        maxLength={500}
                                        {...register("instructions")}
                                    />
                                    <p className="form-textarea__counter">{instructionsValue.length} / 500</p>
                                    {errors.instructions && (
                                        <span className="form-field__error"><AlertCircle size={12} />{errors.instructions.message}</span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">Attachments (Optional)</label>
                                    <div
                                        className="file-upload"
                                        onClick={() => fileRef.current?.click()}
                                    >
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            className="file-upload__input"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                        />
                                        <Upload size={22} className="file-upload__icon" />
                                        <p className="file-upload__title">Upload Question Paper / Syllabus / Other Files</p>
                                        <p className="file-upload__subtitle">PDF, DOC, DOCX (Max. 10MB)</p>
                                        {fileSelected ? (
                                            <p className="file-upload__file-name">{fileSelected}</p>
                                        ) : (
                                            <button type="button" className="file-upload__btn">Choose File</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Actions ── */}
                        <div className="form-actions">
                            <button type="button" className="btn btn--cancel">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn--primary">
                                Save &amp; Next
                                <ChevronRight size={16} />
                            </button>
                        </div>

                    </form>
                </main>
            </div>
        </div>
    );
}
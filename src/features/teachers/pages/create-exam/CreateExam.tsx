import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    FileText,
    CalendarDays,
    Timer,
    AlertCircle,
    ChevronRight,
    Save,
} from "lucide-react";
import "./CreateExam.scss";
import Breadcrumb from "../../../../shared/common/breadcrumb/Breadcrumb";
import { CustomSelect } from "../../../../shared/ui/forms/CustomSelect/CustomSelect";

// ─── Zod Schema ───────────────────────────────────────────
const examSchema = z.object({
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
const CLASSES = [
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6",
    "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12",
];
const SECTIONS = ["Section A", "Section B", "Section C", "Section D"];
const SUBJECTS = [
    "Mathematics", "Science", "English", "Hindi", "Social Science",
    "Physics", "Chemistry", "Biology", "Computer Science", "History", "Geography",
];
const ACADEMIC_YEARS = ["2024-25", "2025-26", "2026-27"];
const EXAM_MODES = ["Offline", "Online"];
const EXAM_CATEGORIES = ["Pre-Mid Term", "Mid Term", "Final Term", "Unit Test", "Quiz"];
const DURATIONS = [
    "30 Minutes", "1 Hour", "1 Hour 30 Minutes",
    "2 Hours", "2 Hours 30 Minutes", "3 Hours",
];
const TIMES = Array.from({ length: 48 }, (_, i) => {
    const h = Math.floor(i / 2);
    const m = i % 2 === 0 ? "00" : "30";
    const ampm = h < 12 ? "AM" : "PM";
    const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${hour}:${m} ${ampm}`;
});

// ─── Main Component ───────────────────────────────────────
export default function CreateExam() {
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(examSchema),
        defaultValues: {
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

    const instructionsValue = watch("instructions") || "";

    const onSubmit = (data: any) => {
        alert("Exam Created!\n\n" + JSON.stringify(data, null, 2));
    };

    return (
        <div className="app-layout">
            <Breadcrumb title="Create Exam" pageName="Create Exam" />
            <div className="app-layout__main">
                <main className="page-content">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>

                        {/* ── Basic Information ── */}
                        <div className="form-card">
                            <div className="form-card__header">
                                <div className="form-card__icon"><FileText size={16} /></div>
                                <h2 className="form-card__title">Basic Information</h2>
                            </div>

                            {/* Row 1 */}
                            <div className="form-grid form-grid--4" style={{ marginBottom: 20 }}>
                                <div className="form-field">
                                    <label className="form-field__label">
                                        Annual Exam <span>*</span>
                                    </label>
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
                                        <span className="form-field__error">
                                            <AlertCircle size={12} />{errors.annualExam.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">
                                        Exam / Test Title <span>*</span>
                                    </label>
                                    <input
                                        className={`form-input ${errors.examTitle ? "form-input--error" : ""}`}
                                        placeholder="Enter exam or test title"
                                        {...register("examTitle")}
                                    />
                                    {errors.examTitle && (
                                        <span className="form-field__error">
                                            <AlertCircle size={12} />{errors.examTitle.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">
                                        Class <span>*</span>
                                    </label>
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
                                        <span className="form-field__error">
                                            <AlertCircle size={12} />{errors.class.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">
                                        Section{" "}
                                        <span style={{ fontWeight: 400, color: "#94a3b8" }}>
                                            (Optional)
                                        </span>
                                    </label>
                                    <Controller
                                        name="section"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                options={SECTIONS}
                                                placeholder="Select Section"
                                                value={field.value ?? ""}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="form-grid form-grid--4">
                                <div className="form-field">
                                    <label className="form-field__label">
                                        Subject <span>*</span>
                                    </label>
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
                                        <span className="form-field__error">
                                            <AlertCircle size={12} />{errors.subject.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">
                                        Academic Year <span>*</span>
                                    </label>
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
                                        <span className="form-field__error">
                                            <AlertCircle size={12} />{errors.academicYear.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">
                                        Exam Mode <span>*</span>
                                    </label>
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
                                        <span className="form-field__error">
                                            <AlertCircle size={12} />{errors.examMode.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">
                                        Exam Category{" "}
                                        <span style={{ fontWeight: 400, color: "#94a3b8" }}>
                                            (Optional)
                                        </span>
                                    </label>
                                    <Controller
                                        name="examCategory"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                options={EXAM_CATEGORIES}
                                                placeholder="Select Category"
                                                value={field.value ?? ""}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <p style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 4 }}>
                                        e.g. Pre-Mid Term, Mid Term, Final Term
                                    </p>
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
                                    <label className="form-field__label">
                                        Start Date <span>*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <span className="input-wrapper__icon">
                                            <CalendarDays size={14} />
                                        </span>
                                        <input
                                            type="date"
                                            className={`form-input form-input--with-icon ${errors.startDate ? "form-input--error" : ""}`}
                                            {...register("startDate")}
                                        />
                                    </div>
                                    {errors.startDate && (
                                        <span className="form-field__error">
                                            <AlertCircle size={12} />{errors.startDate.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">
                                        Start Time <span>*</span>
                                    </label>
                                    <Controller
                                        name="startTime"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                options={TIMES}
                                                placeholder="Select start time"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={!!errors.startTime}
                                                icon={<Timer size={14} />}
                                            />
                                        )}
                                    />
                                    {errors.startTime && (
                                        <span className="form-field__error">
                                            <AlertCircle size={12} />{errors.startTime.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">
                                        End Date <span>*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <span className="input-wrapper__icon">
                                            <CalendarDays size={14} />
                                        </span>
                                        <input
                                            type="date"
                                            className={`form-input form-input--with-icon ${errors.endDate ? "form-input--error" : ""}`}
                                            {...register("endDate")}
                                        />
                                    </div>
                                    {errors.endDate && (
                                        <span className="form-field__error">
                                            <AlertCircle size={12} />{errors.endDate.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">
                                        End Time <span>*</span>
                                    </label>
                                    <Controller
                                        name="endTime"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                options={TIMES}
                                                placeholder="Select end time"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={!!errors.endTime}
                                                icon={<Timer size={14} />}
                                            />
                                        )}
                                    />
                                    {errors.endTime && (
                                        <span className="form-field__error">
                                            <AlertCircle size={12} />{errors.endTime.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label className="form-field__label">
                                        Duration <span>*</span>
                                    </label>
                                    <Controller
                                        name="duration"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                options={DURATIONS}
                                                placeholder="Select duration"
                                                value={field.value}
                                                onChange={field.onChange}
                                                error={!!errors.duration}
                                                icon={<Timer size={14} />}
                                            />
                                        )}
                                    />
                                    {errors.duration && (
                                        <span className="form-field__error">
                                            <AlertCircle size={12} />{errors.duration.message}
                                        </span>
                                    )}
                                    <p style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 4 }}>
                                        e.g. 2 Hours 30 Minutes
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ── Instructions ── */}
                        <div className="form-card">
                            <div className="form-card__header">
                                <div className="form-card__icon"><FileText size={16} /></div>
                                <h2 className="form-card__title">Instructions</h2>
                            </div>

                            <div className="form-field">
                                <label className="form-field__label">
                                    Instructions for students{" "}
                                    <span style={{ fontWeight: 400, color: "#94a3b8", fontSize: 12 }}>
                                        (will be visible to students)
                                    </span>
                                </label>
                                <textarea
                                    className={`form-textarea ${errors.instructions ? "form-textarea--error" : ""}`}
                                    placeholder="Write exam instructions here... e.g. No calculators allowed. Attempt all questions."
                                    maxLength={500}
                                    {...register("instructions")}
                                />
                                <p className="form-textarea__counter">
                                    {instructionsValue.length} / 500
                                </p>
                                {errors.instructions && (
                                    <span className="form-field__error">
                                        <AlertCircle size={12} />{errors.instructions.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* ── Actions ── */}
                        <div className="form-actions">
                            <button type="button" className="btn btn--cancel">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn--primary">
                                <Save size={15} />
                                Save Exam
                            </button>
                        </div>

                    </form>
                </main>
            </div>
        </div>
    );
}
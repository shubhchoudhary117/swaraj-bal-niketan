import { useState, useRef, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CalendarDays,
  Clock,
  Plus,
  Trash2,
  Eye,
  Save,
  ArrowLeft,
  AlertCircle,
  ChevronDown,
  Upload,
  Info,
  X,
  Check,
  BookOpen,
} from "lucide-react";
import "./CreateTimeTable.scss";
import Breadcrumb from "../../../../shared/common/breadcrumb/Breadcrumb";
import { CustomSelect } from "../../../../shared/ui/forms/CustomSelect/CustomSelect";

// ─── Types ─────────────────────────────────────────────────
type TabType = "exam" | "test";

// ─── Data ──────────────────────────────────────────────────
const EXAM_TYPES = ["Annual Exam", "Mid Term Exam", "Final Exam", "Unit Test"];
const ACADEMIC_YEARS = ["2024-25", "2025-26", "2026-27"];
const TERMS = ["Term 1", "Term 2", "Term 3"];
const CLASSES = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11", "Class 12",
];
const SECTIONS = ["A", "B", "C", "D", "E"];
const EXAM_MODES = ["Offline", "Online", "Hybrid"];

const CLASS_SUBJECTS: Record<string, string[]> = {
  "Class 1": ["English", "Mathematics", "Environmental Studies", "Hindi", "Drawing"],
  "Class 2": ["English", "Mathematics", "Environmental Studies", "Hindi", "Drawing"],
  "Class 3": ["English", "Mathematics", "Science", "Social Studies", "Hindi"],
  "Class 4": ["English", "Mathematics", "Science", "Social Studies", "Hindi"],
  "Class 5": ["English", "Mathematics", "Science", "Social Studies", "Hindi"],
  "Class 6": ["English", "Mathematics", "Science", "Social Studies", "Hindi", "Sanskrit"],
  "Class 7": ["English", "Mathematics", "Science", "Social Studies", "Hindi", "Sanskrit"],
  "Class 8": ["English", "Mathematics", "Science", "Social Studies", "Hindi", "Sanskrit"],
  "Class 9": ["English", "Mathematics", "Science", "Social Science", "Hindi"],
  "Class 10": ["English", "Mathematics", "Science", "Social Science", "Hindi", "Information Technology"],
  "Class 11": ["English", "Physics", "Chemistry", "Mathematics", "Biology", "Computer Science", "Accountancy", "Business Studies", "Economics"],
  "Class 12": ["English", "Physics", "Chemistry", "Mathematics", "Biology", "Computer Science", "Accountancy", "Business Studies", "Economics"],
};

const SUBJECT_CODES: Record<string, string> = {
  "English": "ENG101", "Mathematics": "MATH101", "Science": "SCI101",
  "Social Science": "SST101", "Social Studies": "SST101", "Hindi": "HIN101",
  "Sanskrit": "SAN101", "Physics": "PHY101", "Chemistry": "CHE101",
  "Biology": "BIO101", "Computer Science": "CS101", "Accountancy": "ACC101",
  "Business Studies": "BST101", "Economics": "ECO101",
  "Environmental Studies": "EVS101", "Drawing": "DRW101",
  "Information Technology": "IT101",
};

const TIMES = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? "00" : "30";
  const ampm = h < 12 ? "AM" : "PM";
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour}:${m} ${ampm}`;
});

// ─── Zod Schema ─────────────────────────────────────────────
const subjectRowSchema = z.object({
  subject: z.string().min(1, "Required"),
  subjectCode: z.string().optional(),
  examDate: z.string().min(1, "Required"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

const timetableSchema = z.object({
  examType: z.string().min(1, "Exam type is required"),
  examName: z.string().min(2, "Exam name is required"),
  academicYear: z.string().min(1, "Academic year is required"),
  term: z.string().optional(),
  class: z.string().min(1, "Class is required"),
  section: z.string().optional(),
  examMode: z.string().min(1, "Exam mode is required"),
  hallRoom: z.string().optional(),
  examStartDate: z.string().min(1, "Start date is required"),
  examEndDate: z.string().min(1, "End date is required"),
  examStartTime: z.string().min(1, "Start time is required"),
  examEndTime: z.string().min(1, "End time is required"),
  subjects: z.array(subjectRowSchema).min(1, "Add at least one subject"),
  instructions: z.string().max(500).optional(),
  additionalNote: z.string().max(300).optional(),
});

type TimetableFormValues = z.infer<typeof timetableSchema>;



// ─── Add Subject Modal ──────────────────────────────────────
function AddSubjectModal({
  open,
  onClose,
  onAdd,
  selectedClass,
  existingSubjects,
  defaultStartTime,
  defaultEndTime,
  defaultDate,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (subjects: Array<{ subject: string; subjectCode: string; examDate: string; startTime: string; endTime: string }>) => void;
  selectedClass: string;
  existingSubjects: string[];
  defaultStartTime: string;
  defaultEndTime: string;
  defaultDate: string;
}) {
  const availableSubjects = (CLASS_SUBJECTS[selectedClass] || SUBJECTS_FALLBACK).filter(
    (s) => !existingSubjects.includes(s)
  );

  const [selected, setSelected] = useState<string[]>([]);
  const [dates, setDates] = useState<Record<string, string>>({});
  const [startTimes, setStartTimes] = useState<Record<string, string>>({});
  const [endTimes, setEndTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setSelected([]);
      setDates({});
      setStartTimes({});
      setEndTimes({});
    }
  }, [open]);

  const toggle = (s: string) => {
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleAdd = () => {
    const rows = selected.map((s) => ({
      subject: s,
      subjectCode: SUBJECT_CODES[s] || "",
      examDate: dates[s] || defaultDate || "",
      startTime: startTimes[s] || defaultStartTime || "",
      endTime: endTimes[s] || defaultEndTime || "",
    }));
    onAdd(rows);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__title-wrap">
            <div className="modal__icon"><BookOpen size={16} /></div>
            <div>
              <h3 className="modal__title">Add Subjects</h3>
              <p className="modal__subtitle">
                {selectedClass ? `Subjects for ${selectedClass}` : "Select a class first"}
              </p>
            </div>
          </div>
          <button className="modal__close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="modal__body">
          {availableSubjects.length === 0 ? (
            <p className="modal__empty">All subjects already added for {selectedClass}.</p>
          ) : (
            <>
              <div className="modal__subject-grid">
                {availableSubjects.map((s) => (
                  <div
                    key={s}
                    className={`modal__subject-chip ${selected.includes(s) ? "modal__subject-chip--selected" : ""}`}
                    onClick={() => toggle(s)}
                  >
                    {selected.includes(s) && <Check size={13} />}
                    {s}
                  </div>
                ))}
              </div>

              {selected.length > 0 && (
                <div className="modal__date-section">
                  <p className="modal__date-label">Set exam dates for selected subjects <span>(leave blank to use default)</span></p>
                  <div className="modal__date-table">
                    <div className="modal__date-table-head">
                      <span>Subject</span>
                      <span>Exam Date</span>
                      <span>Start Time</span>
                      <span>End Time</span>
                    </div>
                    {selected.map((s) => (
                      <div key={s} className="modal__date-row">
                        <span className="modal__date-subject">{s}</span>
                        <input
                          type="date"
                          className="modal__date-input"
                          value={dates[s] || ""}
                          onChange={(e) => setDates((d) => ({ ...d, [s]: e.target.value }))}
                        />
                        <CustomSelect
                          options={TIMES}
                          placeholder="Start"
                          value={startTimes[s] || ""}
                          onChange={(v) => setStartTimes((t) => ({ ...t, [s]: v }))}
                        />
                        <CustomSelect
                          options={TIMES}
                          placeholder="End"
                          value={endTimes[s] || ""}
                          onChange={(v) => setEndTimes((t) => ({ ...t, [s]: v }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="modal__footer">
          <button className="modal__cancel" onClick={onClose}>Cancel</button>
          <button
            className="modal__add-btn"
            onClick={handleAdd}
            disabled={selected.length === 0}
          >
            <Plus size={15} />
            Add {selected.length > 0 ? `${selected.length} Subject${selected.length > 1 ? "s" : ""}` : "Subjects"}
          </button>
        </div>
      </div>
    </div>
  );
}

const SUBJECTS_FALLBACK = ["English", "Mathematics", "Science", "Social Science", "Hindi"];

// ─── Main Component ─────────────────────────────────────────
export default function CreateTimetable() {
  const [activeTab, setActiveTab] = useState<TabType>("exam");
  const [modalOpen, setModalOpen] = useState(false);
  const [fileSelected, setFileSelected] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TimetableFormValues>({
    resolver: zodResolver(timetableSchema),
    defaultValues: {
      examType: "Annual Exam",
      examName: "Annual Exam 1",
      academicYear: "2025-26",
      term: "",
      class: "Class 10",
      section: "A",
      examMode: "Offline",
      hallRoom: "Main Exam Hall",
      examStartDate: "2026-06-10",
      examEndDate: "2026-06-18",
      examStartTime: "9:00 AM",
      examEndTime: "12:00 PM",
      subjects: [],
      instructions: "• Reach the exam hall 15 minutes before the exam time.\n• Carry your ID card and required stationery.\n• Mobile phones are not allowed in the exam hall.\n• Write answers neatly and follow all instructions.",
      additionalNote: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  const watchedClass = watch("class");
  const watchedStartTime = watch("examStartTime");
  const watchedEndTime = watch("examEndTime");
  const watchedStartDate = watch("examStartDate");
  const instructionsVal = watch("instructions") || "";
  const additionalNoteVal = watch("additionalNote") || "";

  const existingSubjects = fields.map((f: any) => f.subject);

  const handleAddSubjects = (
    rows: Array<{ subject: string; subjectCode: string; examDate: string; startTime: string; endTime: string }>
  ) => {
    rows.forEach((r) => append(r));
  };

  const onSubmit = (data: TimetableFormValues) => {
    alert("Timetable saved!\n\n" + JSON.stringify(data, null, 2));
  };

  return (
    <div className="ct">
      <Breadcrumb title="Create Time Table" pageName="Create Time Table"/>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>

        <div className="ct__tabs">
          <button
            type="button"
            className={`ct__tab ${activeTab === "exam" ? "ct__tab--active" : ""}`}
            onClick={() => setActiveTab("exam")}
          >
            Exam Timetable
          </button>
          <button
            type="button"
            className={`ct__tab ${activeTab === "test" ? "ct__tab--active" : ""}`}
            onClick={() => setActiveTab("test")}
          >
            Test Timetable
          </button>
        </div>

        {/* ── Exam Information ── */}
        <div className="ct__card">
          <h2 className="ct__section-title">Exam Information</h2>

          <div className="ct__grid ct__grid--4">
            <div className="ct__field">
              <label className="ct__label">Exam Type <span>*</span></label>
              <Controller
                name="examType"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    options={EXAM_TYPES}
                    placeholder="Select Exam Type"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.examType}
                  />
                )}
              />
              {errors.examType && <span className="ct__error"><AlertCircle size={12} />{errors.examType.message}</span>}
            </div>

            <div className="ct__field">
              <label className="ct__label">Exam Name <span>*</span></label>
              <input
                className={`ct__input ${errors.examName ? "ct__input--error" : ""}`}
                placeholder="e.g. Annual Exam 1"
                {...register("examName")}
              />
              {errors.examName && <span className="ct__error"><AlertCircle size={12} />{errors.examName.message}</span>}
            </div>

            <div className="ct__field">
              <label className="ct__label">Academic Year <span>*</span></label>
              <Controller
                name="academicYear"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    options={ACADEMIC_YEARS}
                    placeholder="Select Year"
                    value={field.value}
                    onChange={field.onChange}
                    icon={<CalendarDays size={14} />}
                    error={!!errors.academicYear}
                  />
                )}
              />
            </div>

            <div className="ct__field">
              <label className="ct__label">Term</label>
              <Controller
                name="term"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    options={TERMS}
                    placeholder="Select Term"
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="ct__grid ct__grid--4" style={{ marginTop: 16 }}>
            <div className="ct__field">
              <label className="ct__label">Class <span>*</span></label>
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
              {errors.class && <span className="ct__error"><AlertCircle size={12} />{errors.class.message}</span>}
            </div>

            <div className="ct__field">
              <label className="ct__label">Section <span className="ct__label-opt">(Optional)</span></label>
              <Controller
                name="section"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    options={SECTIONS}
                    placeholder="Select Section"
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="ct__field">
              <label className="ct__label">Exam Mode <span>*</span></label>
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
            </div>

            <div className="ct__field">
              <label className="ct__label">Hall / Room <span className="ct__label-opt">(Optional)</span></label>
              <input
                className="ct__input"
                placeholder="e.g. Main Exam Hall"
                {...register("hallRoom")}
              />
            </div>
          </div>
        </div>

        {/* ── Schedule Details ── */}
        <div className="ct__card">
          <h2 className="ct__section-title">Schedule Details</h2>

          <div className="ct__grid ct__grid--4">
            <div className="ct__field">
              <label className="ct__label">Exam Start Date <span>*</span></label>
              <div className="ct__input-wrap">
                <CalendarDays size={14} className="ct__input-icon" />
                <input
                  type="date"
                  className={`ct__input ct__input--icon ${errors.examStartDate ? "ct__input--error" : ""}`}
                  {...register("examStartDate")}
                />
              </div>
              {errors.examStartDate && <span className="ct__error"><AlertCircle size={12} />{errors.examStartDate.message}</span>}
            </div>

            <div className="ct__field">
              <label className="ct__label">Exam End Date <span>*</span></label>
              <div className="ct__input-wrap">
                <CalendarDays size={14} className="ct__input-icon" />
                <input
                  type="date"
                  className={`ct__input ct__input--icon ${errors.examEndDate ? "ct__input--error" : ""}`}
                  {...register("examEndDate")}
                />
              </div>
              {errors.examEndDate && <span className="ct__error"><AlertCircle size={12} />{errors.examEndDate.message}</span>}
            </div>

            <div className="ct__field">
              <label className="ct__label">Exam Start Time (Daily) <span>*</span></label>
              <Controller
                name="examStartTime"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    options={TIMES}
                    placeholder="Select start time"
                    value={field.value}
                    onChange={field.onChange}
                    icon={<Clock size={14} />}
                    error={!!errors.examStartTime}
                  />
                )}
              />
              {errors.examStartTime && <span className="ct__error"><AlertCircle size={12} />{errors.examStartTime.message}</span>}
            </div>

            <div className="ct__field">
              <label className="ct__label">Exam End Time (Daily) <span>*</span></label>
              <Controller
                name="examEndTime"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    options={TIMES}
                    placeholder="Select end time"
                    value={field.value}
                    onChange={field.onChange}
                    icon={<Clock size={14} />}
                    error={!!errors.examEndTime}
                  />
                )}
              />
              {errors.examEndTime && <span className="ct__error"><AlertCircle size={12} />{errors.examEndTime.message}</span>}
            </div>
          </div>

          <div className="ct__info-banner">
            <Info size={15} />
            <p>
              You can add multiple subjects with individual dates. Exam time (
              {watchedStartTime || "09:00 AM"} – {watchedEndTime || "12:00 PM"}) will be same for all subjects. You can change time for any subject individually.
            </p>
          </div>
        </div>

        {/* ── Subjects ── */}
        <div className="ct__card">
          <div className="ct__subjects-header">
            <div>
              <h2 className="ct__section-title">Subjects</h2>
              <p className="ct__section-subtitle">Add subjects for this exam and set their dates.</p>
            </div>
            <button
              type="button"
              className="ct__add-subject-btn"
              onClick={() => setModalOpen(true)}
            >
              <Plus size={15} />
              Add Subject
            </button>
          </div>

          {errors.subjects && (
            <span className="ct__error ct__error--block"><AlertCircle size={12} />Add at least one subject</span>
          )}

          {fields.length > 0 && (
            <div className="ct__table">
              <div className="ct__table-head">
                <span className="ct__th ct__th--num">#</span>
                <span className="ct__th">Subject <span>*</span></span>
                <span className="ct__th">Subject Code <span className="ct__th-opt">(Optional)</span></span>
                <span className="ct__th">Exam Date <span>*</span></span>
                <span className="ct__th">Start Time <span className="ct__th-opt">(Optional)</span></span>
                <span className="ct__th">End Time <span className="ct__th-opt">(Optional)</span></span>
                <span className="ct__th ct__th--action">Action</span>
              </div>

              {fields.map((field, index) => (
                <div className="ct__table-row" key={field.id}>
                  <span className="ct__td ct__td--num">{index + 1}</span>

                  <div className="ct__td">
                    <Controller
                      name={`subjects.${index}.subject`}
                      control={control}
                      render={({ field: f }) => (
                        <CustomSelect
                          options={CLASS_SUBJECTS[watchedClass] || SUBJECTS_FALLBACK}
                          placeholder="Subject"
                          value={f.value}
                          onChange={f.onChange}
                          error={!!errors.subjects?.[index]?.subject}
                        />
                      )}
                    />
                  </div>

                  <div className="ct__td">
                    <input
                      className="ct__input"
                      placeholder="e.g. MATH101"
                      {...register(`subjects.${index}.subjectCode`)}
                    />
                  </div>

                  <div className="ct__td">
                    <div className="ct__input-wrap">
                      <CalendarDays size={13} className="ct__input-icon" />
                      <input
                        type="date"
                        className={`ct__input ct__input--icon ${errors.subjects?.[index]?.examDate ? "ct__input--error" : ""}`}
                        {...register(`subjects.${index}.examDate`)}
                      />
                    </div>
                  </div>

                  <div className="ct__td">
                    <Controller
                      name={`subjects.${index}.startTime`}
                      control={control}
                      render={({ field: f }) => (
                        <div className="ct__input-wrap">
                          <Clock size={13} className="ct__input-icon" />
                          <div style={{ width: "100%", paddingLeft: 26 }}>
                            <CustomSelect
                              options={TIMES}
                              placeholder="09:00 AM"
                              value={f.value || ""}
                              onChange={f.onChange}
                            />
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <div className="ct__td">
                    <Controller
                      name={`subjects.${index}.endTime`}
                      control={control}
                      render={({ field: f }) => (
                        <div className="ct__input-wrap">
                          <Clock size={13} className="ct__input-icon" />
                          <div style={{ width: "100%", paddingLeft: 26 }}>
                            <CustomSelect
                              options={TIMES}
                              placeholder="12:00 PM"
                              value={f.value || ""}
                              onChange={f.onChange}
                            />
                          </div>
                        </div>
                      )}
                    />
                  </div>

                  <div className="ct__td ct__td--action">
                    <button type="button" className="ct__delete-btn" onClick={() => remove(index)}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {fields.length === 0 && (
            <div className="ct__empty">
              <BookOpen size={32} />
              <p>No subjects added yet. Click "Add Subject" to get started.</p>
            </div>
          )}
        </div>

        {/* ── Instructions ── */}
        <div className="ct__card">
          <div className="ct__grid ct__grid--2">
            <div className="ct__field">
              <label className="ct__label">
                General Instructions <span className="ct__label-vis">(Visible to Students)</span>
              </label>
              <textarea
                className={`ct__textarea ${errors.instructions ? "ct__textarea--error" : ""}`}
                placeholder="• Write exam instructions here..."
                maxLength={500}
                {...register("instructions")}
              />
              <p className="ct__counter">{instructionsVal.length} / 500</p>
            </div>

            <div className="ct__field">
              <label className="ct__label">
                Additional Note <span className="ct__label-opt">(Optional)</span>
              </label>
              <textarea
                className="ct__textarea"
                placeholder="Add any additional note for students or teachers..."
                maxLength={300}
                {...register("additionalNote")}
              />
              <p className="ct__counter">{additionalNoteVal.length} / 300</p>
            </div>
          </div>

        </div>

        {/* ── Actions ── */}
        <div className="ct__actions">
          <button type="button" className="ct__btn ct__btn--cancel">Cancel</button>
          <div className="ct__actions-right">
            <button type="button" className="ct__btn ct__btn--preview">
              <Eye size={15} />
              Preview Timetable
            </button>
            <button type="submit" className="ct__btn ct__btn--save">
              <Save size={15} />
              Save Timetable
            </button>
          </div>
        </div>

      </form>

      {/* ── Modal ── */}
      <AddSubjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddSubjects}
        selectedClass={watchedClass}
        existingSubjects={existingSubjects}
        defaultStartTime={watchedStartTime}
        defaultEndTime={watchedEndTime}
        defaultDate={watchedStartDate}
      />
    </div>
  );
}
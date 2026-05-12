import { useState, useRef } from "react";
import "./CreateNotice.scss";
import {
    ChevronRight,
    ChevronDown,
    FileText,
    Tag,
    Users,
    AlertTriangle,
    Settings,
    Paperclip,
    Eye,
    EyeOff,
    Pin,
    Bell,
    Globe,
    Calendar,
    Clock,
    Info,
    CheckCircle2,
    Send,
    Save,
    Megaphone,
    BookOpen,
    Trophy,
    Banknote,
    Palmtree,
    Zap,
    TrendingUp,
    ArrowUp,
    Minus,
    Upload,
    Image as ImageIcon,
    X,
    School,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type Category = "event" | "fee" | "exam" | "general" | "holiday" | "sports" | "";
type Priority = "low" | "medium" | "high" | "";
type Audience = "all_students" | "all_teachers" | "class_6" | "class_7" | "class_8" | "class_9" | "class_10" | "parents";

interface FormState {
    title: string;
    body: string;
    category: Category;
    priority: Priority;
    audience: Audience[];
    pinned: boolean;
    notify: boolean;
    visible: boolean;
    publishDate: string;
    expireDate: string;
}

// ── Constants ──────────────────────────────────────────────────────────────
const CATEGORIES: { id: Category; label: string; Icon: any; color: string }[] = [
    { id: "event", label: "Event", Icon: Megaphone, color: "#6c63ff" },
    { id: "fee", label: "Fee", Icon: Banknote, color: "#f97316" },
    { id: "exam", label: "Exam", Icon: BookOpen, color: "#f43f5e" },
    { id: "general", label: "General", Icon: Info, color: "#3b82f6" },
    { id: "holiday", label: "Holiday", Icon: Palmtree, color: "#22c55e" },
    { id: "sports", label: "Sports", Icon: Trophy, color: "#a855f7" },
];

const PRIORITIES: { id: Priority; label: string; Icon: any; mod: string }[] = [
    { id: "low", label: "Low", Icon: Minus, mod: "--low" },
    { id: "medium", label: "Medium", Icon: TrendingUp, mod: "--medium" },
    { id: "high", label: "High", Icon: ArrowUp, mod: "--high" },
];

const AUDIENCE_OPTIONS: { id: Audience; label: string; Icon: any }[] = [
    { id: "all_students", label: "All Students", Icon: Users },
    { id: "all_teachers", label: "All Teachers", Icon: School },
    { id: "class_6", label: "Class 6", Icon: BookOpen },
    { id: "class_7", label: "Class 7", Icon: BookOpen },
    { id: "class_8", label: "Class 8", Icon: BookOpen },
    { id: "class_9", label: "Class 9", Icon: BookOpen },
    { id: "class_10", label: "Class 10", Icon: BookOpen },
    { id: "parents", label: "Parents", Icon: Users },
];

const TAG_CLASS: Record<string, string> = {
    event: "cn__preview-notice-tag--event",
    fee: "cn__preview-notice-tag--fee",
    exam: "cn__preview-notice-tag--exam",
    general: "cn__preview-notice-tag--general",
    holiday: "cn__preview-notice-tag--holiday",
    sports: "cn__preview-notice-tag--sports",
};

const TODAY = new Date().toISOString().split("T")[0];

// ── Component ──────────────────────────────────────────────────────────────
export default function CreateNotice() {
    const fileRef = useRef<HTMLInputElement>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const [attachments, setAttachments] = useState<string[]>([]);

    const [form, setForm] = useState<FormState>({
        title: "",
        body: "",
        category: "",
        priority: "",
        audience: [],
        pinned: false,
        notify: true,
        visible: true,
        publishDate: TODAY,
        expireDate: "",
    });

    // helpers
    const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
        setForm((p) => ({ ...p, [key]: val }));

    const toggleAudience = (id: Audience) =>
        setForm((p) => ({
            ...p,
            audience: p.audience.includes(id)
                ? p.audience.filter((a) => a !== id)
                : [...p.audience, id],
        }));

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handlePublish = () => {
        if (!form.title.trim()) { showToast("⚠️ Please enter a notice title."); return; }
        if (!form.body.trim()) { showToast("⚠️ Please enter the notice body."); return; }
        if (!form.category) { showToast("⚠️ Please select a category."); return; }
        if (form.audience.length === 0) { showToast("⚠️ Select at least one audience."); return; }
        showToast("✅ Notice published successfully!");
    };

    const handleDraft = () => showToast("📝 Draft saved.");

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).map((f) => f.name);
        setAttachments((p) => [...p, ...files]);
    };

    const removeAttachment = (name: string) =>
        setAttachments((p) => p.filter((f) => f !== name));

    const catObj = CATEGORIES.find((c) => c.id === form.category);
    const CatIcon = catObj?.Icon ?? Info;

    const bodyLen = form.body.length;
    const titleLen = form.title.length;

    const audienceLabels = form.audience.map(
        (id) => AUDIENCE_OPTIONS.find((o) => o.id === id)?.label ?? id
    );

    return (
        <div className="cn">
            {/* ── Header ──────────────────────────────────────────────────── */}
            <div className="cn__header">
                <div className="cn__header-top">
                    <div>
                        <h1 className="cn__title">Create Notice</h1>
                        <nav className="cn__breadcrumb">
                            <a href="#">Dashboard</a>
                            <ChevronRight />
                            <a href="#">Notices</a>
                            <ChevronRight />
                            <span style={{ color: "#1e1e2f" }}>Create Notice</span>
                        </nav>
                    </div>

                    <button
                        className={`cn__preview-toggle${showPreview ? " cn__preview-toggle--active" : ""}`}
                        onClick={() => setShowPreview((p) => !p)}
                    >
                        {showPreview ? <EyeOff /> : <Eye />}
                        {showPreview ? "Hide Preview" : "Show Preview"}
                    </button>
                </div>
            </div>

            {/* ── Layout ──────────────────────────────────────────────────── */}
            <div
                className="cn__layout"
                style={{ gridTemplateColumns: showPreview ? undefined : "1fr" }}
            >
                <div>

                    {/* ── Notice Content ──────────────────────────────────── */}
                    <div className="cn__card" style={{ marginBottom: 22 }}>
                        <div className="cn__card-head">
                            <div className="cn__card-head-icon"><FileText /></div>
                            <div>
                                <div className="cn__card-head-title">Notice Content</div>
                                <div className="cn__card-head-sub">Write the title and body of your notice</div>
                            </div>
                        </div>
                        <div className="cn__card-body">
                            <div className="cn__form">

                                {/* Title */}
                                <div className="cn__row cn__row--1">
                                    <div className="cn__field">
                                        <label className="cn__label cn__label--required">Notice Title</label>
                                        <input
                                            className="cn__input"
                                            type="text"
                                            placeholder="e.g. Independence Day Celebration – Attendance Mandatory"
                                            maxLength={120}
                                            value={form.title}
                                            onChange={(e) => set("title", e.target.value)}
                                        />
                                        <span className={`cn__char-count${titleLen > 100 ? " cn__char-count--warn" : ""}${titleLen >= 120 ? " cn__char-count--limit" : ""}`}>
                                            {titleLen} / 120
                                        </span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="cn__row cn__row--1">
                                    <div className="cn__field">
                                        <label className="cn__label cn__label--required">Notice Body</label>
                                        <textarea
                                            className="cn__textarea"
                                            placeholder="Write the full notice here. Be clear and concise for students and parents to understand easily..."
                                            maxLength={1000}
                                            rows={5}
                                            value={form.body}
                                            onChange={(e) => set("body", e.target.value)}
                                        />
                                        <span className={`cn__char-count${bodyLen > 800 ? " cn__char-count--warn" : ""}${bodyLen >= 1000 ? " cn__char-count--limit" : ""}`}>
                                            {bodyLen} / 1000
                                        </span>
                                    </div>
                                </div>

                                {/* Publish + Expire Date */}
                                <div className="cn__row cn__row--2">
                                    <div className="cn__field">
                                        <label className="cn__label cn__label--required">
                                            <Calendar /> Publish Date
                                        </label>
                                        <input
                                            className="cn__input"
                                            type="date"
                                            value={form.publishDate}
                                            onChange={(e) => set("publishDate", e.target.value)}
                                        />
                                    </div>
                                    <div className="cn__field">
                                        <label className="cn__label">
                                            <Clock /> Expiry Date <small style={{ textTransform: "none", fontWeight: 400, color: "#8a94b0" }}>(optional)</small>
                                        </label>
                                        <input
                                            className="cn__input"
                                            type="date"
                                            value={form.expireDate}
                                            min={form.publishDate}
                                            onChange={(e) => set("expireDate", e.target.value)}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* ── Category & Priority ──────────────────────────── */}
                    <div className="cn__card" style={{ marginBottom: 22 }}>
                        <div className="cn__card-head">
                            <div className="cn__card-head-icon"><Tag /></div>
                            <div>
                                <div className="cn__card-head-title">Category &amp; Priority</div>
                                <div className="cn__card-head-sub">Tag your notice for easy filtering</div>
                            </div>
                        </div>
                        <div className="cn__card-body">

                            {/* Category */}
                            <div className="cn__section-label">Select Category *</div>
                            <div className="cn__category-grid">
                                {CATEGORIES.map(({ id, label, Icon }) => (
                                    <button
                                        key={id}
                                        data-cat={id}
                                        className={`cn__cat-pill${form.category === id ? " cn__cat-pill--active" : ""}`}
                                        onClick={() => set("category", form.category === id ? "" : id)}
                                    >
                                        <Icon /> {label}
                                    </button>
                                ))}
                            </div>

                            <div className="cn__divider" style={{ marginTop: 18 }} />

                            {/* Priority */}
                            <div className="cn__section-label">Priority Level</div>
                            <div className="cn__priority-grid">
                                {PRIORITIES.map(({ id, label, Icon, mod }) => (
                                    <button
                                        key={id}
                                        className={`cn__priority-card cn__priority-card${mod}${form.priority === id ? ` cn__priority-card--active` : ""}`}
                                        onClick={() => set("priority", form.priority === id ? "" : id)}
                                    >
                                        <Icon /> {label}
                                    </button>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* ── Target Audience ──────────────────────────────── */}
                    <div className="cn__card" style={{ marginBottom: 22 }}>
                        <div className="cn__card-head">
                            <div className="cn__card-head-icon"><Users /></div>
                            <div>
                                <div className="cn__card-head-title">Target Audience</div>
                                <div className="cn__card-head-sub">Choose who can see this notice</div>
                            </div>
                        </div>
                        <div className="cn__card-body">
                            <div className="cn__section-label">Select recipients *</div>
                            <div className="cn__audience-grid">
                                {AUDIENCE_OPTIONS.map(({ id, label, Icon }) => (
                                    <button
                                        key={id}
                                        className={`cn__audience-chip${form.audience.includes(id) ? " cn__audience-chip--active" : ""}`}
                                        onClick={() => toggleAudience(id)}
                                    >
                                        <Icon /> {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Settings & Options ───────────────────────────── */}
                    <div className="cn__card" style={{ marginBottom: 22 }}>
                        <div className="cn__card-head">
                            <div className="cn__card-head-icon"><Settings /></div>
                            <div>
                                <div className="cn__card-head-title">Notice Settings</div>
                                <div className="cn__card-head-sub">Control visibility and notifications</div>
                            </div>
                        </div>
                        <div className="cn__card-body">
                            <div className="cn__toggles">

                                {/* Pinned */}
                                <div className="cn__toggle-row">
                                    <div className="cn__toggle-row-info">
                                        <div className="cn__toggle-row-icon" style={{ background: "rgba(245,158,11,.1)", color: "#f59e0b" }}>
                                            <Pin />
                                        </div>
                                        <div>
                                            <div className="cn__toggle-row-label">Pin Notice</div>
                                            <div className="cn__toggle-row-sub">Always show at the top of the board</div>
                                        </div>
                                    </div>
                                    <label className="cn__switch">
                                        <input type="checkbox" checked={form.pinned} onChange={(e) => set("pinned", e.target.checked)} />
                                        <span className="cn__switch-track" />
                                        <span className="cn__switch-thumb" />
                                    </label>
                                </div>

                                {/* Push Notification */}
                                <div className="cn__toggle-row">
                                    <div className="cn__toggle-row-info">
                                        <div className="cn__toggle-row-icon" style={{ background: "rgba(59,130,246,.1)", color: "#3b82f6" }}>
                                            <Bell />
                                        </div>
                                        <div>
                                            <div className="cn__toggle-row-label">Send Push Notification</div>
                                            <div className="cn__toggle-row-sub">Notify recipients via app notification</div>
                                        </div>
                                    </div>
                                    <label className="cn__switch">
                                        <input type="checkbox" checked={form.notify} onChange={(e) => set("notify", e.target.checked)} />
                                        <span className="cn__switch-track" />
                                        <span className="cn__switch-thumb" />
                                    </label>
                                </div>

                                {/* Publicly Visible */}
                                <div className="cn__toggle-row">
                                    <div className="cn__toggle-row-info">
                                        <div className="cn__toggle-row-icon" style={{ background: "rgba(34,197,94,.1)", color: "#22c55e" }}>
                                            <Globe />
                                        </div>
                                        <div>
                                            <div className="cn__toggle-row-label">Visible on Notice Board</div>
                                            <div className="cn__toggle-row-sub">Show this notice on the student portal</div>
                                        </div>
                                    </div>
                                    <label className="cn__switch">
                                        <input type="checkbox" checked={form.visible} onChange={(e) => set("visible", e.target.checked)} />
                                        <span className="cn__switch-track" />
                                        <span className="cn__switch-thumb" />
                                    </label>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* ── Attachments ──────────────────────────────────── */}
                    <div className="cn__card" style={{ marginBottom: 0 }}>
                        <div className="cn__card-head">
                            <div className="cn__card-head-icon"><Paperclip /></div>
                            <div>
                                <div className="cn__card-head-title">Attachments</div>
                                <div className="cn__card-head-sub">Upload supporting files (optional)</div>
                            </div>
                        </div>
                        <div className="cn__card-body">

                            {/* Upload zone */}
                            <div className="cn__upload" onClick={() => fileRef.current?.click()}>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    style={{ display: "none" }}
                                    onChange={handleFiles}
                                />
                                <div className="cn__upload-icon"><Upload /></div>
                                <div className="cn__upload-title">Click to upload or drag &amp; drop</div>
                                <div className="cn__upload-sub">Maximum file size: 10 MB</div>
                                <div className="cn__upload-types">
                                    <span>PDF</span><span>DOC</span><span>JPG</span><span>PNG</span>
                                </div>
                            </div>

                            {/* Attached files */}
                            {attachments.length > 0 && (
                                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                                    {attachments.map((name) => (
                                        <div
                                            key={name}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                padding: "9px 12px",
                                                background: "#f4f6fb",
                                                borderRadius: 8,
                                                border: "1px solid #e4e8f2",
                                                fontSize: ".8rem",
                                                color: "#4b5575",
                                                gap: 8,
                                            }}
                                        >
                                            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                <ImageIcon size={14} /> {name}
                                            </span>
                                            <button
                                                onClick={() => removeAttachment(name)}
                                                style={{ background: "none", border: "none", cursor: "pointer", color: "#8a94b0", padding: 0 }}
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>

                        {/* ── Action Buttons ───────────────────────────────── */}
                        <div className="cn__actions">
                            <div className="cn__actions-row">
                                <button className="cn__btn cn__btn--ghost" onClick={() => setForm({ title: "", body: "", category: "", priority: "", audience: [], pinned: false, notify: true, visible: true, publishDate: TODAY, expireDate: "" })}>
                                    <X /> Clear
                                </button>
                                <button className="cn__btn cn__btn--draft" onClick={handleDraft}>
                                    <Save /> Save Draft
                                </button>
                            </div>
                            <button className="cn__btn cn__btn--publish" onClick={handlePublish}>
                                <Send /> Publish Notice
                            </button>
                        </div>
                    </div>

                </div>

               
                {showPreview && (
                    <div className="cn__preview">

                        {/* Stats */}
                        <div className="cn__card" style={{ marginBottom: 16 }}>
                            <div className="cn__card-head">
                                <div className="cn__card-head-icon"><Zap /></div>
                                <div>
                                    <div className="cn__card-head-title">Notice Summary</div>
                                    <div className="cn__card-head-sub">As it appears to students</div>
                                </div>
                            </div>
                            <div className="cn__card-body" style={{ paddingBottom: 16 }}>
                                <div className="cn__stats">
                                    <div className="cn__stat">
                                        <span className="cn__stat-val">{audienceLabels.length}</span>
                                        <span className="cn__stat-lbl">Audiences</span>
                                    </div>
                                    <div className="cn__stat">
                                        <span className="cn__stat-val">{titleLen}</span>
                                        <span className="cn__stat-lbl">Title chars</span>
                                    </div>
                                    <div className="cn__stat">
                                        <span className="cn__stat-val">{attachments.length}</span>
                                        <span className="cn__stat-lbl">Files</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Preview card */}
                        <div className="cn__card">
                            <div className="cn__card-head">
                                <div className="cn__card-head-icon"><Eye /></div>
                                <div>
                                    <div className="cn__card-head-title">Live Preview</div>
                                    <div className="cn__card-head-sub">How it looks on the notice board</div>
                                </div>
                            </div>
                            <div className="cn__card-body">

                                {form.title || form.body ? (
                                    <>
                                        <div
                                            className={`cn__preview-notice${form.pinned ? " cn__preview-notice--pinned" : ""}${form.priority === "high" ? " cn__preview-notice--high" : ""}`}
                                        >
                                            <div className="cn__preview-notice-top">
                                                <div className="cn__preview-notice-icon">
                                                    <CatIcon />
                                                </div>
                                                {form.pinned && (
                                                    <div className="cn__preview-notice-pin">
                                                        <Pin /> Pinned
                                                    </div>
                                                )}
                                            </div>

                                            <div className="cn__preview-notice-title">
                                                {form.title || <span style={{ color: "#8a94b0", fontWeight: 400 }}>Notice title will appear here…</span>}
                                            </div>

                                            <div className="cn__preview-notice-body">
                                                {form.body || <span style={{ color: "#8a94b0" }}>Notice body will appear here…</span>}
                                            </div>

                                            <div className="cn__preview-notice-footer">
                                                {form.category && (
                                                    <span className={`cn__preview-notice-tag ${TAG_CLASS[form.category] ?? ""}`}>
                                                        <CatIcon /> {catObj?.label}
                                                    </span>
                                                )}
                                                <span className="cn__preview-notice-date">
                                                    <Clock />
                                                    {form.publishDate
                                                        ? new Date(form.publishDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                                                        : "Today"}
                                                </span>
                                            </div>
                                        </div>

                                        {audienceLabels.length > 0 && (
                                            <div className="cn__preview-audience">
                                                <div className="cn__preview-audience-label">Visible to</div>
                                                <div className="cn__preview-audience-chips">
                                                    {audienceLabels.map((l) => (
                                                        <span key={l} className="cn__preview-audience-chip">{l}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                                            {[
                                                { on: form.pinned, icon: <Pin size={12} />, text: "Pinned to top", color: "#f59e0b" },
                                                { on: form.notify, icon: <Bell size={12} />, text: "Push notification on", color: "#3b82f6" },
                                                { on: form.visible, icon: <Globe size={12} />, text: "Visible on student board", color: "#22c55e" },
                                            ].map(({ on, icon, text, color }) =>
                                                on ? (
                                                    <div key={text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".72rem", color, fontWeight: 600 }}>
                                                        {icon} {text}
                                                    </div>
                                                ) : null
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="cn__preview-empty">
                                        <div className="cn__preview-empty-icon"><FileText /></div>
                                        <p>Start filling in the form and your notice preview will appear here in real time.</p>
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* ── Toast ─────────────────────────────────────────────────── */}
            {toast && (
                <div className="cn__toast">
                    <CheckCircle2 />
                    {toast}
                </div>
            )}
        </div>
    );
}
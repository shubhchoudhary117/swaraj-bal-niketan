import { Check, ChevronDown } from "lucide-react";
import "./CustomSelect.scss"
import { useEffect, useRef, useState } from "react";

// ─── Custom Select ──────────────────────────────────────────
export function CustomSelect({
    options, placeholder, value, onChange, error, icon,
}: {
    options: string[]; placeholder: string; value: string;
    onChange: (v: string) => void; error?: boolean; icon?: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className={`c-select ${error ? "c-select--error" : ""}`} ref={ref}>
            {icon && <span className="c-select__icon">{icon}</span>}
            <button
                type="button"
                className={`c-select__trigger ${open ? "c-select__trigger--open" : ""} ${!value ? "c-select__trigger--placeholder" : ""} ${icon ? "c-select__trigger--with-icon" : ""}`}
                onClick={() => setOpen((o) => !o)}
            >
                <span>{value || placeholder}</span>
                <ChevronDown size={14} className={`c-select__chevron ${open ? "c-select__chevron--open" : ""}`} />
            </button>
            {open && (
                <div className="c-select__dropdown">
                    {options.map((opt) => (
                        <div
                            key={opt}
                            className={`c-select__option ${value === opt ? "c-select__option--selected" : ""}`}
                            onClick={() => { onChange(opt); setOpen(false); }}
                        >
                            {value === opt && <Check size={13} />}
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
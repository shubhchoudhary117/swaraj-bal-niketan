import React from "react";
import "./FormSelectInput.scss"
import { type FieldError } from "react-hook-form";
import {
  User,
  School,
  Calendar,
  Phone,
  Mail,
  ArrowDown,
  ChevronDown,
  Droplet,
  WholeWord,
  Globe,
  GraduationCap,
  NotepadText,
  Users,
} from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  options: Option[];
  register: any;
  error?: FieldError;
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
}

const FormSelectInput: React.FC<Props> = ({
  name,
  options,
  register,
  error,
  required = false,
  placeholder = "Select option",
  icon,
}) => {

  const getIcon = () => {
    if (icon) return icon;

    if (name.includes("gender")) return <User className="icon" />;
    if (name.includes("class")) return <GraduationCap className="icon" />;
      if (name.includes("list")) return <NotepadText className="icon" />;
        if (name.includes("users")) return <Users className="icon" />;
    if (name.includes("date")) return <Calendar className="icon" />;
    if (name.includes("mobile")) return <Phone className="icon" />;
    if (name.includes("email")) return <Mail className="icon" />;
     if (name.includes("bloodgroup")) return <Droplet className="icon" />;
     if (name.includes("nationality")) return <Globe className="icon" />;

    return <User className="icon" />;
  };

  return (
    <div className="form-input">

      <div className="form-input__input-wrapper">

        {/* Icon */}
        <div className="form-input__input-icon">
          {getIcon()}
        </div>

        {/* Select */}
        <select
          className="form-input__input"
          {...register(name, {
            required: required ? "This field is required" : false,
          })}
        >
          <option value="">{placeholder}</option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

         <div className="form-input__input-icon">
          <ChevronDown className="icon" />
        </div>

      </div>

      {/* Error */}
      {error && (
        <span className="form-input__error">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FormSelectInput;
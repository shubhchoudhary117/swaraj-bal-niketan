import React, { useRef } from "react";
import "./FormDateInput.scss";
import { type FieldError } from "react-hook-form";
import { Calendar } from "lucide-react";

interface Props {
  name: string;
  register: any;
  error?: FieldError;
  required?: boolean;
  placeholder?: string;
}

const FormDateInput: React.FC<Props> = ({
  name,
  register,
  error,
  required = false,
  placeholder = "Select date",
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpen = () => {
    inputRef.current?.showPicker?.(); 
    inputRef.current?.focus();
  };

  return (
    <div className="input-form-date">
      <div className="input-form-date__input-wrapper">

        {/* Left Icon */}
        <div className="input-form-date__input-icon">
          <Calendar className="icon" />
        </div>

        <input
          ref={inputRef}
          type="date"
          className="input-form-date__input"
          placeholder={placeholder}
          {...register(name, {
            required: required ? "Date is required" : false,
          })}
        />
      </div>

      {error && (
        <span className="input-form-date__error">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FormDateInput;
import React from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "date" | "textarea" | "select";
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: { value: string; label: string }[];
  required?: boolean;
  error?: string;
  className?: string;
}

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  options = [],
  required = false,
  error,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      {type === "textarea" ? (
        <Textarea
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={error ? "border-destructive" : ""}
        />
      ) : type === "select" ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={error ? "border-destructive" : ""}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={error ? "border-destructive" : ""}
        />
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

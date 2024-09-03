import { useState } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldError,
  FieldValues,
} from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";

type TQInputProps = {
  label: string;
  name: string;
  type: "text" | "email" | "number" | "textarea" | "password";
  required?: boolean;
  placeholder?: string;
  others?: Record<string, unknown>;
  rows?: number;
  min?: number;
  max?: number;
  className?: string;
  disabled?: boolean;
};

const QInput = ({
  label,
  name,
  type,
  placeholder,
  rows = 2,
  min,
  max,
  className,
  others,
  disabled = false,
}: TQInputProps) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const generateField = (
    field: ControllerRenderProps<FieldValues, string>,
    error: FieldError | undefined
  ) => {
    const { value: fieldValue, ...othersField } = field;
    const commonClassName = `flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none dark:border-zinc-700 ${
      error ? "border-red-400" : ""
    }`;

    if (type === "password") {
      return (
        <div className="relative">
          <input
            className={commonClassName}
            placeholder={placeholder}
            type={visiblePassword ? "text" : "password"}
            value={fieldValue || ""}
            disabled={disabled}
            {...othersField}
            {...others}
          />
          <div
            onClick={() => setVisiblePassword(!visiblePassword)}
            className="absolute top-2.5 right-4 cursor-pointer opacity-60"
          >
            {visiblePassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
          </div>
        </div>
      );
    }
    if (type === "textarea") {
      return (
        <textarea
          rows={rows}
          className={`${commonClassName} h-auto`}
          placeholder={placeholder}
          value={fieldValue || ""}
          disabled={disabled}
          {...othersField}
          {...others}
        />
      );
    }
    return (
      <input
        className={commonClassName}
        placeholder={placeholder}
        type={type}
        min={min}
        max={max}
        value={fieldValue || ""}
        disabled={disabled}
        {...othersField}
        {...others}
      />
    );
  };
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={`relative ${className} `}>
          <div className="space-y-2 text-sm">
            <label className="block text-zinc-700 dark:text-zinc-300 font-medium -mb-0.5">
              {label}
            </label>
            {generateField(field, error)}
            {/* {error && (
              <small
                style={{
                  position: "absolute",
                  left: "0.3rem",
                  bottom: "-1.2rem",
                  color: "red",
                }}
              >
                {error?.message}
              </small>
            )} */}
            {error && (
              <div className="absolute left-1 bottom-[-1.4rem] text-red-500 whitespace-nowrap overflow-hidden text-ellipsis">
                {error?.message!.length > 40 ? (
                  <small className="  cursor-pointer " title={error.message}>
                    {" "}
                    {error?.message!.slice(0, 40)}...
                  </small>
                ) : (
                  <small>{error.message}</small>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
};

export default QInput;

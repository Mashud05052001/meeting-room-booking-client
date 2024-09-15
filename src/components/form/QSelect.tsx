import { Form, Select, Tooltip } from "antd";
import { Controller } from "react-hook-form";
import "@/styles/form.style.css";

type TQSelectProps = {
  name: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  options: Record<string, unknown>[] | undefined;
  mode?: "multiple" | "tags" | undefined;
  others?: Record<string, unknown>;
};

const QSelect = ({
  name,
  label,
  placeholder,
  options,
  disabled = false,
  mode = undefined,
  others = {},
}: TQSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2 text-sm">
          {label && (
            <label className="block text-zinc-700 dark:text-zinc-300 font-medium -mb-0.5">
              {label}
            </label>
          )}
          <Form.Item>
            <Select
              mode={mode}
              {...field}
              disabled={disabled}
              style={{
                width: "100%",
                borderRadius: "9px",
                border: error ? "0.04rem solid #f87171" : "",
              }}
              size="large"
              placeholder={placeholder}
              options={options}
              allowClear
              maxTagCount={"responsive"}
              maxTagPlaceholder={(omittedValues) => (
                <Tooltip
                  overlayStyle={{ pointerEvents: "none" }}
                  title={omittedValues.map(({ label }) => label).join(", ")}
                >
                  <span>Hover Me</span>
                </Tooltip>
              )}
              {...others}
            />
            {error && (
              <small
                style={{
                  position: "absolute",
                  left: "0.2rem",
                  bottom: "-1.1rem",
                  color: "red",
                }}
              >
                {error.message}
              </small>
            )}
          </Form.Item>
        </div>
      )}
    />
  );
};

export default QSelect;

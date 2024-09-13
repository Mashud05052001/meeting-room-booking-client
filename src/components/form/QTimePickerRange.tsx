import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TQTimePickerRangeProps = {
  name: string;
  label: string;
  others?: Record<string, unknown>;
  format?: string;
};

const QTimePickerRange = ({
  name,
  label,
  others = {},
  format = "HH:mm",
}: TQTimePickerRangeProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="relative space-y-2 text-sm">
          {label && (
            <label className="block text-zinc-700 dark:text-zinc-300 font-medium -mb-0.5">
              {label}
            </label>
          )}
          <Form.Item>
            {
              <TimePicker.RangePicker
                format={format}
                hourStep={1}
                minuteStep={10}
                style={{ width: "100%", height: "2.5rem" }}
                {...field}
                {...others}
              />
            }
            {error && (
              <small
                style={{
                  position: "absolute",
                  left: "0.2rem",
                  bottom: "-1.2rem",
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

export default QTimePickerRange;

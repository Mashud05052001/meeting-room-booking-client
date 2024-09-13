import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TQDatePickerProps = {
  name: string;
  label: string;
  placeholder?: string;
  others?: Record<string, unknown>;
  disabledAllPreviousDate?: boolean;
  disabledAllUpcomingDate?: boolean;
};

const QDatePicker = ({
  name,
  label,
  placeholder,
  others = {},
  disabledAllPreviousDate = false,
  disabledAllUpcomingDate = false,
}: TQDatePickerProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2 text-sm relative">
          {label && (
            <label className="block text-zinc-700 dark:text-zinc-300 font-medium -mb-0.5">
              {label}
            </label>
          )}
          <Form.Item>
            {
              <DatePicker
                {...field}
                placeholder={placeholder}
                style={{ width: "100%", height: "2.5rem" }}
                disabledDate={(current) => {
                  const today = new Date();
                  if (
                    disabledAllPreviousDate &&
                    current &&
                    current.toDate() < today
                  )
                    return true;

                  if (
                    disabledAllUpcomingDate &&
                    current &&
                    current.toDate() > today
                  )
                    return true;

                  return false;
                }}
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

export default QDatePicker;

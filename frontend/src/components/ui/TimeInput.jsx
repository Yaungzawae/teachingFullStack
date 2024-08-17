import { Controller, useFormContext } from "react-hook-form";

const TimeInput = ({ name }) => {
  const { control, setValue, watch } = useFormContext();

  const handleTimeChange = (hours, minutes, period) => {
    const formattedTime = `${hours}:${minutes} ${period}`;
    setValue(name, formattedTime);
  };

  const hours = watch(`${name}_hours`);
  const minutes = watch(`${name}_minutes`);
  const period = watch(`${name}_period`);

  return (
    <div className="flex space-x-2">
      <Controller
        name={`${name}_hours`}
        control={control}
        defaultValue="1"
        render={({ field: hoursField }) => (
          <select
            {...hoursField}
            onChange={(e) => {
              hoursField.onChange(e);
              handleTimeChange(e.target.value, minutes, period);
            }}
            className="p-2 border"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        )}
      />
      <Controller
        name={`${name}_minutes`}
        control={control}
        defaultValue="00"
        render={({ field: minutesField }) => (
          <select
            {...minutesField}
            onChange={(e) => {
              minutesField.onChange(e);
              handleTimeChange(hours, e.target.value, period);
            }}
            className="p-2 border"
          >
            {["00", "15", "30", "45"].map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
        )}
      />
      <Controller
        name={`${name}_period`}
        control={control}
        defaultValue="AM"
        render={({ field: periodField }) => (
          <select
            {...periodField}
            onChange={(e) => {
              periodField.onChange(e);
              handleTimeChange(hours, minutes, e.target.value);
            }}
            className="p-2 border"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        )}
      />
    </div>
  );
};

export default TimeInput;   
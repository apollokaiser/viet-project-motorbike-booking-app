import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function DateTime({
  updateDate,
  label,
  name,
  defaultValue,
  format = "DD/MM/YYYY",
}) {
  const changeDate = (value) => {
     updateDate(dayjs(value).unix(), name);
  };
  const getDefaultDate = () => {
    if (!defaultValue) {
      return dayjs(new Date().getTime());
    }
    return dayjs(new Date(defaultValue * 1000));
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          defaultValue={getDefaultDate()}
          onChange={changeDate}
          format={format}
        />
      </LocalizationProvider>
    </>
  );
}

export default DateTime;

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useState } from "react";

function DateTime({ updateDate, label, name, defaultValue}) {
  const [date, setDate] = useState(new Date());
  const changeDate = (value) => {
    let dateFormat = dayjs(value).format("DD/MM/YYYY");
    setDate(dateFormat);
    updateDate(dayjs(value).unix(), name);
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          defaultValue={dayjs(new Date(defaultValue * 1000)) || dayjs(date)}
          onChange={changeDate}
          format={"DD/MM/YYYY"}
        />
      </LocalizationProvider>
    </>
  );
}

export default DateTime;

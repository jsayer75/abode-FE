import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

interface Props {
  onDateChange: (value: Dayjs) => void;
  value: Dayjs;
}

export default function DateAndTimePicker({ onDateChange, value }: Props) {
  const changeHandler = (val: Dayjs | null) => {
    if (!val) {
      return;
    }
    onDateChange(val);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker value={value} onChange={changeHandler} />
    </LocalizationProvider>
  );
}

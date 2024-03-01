import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Attendee } from "../eventCard/eventCard.interface";
import debounce from "lodash/debounce";
import { apiService } from "../../utils/api";

interface Props {
    onChangeAttendeesSelection: (attendees: Attendee[]) => void
    defaultValue: Attendee[]
}
export default function AttendeesAutoComplete({onChangeAttendeesSelection, defaultValue = []}: Props) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Attendee[]>([]);
  const [value, setValues] = useState<Attendee[]>(defaultValue);
  const loading = open && options.length === 0;


  const debouncedSearch = debounce(async (value: string) => {

    if(!value) {
        setOptions([])
    }
    const suggestedAttendees = await apiService.get<Attendee[]>("user/attendees", {
      search: value,
    });
    setOptions(suggestedAttendees)


  }, 500);

  const changeHandler = (value: string) => {
    debouncedSearch(value);
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

//   useEffect(() => {
//     debugger
//     setValues(defaultValue)
//   },[defaultValue])

  return (
    <Autocomplete
      multiple
      open={open}
      value={value}

      onChange={(_event, value) => {
        setValues(value)
        onChangeAttendeesSelection(value)}}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.email}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Attendees"
          onChange={(e) => changeHandler(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

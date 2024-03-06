import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";
import { Attendee } from "../eventCard/eventCard.interface";
import debounce from "lodash/debounce";
import { apiService } from "../../utils/api";

interface Props {
  onChangeAttendeesSelection: (attendees: Attendee[]) => void;
  defaultValue: Attendee[];
}
export default function AttendeesAutoComplete({
  onChangeAttendeesSelection,
  defaultValue = [],
}: Props) {
  const [open, setOpen] = useState(false);
  const [textValue, setTextValue] = useState("");
  const refInput = useRef<null | HTMLInputElement>(null);
  const [options, setOptions] = useState<Attendee[]>([]);
  const [value, setValues] = useState<Attendee[]>(defaultValue);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = debounce(async (value: string) => {
    if (!value) {
      setOptions([]);
    }
    const suggestedAttendees = await apiService.get<Attendee[]>(
      "user/attendees",
      {
        search: value,
      }
    );
    setOptions(suggestedAttendees);

    setLoading(false);
  }, 500);

  const changeHandler = (value: string) => {
    setLoading(true);
    setTextValue(value);
    if (!value) {
      setOptions([]);
      setLoading(false);

      return;
    }
    debouncedSearch(value);
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
    return () => setTextValue("");
  }, [open]);

  const getLoadingText = () => {
    if (!textValue.length) {
      return "Please write something to search";
    } else if (textValue.length && loading) {
      return "Loading...";
    }
    return "No Option";
  };

  return (
    <Autocomplete
      multiple
      open={open}
      value={value}
      onChange={(_event, value) => {
        setValues(value);
        onChangeAttendeesSelection(value);
      }}
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
      noOptionsText={getLoadingText()}
      loadingText={getLoadingText()}
      ref={refInput}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Attendees"
          onChange={(e) => changeHandler(e.target.value)}
          // ref={refInput}
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
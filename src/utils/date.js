import { setHours, setMinutes, setMilliseconds, setSeconds } from "date-fns";

export function today() {
  return setHours(
    setMinutes(setSeconds(setMilliseconds(new Date(), 0), 0), 0),
    0
  );
}

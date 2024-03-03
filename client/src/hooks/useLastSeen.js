import { convertDate } from "../utils/date-convert";

export const useLastSeen = (lastSeen) => {
  const last_seen = new Date(lastSeen);
  const time = last_seen.toLocaleTimeString("en-IN", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  let date = last_seen.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  date = convertDate(date, true);
  date =
    "last seen " +
    (date = ["TODAY", "YESTERDAY"].includes(date) ? date.toLowerCase() : date);
  return date + " at " + time;
};

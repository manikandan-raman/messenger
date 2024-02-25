import moment from "moment";

export const convertDate = (date) => {
  const today = moment(new Date()).format("YYYY/MM/DD");
  const yesterday = moment(new Date())
    .subtract("1", "days")
    .format("YYYY/MM/DD");
  const d = moment(date);
  date = d.format("MMMM DD, YYYY");
  if (d.isSame(today)) {
    return "TODAY";
  } else if (d.isSame(yesterday)) {
    return "YESTERDAY";
  } else {
    return date;
  }
};

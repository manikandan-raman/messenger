import moment from "moment";

export const convertDate = (date, last_seen = false) => {
  // const today = moment(new Date()).format("YYYY/MM/DD");
  // const yesterday = moment(new Date())
  //   .subtract("1", "days")
  //   .format("YYYY/MM/DD");
  let sentDate = new Date(date);
  sentDate = new Date(
    sentDate.getFullYear(),
    sentDate.getMonth(),
    sentDate.getDate()
  );
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (sentDate.getTime() === today.getTime()) {
    return "TODAY";
  } else if (sentDate.getTime() === yesterday.getTime()) {
    return "YESTERDAY";
  } else {
    if (last_seen) {
      const weekdays = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      return weekdays[sentDate.getDay()];
    } else {
      const currentDate = sentDate.toLocaleDateString("en-IN", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });
      return currentDate;
    }
  }
};

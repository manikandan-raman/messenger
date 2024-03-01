import { createLogger, transports, format } from "winston";

const logger = new createLogger({
  level: "info",
  handleExceptions: true,
  transports: [
    new transports.Console({
      format: format.combine(format.colorize()),
    }),
  ],
});

export default logger;

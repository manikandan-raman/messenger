import { createLogger, transports, format } from "winston";

const logger = new createLogger({
  level: "info",
  handleExceptions: true,
  format: format.combine(
    format.json(),
    format.colorize({ all: true }),
    format.timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }),
    format.align(),
    format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize()),
    }),
  ],
});

export default logger;

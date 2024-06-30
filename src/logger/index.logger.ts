import { LoggerInterface } from "./../models/interfaces/logger.interface";
import { ConsoleLogger } from "./console-logger.logger";

const Logger = (): LoggerInterface => {
  return new ConsoleLogger();
};

export const logger = Logger();

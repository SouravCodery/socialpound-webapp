import { LoggerInterface } from "./../models/interfaces/Logger.interface";
import { ConsoleLogger } from "./Console-Logger.logger";

const Logger = (): LoggerInterface => {
  return new ConsoleLogger();
};

export const logger = Logger();

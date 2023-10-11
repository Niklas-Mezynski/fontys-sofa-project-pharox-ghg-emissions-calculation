import * as _logger from "firebase-functions/logger";

export const logger = {
  info: _logger.info,
  error: _logger.error,
  warn: _logger.warn,
  debug: _logger.debug,
  log: _logger.log,
  write: _logger.write,
};

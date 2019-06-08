import pino from "pino";

import { LOG_LEVEL } from "../config";

const logger = pino({ level: LOG_LEVEL, base: null });

export default logger;

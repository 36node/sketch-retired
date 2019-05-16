import pino from "pino";

import { LOG_LEVEL } from "../config";

export default pino({ level: LOG_LEVEL });

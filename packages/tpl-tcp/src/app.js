import Whisper from "@36node/whisper";

import Request from "./request";
import Response from "./response";
import Protocol from "./protocol";
import logger from "./lib/log";

const app = new Whisper();
const protocol = new Protocol();

const log = async (ctx, next) => {
  // step 1: log start
  const startedAt = Date.now();

  await next();

  // step 4: log end
  const endAt = Date.now();
  logger.info(ctx.data);
  logger.info("request: ");
  logger.info(ctx.req);
  logger.info("response: ");
  logger.info(ctx.res);
  logger.info(
    `session ${ctx.session.id}: seq ${ctx.no} success ${endAt - startedAt} ms`
  );
};

const handleFrame = async (ctx, next) => {
  // step 2: handle data
  const json = protocol.parse(ctx.data);
  ctx.req = new Request(json);

  await next();

  // step 3: send data
  ctx.res = new Response(json.body);
  ctx.send(protocol.build(ctx.res));
};

app.use(log);
app.use(handleFrame);

app.on("close", session => {
  logger.info(`session ${session.id}: closed`);
});

app.on("timeout", session => {
  logger.info(`session ${session.id}: timeout`);
});

app.on("end", session => {
  logger.info(`session ${session.id}: end`);
});

app.on("error", session => {
  logger.info(`session ${session.id}: error`);
});

export default app;

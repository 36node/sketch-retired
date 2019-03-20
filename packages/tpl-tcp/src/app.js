import Whisper from "@36node/whisper";

import Request from "./request";
import Response from "./response";
import Protocol from "./protocol";

const app = new Whisper();
const protocol = new Protocol();

const log = async (ctx, next) => {
  // step 1: log start
  const startedAt = Date.now();

  await next();

  // step 4: log end
  const endAt = Date.now();
  console.log(ctx.data);
  console.log("request: ");
  console.log(ctx.req);
  console.log("response: ");
  console.log(ctx.res);
  console.log(
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
  console.log(`session ${session.id}: closed`);
});

app.on("timeout", session => {
  console.log(`session ${session.id}: timeout`);
});

app.on("end", session => {
  console.log(`session ${session.id}: end`);
});

app.on("error", session => {
  console.log(`session ${session.id}: error`);
});

export default app;

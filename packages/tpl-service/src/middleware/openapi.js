import { escape } from "../lib/regex";

export default function(url, file) {
  if (!url) throw new Error("url is required for openapi middleware");
  if (!file)
    throw new Error(
      "file is required for openapi middleware, could be stream or block"
    );

  const regex = new RegExp(escape(url));

  return (ctx, next) => {
    if (ctx.url.match(regex)) {
      ctx.type = "text/yaml";
      ctx.body = file;
    } else {
      return next();
    }
  };
}

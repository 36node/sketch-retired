const shouldEmitError = (err, status) => {
  return !err.expose && status >= 500;
};

const formatError = err => ({
  name: err.name || "InternalServerError",
  type: err.type,
  code: err.code,
  message: err.message,
  path: err.path,
  value: err.value,
  keyword: err.keyword,
});

export default () => {
  return (ctx, next) =>
    next().catch(err => {
      ctx.body = formatError(err) || {};
      ctx.status = err.status || err.statusCode || 500;
      shouldEmitError(err, ctx.status) && ctx.app.emit("error", err, ctx);
    });
};

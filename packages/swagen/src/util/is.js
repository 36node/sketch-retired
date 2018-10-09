module.exports = {
  YML,
  YAML,
  JSON,
  URL,
};

function URL(s) {
  return /^(http|https):/.test(s);
}

function YML(s) {
  return !URL(s) && /\.yml$/.test(s);
}

function YAML(s) {
  return !URL(s) && /\.yaml$/.test(s);
}

function JSON(s) {
  return !URL(s) && /\.json$/.test(s);
}

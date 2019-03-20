const desktop = require("./desktop");
const mobile = require("./mobile");

const all = desktop.concat(mobile);

module.exports = all;

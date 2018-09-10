// import SwaggerParser from "swagger-parser";
import path from "path";

import parse from "./parse";

// const parser = new SwaggerParser();

parse(path.resolve(__dirname, "../example/openapi.yaml")).then(function(api) {
  console.log(JSON.stringify(api, "", 2));
});

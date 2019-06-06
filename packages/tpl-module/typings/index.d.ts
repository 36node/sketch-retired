import Koa = require("koa");

declare module "@36node/template-module" {
  export function doAdd(a: Number, b: Number): Number;
  export function doSubtract(a: Number, b: Number): Number;
  export function doMultiply(a: Number, b: Number): Number;
  export function doDivide(a: Number, b: Number): Number;
  export function foo(): void;
}

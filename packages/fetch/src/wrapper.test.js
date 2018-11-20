import fetchMock from "fetch-mock";
import "jest";

import fetch from "./wrapper";

const bodyOK = { id: "123", name: "cc", tag: "red" };
const bodyText = "some text";
const body401 = { message: "authentication error" };
const body404 = { message: "resource not found" };
const body500 = { message: "internal error" };

const headersText = { "content-type": "application/plain" };
const headersOK = {
  "x-next": "some value",
  "access-control-allow-origin": "*",
};

fetchMock.mock("/401", { status: 401, body: body401 });
fetchMock.mock("/404", { status: 404, body: body404 });
fetchMock.mock("/500", { status: 500, body: body500 });
fetchMock.mock("/ok", { status: 200, body: bodyOK, headers: headersOK });
fetchMock.mock("/text", { status: 200, headers: headersText, body: bodyText });

test("fetch ok", async () => {
  const res = await fetch("/ok");
  expect(res.body).toEqual(bodyOK);
  expect(res.headers).toEqual(expect.objectContaining(headersOK));
});

test("fetch with body", async () => {
  await fetch("/ok", { body: bodyOK });
  expect(fetchMock.lastOptions("/ok").body).toEqual(JSON.stringify(bodyOK));
});

test("fetch with headers", async () => {
  const Authorization = "Bearer somejwttoken";
  await fetch("/ok", {
    headers: {
      Authorization,
      another: "something",
    },
  });
  expect(fetchMock.lastOptions("/ok").headers).toEqual({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization,
    another: "something",
  });
});

test("fetch application/plain", async () => {
  const res = await fetch("/text");
  expect(res).toEqual({
    body: "some text",
    headers: { "content-length": "9", "content-type": "application/plain" },
  });
});

test("fetch 401", async () => {
  expect.assertions(1);
  try {
    await fetch("/401");
  } catch (err) {
    expect(err.message).toBe(body401.message);
  }
});

test("fetch 404", async () => {
  expect.assertions(1);
  try {
    await fetch("/404");
  } catch (err) {
    expect(err.message).toBe(body404.message);
  }
});

test("fetch 500", async () => {
  expect.assertions(1);
  try {
    await fetch("/500");
  } catch (err) {
    expect(err.message).toBe(body500.message);
  }
});

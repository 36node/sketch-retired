import Protocol from "../src/protocol";

test("protocol parse", () => {
  const protocol = new Protocol();
  const buf = Buffer.from([
    "0x23",
    "0x23",
    "0x01",
    "0x09",
    "0x12",
    "0x08",
    "0x08",
    "0x20",
    "0x23",
    "0x23",
  ]);

  const json = protocol.parse(buf);
  expect(json.header).toEqual({ command: 0x01 });
  expect(json.body).toEqual({
    month: 0x09,
    date: 0x12,
    hour: 0x08,
    minute: 0x08,
    second: 0x20,
  });
});

test("protocol build", () => {
  const protocol = new Protocol();
  const str = protocol.build({
    month: 0x09,
    date: 0x12,
    hour: 0x08,
    minute: 0x08,
    second: 0x20,
  });

  expect(str).toBe("time: 9-18-8-8-32");
});

import { toTableData, toJsonData } from "./lib";
// import CSV from "./csv";

describe("Test xlsx lib", () => {
  const testColumns = [
    { title: "自编号", dataIndex: "no" },
    { title: "车牌", dataIndex: "plate" },
    {
      title: "上牌日期",
      dataIndex: "plateAt",
      exportFormat: val => val && val.toISOString(),
    },
    {
      title: "线路信息",
      children: [
        { title: "车队", dataIndex: "convoy" },
        { title: "线路", dataIndex: "line" },
      ],
    },
    {
      title: "厂商信息",
      children: [
        { title: "厂商", dataIndex: "producer", disableExport: true },
        { title: "车型", dataIndex: "model", disableImport: true },
      ],
    },
  ];

  const plateAt = new Date("2019-06-18T08:29:51.500Z");

  const testJson = [
    {
      no: "121",
      plate: "沪A-0001",
      convoy: "一车队",
      line: "1路",
      producer: "宇通",
      model: "Z0A",
      plateAt,
    },
    {
      no: "122",
      plate: "沪A-0002",
      convoy: "二车队",
      line: "2路",
      producer: "申龙",
      model: "W0B",
      plateAt,
    },
    {
      no: "123",
      plate: "沪A-0003",
      convoy: "二车队",
      line: "3路",
      producer: "青年",
      model: "T2C",
      plateAt,
    },
  ];

  it("should Json to table data", async () => {
    const ws = await toTableData(testColumns, testJson);

    const expected = {
      A1: { v: "自编号", t: "s" },
      B1: { v: "车牌", t: "s" },
      C1: { v: "上牌日期", t: "s" },
      D1: { v: "线路信息", t: "s" },
      D2: { v: "车队", t: "s" },
      E2: { v: "线路", t: "s" },
      F1: { v: "厂商信息", t: "s" },
      F2: { v: "车型", t: "s" },
      A3: { v: "121", t: "s" },
      B3: { v: "沪A-0001", t: "s" },
      C3: { v: "2019-06-18T08:29:51.500Z", t: "s" },
      D3: { v: "一车队", t: "s" },
      E3: { v: "1路", t: "s" },
      F3: { v: "Z0A", t: "s" },
      A4: { v: "122", t: "s" },
      B4: { v: "沪A-0002", t: "s" },
      C4: { v: "2019-06-18T08:29:51.500Z", t: "s" },
      D4: { v: "二车队", t: "s" },
      E4: { v: "2路", t: "s" },
      F4: { v: "W0B", t: "s" },
      A5: { v: "123", t: "s" },
      B5: { v: "沪A-0003", t: "s" },
      C5: { v: "2019-06-18T08:29:51.500Z", t: "s" },
      D5: { v: "二车队", t: "s" },
      E5: { v: "3路", t: "s" },
      F5: { v: "T2C", t: "s" },
      "!merges": [
        { s: { c: 0, r: 0 }, e: { c: 0, r: 1 } },
        { s: { c: 1, r: 0 }, e: { c: 1, r: 1 } },
        { s: { c: 2, r: 0 }, e: { c: 2, r: 1 } },
        { s: { r: 0, c: 3 }, e: { r: 0, c: 4 } },
        { s: { r: 0, c: 5 }, e: { r: 0, c: 5 } },
      ],
      "!ref": "A1:G6",
    };

    expect(ws).toEqual(expected);
  });

  it("should worksheet to json", async () => {
    const ws = await toTableData(testColumns, testJson);

    const jsonRet = await toJsonData(testColumns, ws);

    const expected = [
      {
        no: "121",
        plate: "沪A-0001",
        plateAt: "2019-06-18T08:29:51.500Z",
        convoy: "一车队",
        line: "1路",
        producer: "Z0A",
      },
      {
        no: "122",
        plate: "沪A-0002",
        plateAt: "2019-06-18T08:29:51.500Z",
        convoy: "二车队",
        line: "2路",
        producer: "W0B",
      },
      {
        no: "123",
        plate: "沪A-0003",
        plateAt: "2019-06-18T08:29:51.500Z",
        convoy: "二车队",
        line: "3路",
        producer: "T2C",
      },
    ];

    expect(jsonRet).toEqual(expected);
  });

  // it("should parse csv", () => {
  //   const out = CSV.parse(`header1,header2\nvalue1,value2`);
  //   console.log(out);
  // });
});

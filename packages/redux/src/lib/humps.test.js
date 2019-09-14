import { humps } from "./humps";

test("should hums object keys", () => {
  const testObj = {
    "GITHUB.REPOS": 1,
    GITLAB: 1,
    GOOD_BOY: 1,
    good_Girl: 1,
    BadBOY: 1,
  };

  expect(humps(testObj)).toEqual({
    githubRepos: 1,
    gitlab: 1,
    goodBoy: 1,
    goodGirl: 1,
    badBoy: 1,
  });
});

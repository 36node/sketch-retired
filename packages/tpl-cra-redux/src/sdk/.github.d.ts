type ListReposRequest = {
  org: string;
  query: {
    limit: number;
  };
};

type ListReposResponse = {
  body: Array<Repo>;
  headers: {
    xNext: string;
  };
};

type Repo = {
  id: number;
  name: string;
  html_url: string;
};

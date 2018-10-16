type ListPetsRequest = {
  query: {
    _limit?: number;
    tag?: string;
    age_gt?: number;
  };
  context?: Object;
};

type ListPetsResponse = {
  body: Array<Pet>;
  headers: {
    xNext: string;
  };
};

type CreatePetsRequest = {
  body: NewPet;
  context?: Object;
};

type CreatePetsResponse = {
  body: Pet;
};

type ShowPetByIdRequest = {
  petId: string;
  context?: Object;
};

type ShowPetByIdResponse = {
  body: Pet;
};

type Pet = {
  id: number;
  age: number;
  name: string;
  tag: string;
};
type NewPet = {
  name: string;
  tag: string;
  age: number;
};
type Err = {
  code: string;
  message: string;
};

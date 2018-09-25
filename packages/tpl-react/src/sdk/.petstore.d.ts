type ListPetsRequest = {
  query: {
    limit: number;
  };
};

type CreatePetsRequest = {
  body: NewPet;
};

type ShowPetByIdRequest = {
  petId: string;
};

type ListPetsResponse = {
  body: Array<Pet>;
  headers: {
    xNext: string;
  };
};

type CreatePetsResponse = {
  body: Pet;
};

type ShowPetByIdResponse = {
  body: Pet;
};

type Pet = {
  id: number;
  name: string;
  tag: string;
};

type NewPet = {
  name: string;
  tag: string;
};

type Err = {
  code: string;
  message: string;
};

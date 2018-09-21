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

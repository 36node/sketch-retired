type ListPetsRequest = {
  query: {
    limit?: number;
  };
};

type ListPetsResponse = {
  body: Array<Pet>;
};

type CreatePetsRequest = {
  body: NewPet;
};

type CreatePetsResponse = {
  body: Pet;
};

type ShowPetByIdRequest = {
  petId: string;
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

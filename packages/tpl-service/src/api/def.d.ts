type ListPetsRequest = {
  query: {
    limit?: number;
  };
  context?: Object;
};

type ListPetsResponse = {
  body: Array<Pet>;
}

type CreatePetsRequest = {
  body: NewPet;
  context?: Object;
};

type CreatePetsResponse = {
  body: Pet;
}

type ShowPetByIdRequest = {
  petId: string;
  context?: Object;
};

type ShowPetByIdResponse = {
  body: Pet;
}

type Pet = {
  id: number;
  name: string;
  tag: string;
}
type NewPet = {
  name: string;
  tag: string;
}
type Err = {
  code: string;
  message: string;
}

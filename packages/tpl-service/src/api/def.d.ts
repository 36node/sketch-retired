interface ListPetsRequest {
  query: {
    limit?: number;

    filter: {
      tag?: string;
      age: {
        $gt?: number;
      };
    };
  };

  context?: Object;
}

interface ListPetsResponse {
  body: Array<Pet>;
  headers: {
    xTotalCount: number;
  };
}

interface CreatePetsRequest {
  body: NewPet;
  context?: Object;
}

interface CreatePetsResponse {
  body: Pet;
}

interface ShowPetByIdRequest {
  petId: string;
  context?: Object;
}

interface ShowPetByIdResponse {
  body: Pet;
}

interface DeletePetRequest {
  id: number;
  context?: Object;
}

interface Pet {
  id: number;
  age: number;
  name: string;
  tag: string;
}
interface NewPet {
  name: string;
  tag: string;
  age: number;
}
interface Err {
  code: string;
  message: string;
}

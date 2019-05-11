interface ListPetsRequest {
  query: {
    limit?: number;
    offset?: number;
    sort?: string;

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
  body: PetDoc;
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

interface UpdatePetRequest {
  petId: string;
  body: PetDoc;
  context?: Object;
}

interface UpdatePetResponse {
  body: Pet;
}

interface DeletePetRequest {
  petId: string;
  context?: Object;
}

interface Pet {
  id: string;
  age: number;
  name: string;
  tag: string;
}
interface PetDoc {
  name: string;
  tag: string;
  age: number;
}
interface Err {
  code: string;
  message: string;
}

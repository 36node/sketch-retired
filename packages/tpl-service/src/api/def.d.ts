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
}

interface ListPetsResponse {
  body: Array<Pet>;
  headers: {
    xTotalCount: number;
  };
}

interface CreatePetRequest {
  body: PetDoc;
}

interface CreatePetResponse {
  body: Pet;
}

interface ShowPetByIdRequest {
  petId: string;
}

interface ShowPetByIdResponse {
  body: Pet;
}

interface UpdatePetRequest {
  petId: string;
  body: PetDoc;
}

interface UpdatePetResponse {
  body: Pet;
}

interface DeletePetRequest {
  petId: string;
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

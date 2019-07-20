interface ListPetsRequest {
  query: {
    limit?: number;
    offset?: number;
    sort?: string;
    select?: string;
    group?: string | [string];

    filter: {
      tag?: string;
      age: {
        $gt?: number;
      };
      birthAt: {
        $gt?: string;
        $lt?: string;
      };
      grade: {
        $gt?: string;
        $lt?: string;
      };
    };
  };
}

interface ListPetsResponse {
  body: [Pet];
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

interface PetDoc {
  name: string;
  tag: "DOG" | "CAT";
  age: number;
  birthAt: string;
  grade: number;
}
interface Pet {
  id: string;
  name: string;
  tag: "DOG" | "CAT";
  age: number;
  birthAt: string;
  grade: number;
}
interface Err {
  code: string;
  message: string;
}

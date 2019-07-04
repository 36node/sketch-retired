export = SDK;

declare class SDK {
  constructor(opts?: SDK.Options);

  base: string;
  token: string;
  auth: string;

  pet: SDK.PetAPI;
}

declare namespace SDK {
  export interface Options {
    base?: string;
    token?: string;
  }

  export interface PetAPI {
    /**
     * List all pets
     */
    listPets(req: ListPetsRequest): Promise<ListPetsResponse>;
    /**
     * Create a pet
     */
    createPet(req: CreatePetRequest): Promise<CreatePetResponse>;
    /**
     * Find pet by id
     */
    showPetById(req: ShowPetByIdRequest): Promise<ShowPetByIdResponse>;
    /**
     * Update pet
     */
    updatePet(req: UpdatePetRequest): Promise<UpdatePetResponse>;
    /**
     *
     */
    deletePet(req: DeletePetRequest): Promise<DeletePetResponse>;
  }

  type ListPetsRequest = {
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
  };

  type ListPetsResponse = {
    body: [Pet];
    headers: {
      xTotalCount: number;
    };
  };

  type CreatePetRequest = {
    body: PetDoc;
  };

  type CreatePetResponse = {
    body: Pet;
  };

  type ShowPetByIdRequest = {
    petId: string;
  };

  type ShowPetByIdResponse = {
    body: Pet;
  };

  type UpdatePetRequest = {
    petId: string;
    body: PetDoc;
  };

  type UpdatePetResponse = {
    body: Pet;
  };

  type DeletePetRequest = {
    petId: string;
  };

  type PetDoc = {
    name: string;
    tag: "DOG" | "CAT";
    age: number;
    birthAt: string;
    grade: number;
  };
  type Pet = {
    id: string;
    name: string;
    tag: "DOG" | "CAT";
    age: number;
    birthAt: string;
    grade: number;
  };
  type PetOrDoc =
    | {
        name: string;
        tag: "DOG" | "CAT";
        age: number;
        birthAt: string;
        grade: number;
      }
    | {
        id: string;
        name: string;
        tag: "DOG" | "CAT";
        age: number;
        birthAt: string;
        grade: number;
      };
  type Err = {
    code: string;
    message: string;
  };
}

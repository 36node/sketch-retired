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
    createPets(req: CreatePetsRequest): Promise<CreatePetsResponse>;
    /**
     * Find pet by id
     */
    showPetById(req: ShowPetByIdRequest): Promise<ShowPetByIdResponse>;
  }

  type ListPetsRequest = {
    query: {
      filter: {
        limit?: number;
      };
    };
  };

  type ListPetsResponse = {
    body: Array<Pet>;
    headers: {
      xNext: string;
    };
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
}

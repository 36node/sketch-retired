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

      filter: {
        tag?: string;
        age: {
          $gt?: number;
        };
      };
    };
  };

  type ListPetsResponse = {
    body: Array<Pet>;
    headers: {
      xTotalCount: number;
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

  type DeletePetRequest = {
    petId: number;
  };

  type Pet = {
    id: number;
    age: number;
    name: string;
    tag: string;
  };

  type NewPet = {
    name: string;
    tag: string;
    age: number;
  };

  type Err = {
    code: string;
    message: string;
  };
}

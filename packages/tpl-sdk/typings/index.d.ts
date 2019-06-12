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

  type Pet = {
    id: string;
    age: number;
    name: string;
    tag: string;
  };

  type PetDoc = {
    name: string;
    tag: string;
    age: number;
  };

  type Err = {
    code: string;
    message: string;
  };
}

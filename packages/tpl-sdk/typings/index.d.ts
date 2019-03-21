export = PetStoreSDK;

declare class PetStoreSDK {
  constructor(opts?: Options);

  base: string;
  token: string;
  auth: string;

  pet: PetStoreSDK.PetAPI;
}

declare namespace PetStoreSDK {
  export interface Options {
    base?: string;
    token?: string;
  }

  export interface PetAPI {
    listPets(req: ListPetsRequest): Promise<ListPetsResponse>;
    createPets(req: CreatePetsRequest): Promise<CreatePetsResponse>;
    showPetById(req: ShowPetByIdRequest): Promise<ShowPetByIdResponse>;
  }

  type ListPetsRequest = {
    query: {
      limit?: number;
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

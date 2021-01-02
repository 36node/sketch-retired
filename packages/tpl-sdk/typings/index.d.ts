declare class SDK {
  constructor(opts?: Options);

  base: string;
  token: string | (() => string);
  auth: string;

  pet: PetAPI;
  store: PetAPI;
}

export interface Options {
  base?: string;
  token?: string | (() => string);
}

export interface PetAPI {
  /**
   * List all pets
   */
  listPets(
    req: ListPetsRequest,
    options: fetchOptions
  ): Promise<ListPetsResponse>;
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
  deletePet(req: DeletePetRequest): Promise<void>;
}

export interface ListPetsRequest {
  query?: {
    _limit?: number;
    _offset?: number;
    _sort?: string;
    _select?: string[];
    tag?: string;
    age_gt?: number;
    birthAt_gt?: string;
    birthAt_lt?: string;
    grade_gt?: string;
    grade_lt?: string;
  };
}
export interface ListPetsResponse {
  body: ({
    /**
     * pet's name
     */
    name?: string;
    tag?: "DOG" | "CAT";
    age?: number;
    birthAt?: string | null;
    grade?: number;
    owner?: string;
    other1?: string;
  } & {
    id: string;
    updateAt?: Date;
    updateBy?: string;
    createAt?: Date;
    createBy?: string;
  })[];
  headers: {
    "X-Total-Count": number;
  };
}
export interface CreatePetRequest {
  body: {
    /**
     * pet's name
     */
    name?: string;
    tag?: "DOG" | "CAT";
    age?: number;
    birthAt?: string | null;
    grade?: number;
    owner?: string;
    other2?: string;
  } & {
    /**
     * pet's name
     */
    name: string;
  };
}
export interface CreatePetResponse {
  body: {
    /**
     * pet's name
     */
    name?: string;
    tag?: "DOG" | "CAT";
    age?: number;
    birthAt?: string | null;
    grade?: number;
    owner?: string;
    other1?: string;
  } & {
    id: string;
    updateAt?: Date;
    updateBy?: string;
    createAt?: Date;
    createBy?: string;
  };
}
export interface ShowPetByIdRequest {
  petId: string;
}
export interface ShowPetByIdResponse {
  body: {
    /**
     * pet's name
     */
    name?: string;
    tag?: "DOG" | "CAT";
    age?: number;
    birthAt?: string | null;
    grade?: number;
    owner?: string;
    other1?: string;
  } & {
    id: string;
    updateAt?: Date;
    updateBy?: string;
    createAt?: Date;
    createBy?: string;
  };
}
export interface UpdatePetRequest {
  petId: string;
  body: {
    /**
     * pet's name
     */
    name?: string;
    tag?: "DOG" | "CAT";
    age?: number;
    birthAt?: string | null;
    grade?: number;
    owner?: string;
    other2?: string;
  };
}
export interface UpdatePetResponse {
  body: {
    /**
     * pet's name
     */
    name?: string;
    tag?: "DOG" | "CAT";
    age?: number;
    birthAt?: string | null;
    grade?: number;
    owner?: string;
    other1?: string;
  } & {
    id: string;
    updateAt?: Date;
    updateBy?: string;
    createAt?: Date;
    createBy?: string;
  };
}
export interface DeletePetRequest {
  petId: string;
}
export interface PetDoc {
  /**
   * pet's name
   */
  name?: string;
  tag?: "DOG" | "CAT";
  age?: number;
  birthAt?: string | null;
  grade?: number;
  owner?: string;
  other1?: string;
}

export type PetCreateDoc = {
  /**
   * pet's name
   */
  name?: string;
  tag?: "DOG" | "CAT";
  age?: number;
  birthAt?: string | null;
  grade?: number;
  owner?: string;
  other1?: string;
} & {
  /**
   * pet's name
   */
  name: string;
};

export type Pet = {
  /**
   * pet's name
   */
  name?: string;
  tag?: "DOG" | "CAT";
  age?: number;
  birthAt?: string | null;
  grade?: number;
  owner?: string;
  other1?: string;
} & {
  id: string;
  updateAt?: Date;
  updateBy?: string;
  createAt?: Date;
  createBy?: string;
};

export interface MongoDefault {
  id: string;
  updateAt?: Date;
  updateBy?: string;
  createAt?: Date;
  createBy?: string;
}

export interface Err {
  code?: string;
  type?: string;
  message: boolean;
  name: string;
  details?: {
    keyword?: string;
    message?: string;
    path?: string;
    value?: string;
  }[];
}

export = SDK;

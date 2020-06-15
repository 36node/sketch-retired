import { Context, Middleware } from "koa";
import Router from "koa-tree-router";

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
  content?: ({
    /**
     * pet's name
     */
    name: string;
    tag?: "DOG" | "CAT";
    age?: number;
    birthAt?: string;
    grade?: number;
  } & {
    id: string;
    updateAt?: string;
    updateBy?: string;
    createAt?: string;
    createBy?: string;
  })[];
  headers?: {
    "X-Total-Count": number;
  };
}
export interface CreatePetRequest {
  body: {
    /**
     * pet's name
     */
    name: string;
    tag?: "DOG" | "CAT";
    age?: number;
    birthAt?: string;
    grade?: number;
  };
}
export interface CreatePetResponse {
  content?: {
    /**
     * pet's name
     */
    name: string;
    tag?: "DOG" | "CAT";
    age?: number;
    birthAt?: string;
    grade?: number;
  } & {
    id: string;
    updateAt?: string;
    updateBy?: string;
    createAt?: string;
    createBy?: string;
  };
}
export interface ShowPetByIdRequest {
  petId: string;
}
export interface ShowPetByIdResponse {
  content?: {
    /**
     * pet's name
     */
    name: string;
    tag?: "DOG" | "CAT";
    age?: number;
    birthAt?: string;
    grade?: number;
  } & {
    id: string;
    updateAt?: string;
    updateBy?: string;
    createAt?: string;
    createBy?: string;
  };
}
export interface UpdatePetRequest {
  petId: string;
  body: {
    /**
     * pet's name
     */
    name: string;
    tag?: "DOG" | "CAT";
    age?: number;
    birthAt?: string;
    grade?: number;
  };
}
export interface UpdatePetResponse {
  content?: {
    /**
     * pet's name
     */
    name: string;
    tag?: "DOG" | "CAT";
    age?: number;
    birthAt?: string;
    grade?: number;
  } & {
    id: string;
    updateAt?: string;
    updateBy?: string;
    createAt?: string;
    createBy?: string;
  };
}
export interface DeletePetRequest {
  petId: string;
}
declare global {
  type ListPetsRequest = ListPetsRequest;
  type ListPetsResponse = ListPetsResponse;
  type CreatePetRequest = CreatePetRequest;
  type CreatePetResponse = CreatePetResponse;
  type ShowPetByIdRequest = ShowPetByIdRequest;
  type ShowPetByIdResponse = ShowPetByIdResponse;
  type UpdatePetRequest = UpdatePetRequest;
  type UpdatePetResponse = UpdatePetResponse;
  type DeletePetRequest = DeletePetRequest;
}

export default class API {
  middleware(operation: string): Array<Middleware>;
  bind(router: Router): API;
  listPets(req: ListPetsRequest, ctx: Context): Promise<ListPetsResponse>;
  createPet(req: CreatePetRequest, ctx: Context): Promise<CreatePetResponse>;
  showPetById(req: ShowPetByIdRequest, ctx: Context): Promise<ShowPetByIdResponse>;
  updatePet(req: UpdatePetRequest, ctx: Context): Promise<UpdatePetResponse>;
  deletePet(req: DeletePetRequest, ctx: Context): void;
}

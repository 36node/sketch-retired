import { makesure } from "./helper";

/**
 * listPets
 */

export class ListPetsParam {
  limit;

  constructor({ limit }) {
    this.limit = makesure("limit", limit, "int32");
  }
}

/**
 * showPetById
 */

export class ShowPetByIdParam {
  petId;

  constructor({ petId }) {
    this.petId = makesure("petId", petId, "string", true);
  }
}

/**
 * NewPet
 */
export class NewPet {
  name;
  tag;

  constructor({ name, tag }) {
    this.name = makesure("name", name, "string", true);
    this.tag = makesure("tag", tag, "string");
  }
}

/**
 * Pet
 */
export class Pet {
  id;
  name;
  tag;

  constructor({ id, name, tag }) {
    this.id = makesure("id", id, "integer", true);
    this.name = makesure("name", name, "string", true);
    this.tag = makesure("tag", tag, "string");
  }
}

import API from "../api/pet";
import { Pet } from "../api/helper";

const pets = [
  { id: "11212", name: "dog", tag: "cute" },
  { id: "11213", name: "cat", tag: "cute" },
  { id: "11214", name: "fish", tag: "cute" },
];

export class Service extends API {
  /**
   * List all pets
   *
   * @param {Object} [options] optional params
   *  - {Session} session session object
   *  - {Number} limit the number of returned pets
   * @returns {Array<Pet>} A paged array of pets
   */
  listPets(options) {
    return pets;
  }

  /**
   * List all pets' x-next
   *
   * @param {object} options optional params
   * @returns {string} A link to the next page of responses
   */
  listPetsXNext(options) {
    return "x-next";
  }

  /**
   * Create a pet
   *
   * @param {object} options optional params
   * @returns {Pet} The Pet created
   */
  createPet(newPet, options) {
    newPet.id = (Math.random() * 100000).toFixed(0);
    const pet = new Pet(newPet);
    pets.push(pet);
    return pet;
  }

  /**
   * Find pet by id
   *
   * @param {string} petId The id of the pet to retrieve
   * @param {object} options optional params
   * @returns {Pet} Expected response to a valid request
   */
  showPetById(petId, options) {
    const pet = pets.find(p => p.id === petId);
    return pet;
  }
}

const service = new Service();
export default service;

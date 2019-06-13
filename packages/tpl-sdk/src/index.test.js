import SDK from "./index";

const sdk = new SDK({ base: "http://localhost:3000" });

describe("## SDK vehicle", () => {
  it("should list pets", async () => {
    const result = await sdk.pet.listPets();
    expect(result.body.length).toBe(100);
  });

  let pet;

  it("should create pet", async () => {
    const newPet = {
      name: "jam",
      tag: "DOG",
      owner: "lily",
    };

    const result = await sdk.pet.createPet({ body: newPet });
    pet = result.body;
    expect(pet).toMatchObject(newPet);
  });

  it("should get pet", async () => {
    const result = await sdk.pet.showPetById({
      petId: pet.id,
    });
    expect(result.body.id).toBe(pet.id);
  });

  it("should delete pet", async () => {
    const result = await sdk.pet.deletePet({
      petId: pet.id,
    });
    expect(result.body).toEqual({});
  });
});

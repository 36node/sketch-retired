import SDK from "./index";

const sdk = new SDK({ base: "http://localhost:3000" });

describe("## SDK vehicle", () => {
  it("should list pets", async () => {
    const result = await sdk.pet.listPets();
    expect(result.body.length).toBe(100);
  });

  it("should CRUD", async () => {
    const newPet = {
      name: "jam",
      tag: "DOG",
      owner: "lily",
    };

    const resultCreate = await sdk.pet.createPet({ body: newPet });
    expect(resultCreate.body).toMatchObject(newPet);
    const resultGet = await sdk.pet.showPetById({
      petId: resultCreate.body.id,
    });
    expect(resultGet.body.id).toBe(resultCreate.body.id);
    const resultDelete = await sdk.pet.deletePet({
      petId: resultCreate.body.id,
    });
    expect(resultDelete.body).toEqual({});
  });
});

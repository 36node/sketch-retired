//@ts-check

import { petService } from "../services";

export default function() {
  return petService.createPet({ body: { name: "kitty", tag: "CAT", age: 1 } });
}

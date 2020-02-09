import Petstore from "@36node/template-sdk";
import Github from "./github";
import Auth from "./auth";
import { STORE_BASE } from "../config";

export const petstore = new Petstore({
  base: STORE_BASE,
});

export const github = new Github();

export const auth = new Auth();

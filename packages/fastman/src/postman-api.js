import { getApiKey } from "./helpers";
import fetch from "@36node/fetch";

function getHeaders() {
  const apiKey = getApiKey();
  return {
    "X-Api-Key": apiKey,
  };
}

/**
 * list collection use postman api
 */
export function listCollections() {
  return fetch("https://api.getpostman.com/collections", {
    headers: getHeaders(),
  }).then(result => result.body.collections);
}

/**
 * get single collection
 * @param {string} id  collection id
 */
export function singleCollection(id) {
  return fetch(`https://api.getpostman.com/collections/${id}`, {
    headers: getHeaders(),
  }).then(result => {
    return result.body.collection;
  });
}

/**
 * Update collection
 *
 * @param {string} id id
 * @param {object} collection update body
 */
export function updateCollection(id, collection) {
  return fetch(`https://api.getpostman.com/collections/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: { collection },
  }).then(result => result.body.collection);
}

/**
 * Create collection
 *
 * @param {object} collection create body
 */
export function createCollection(collection) {
  return fetch("https://api.getpostman.com/collections", {
    method: "POST",
    headers: getHeaders(),
    body: { collection },
  }).then(result => result.body.collection);
}

/**
 * Delete postman collection
 *
 * @param {string} id id of collection tobe delelted
 */
export function deleteCollection(id) {
  return fetch(`https://api.getpostman.com/collections/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
    body: "",
  }).then(result => result.body.collection);
}

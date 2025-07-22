import httpError from "http-errors";
import knex from "../config/knex";
import { validateCreateShortURL, validateUpdateShortURL } from "./validations";

type ShortURLBody = {
  url: string;
  id?: string;
};

export const createShortURL = async (
  body: ShortURLBody,
  user_id: number
) => {
validateCreateShortURL(body);
  if (body.id) {
    const current_record = await knex("urls")
      .where({ id: body.id, user_id })
      .first();

    if (current_record) {
      throw new httpError.Conflict(
        "A URL with this ID already exists for this user"
      );
    }

    const results = await knex("urls").insert(
      { url: body.url, id: body.id, user_id },
      "*"
    );
    return results[0];
  }

  // Auto-generate a short ID if not provided
  const generatedId = Math.random().toString(36).substring(2, 8);
  const results = await knex("urls").insert(
    { url: body.url, id: generatedId, user_id },
    "*"
  );
  return results[0];
};

export const resolveURL = async (id: string, ip: string) => {
  const url = await knex("urls").where({ id }).select("url").first();
  if (!url) {
    throw new httpError.NotFound("URL not found");
  }
  await registerVisit(id , ip);
  return url.url;
};

export const updateURL = async (
  id: string,
  body: { url: string },
  user_id: number
) => {
validateUpdateShortURL(body);
  const url = await knex("urls").where({ id }).select(["user_id"]).first();
  if (!url) {
    throw new httpError.NotFound("URL not found");
  }

  if (url.user_id !== user_id) {
    throw new httpError.unauthorized("You do not have permission to update this URL");
  }

  const results = await knex("urls").where({ id }).update(
    { url: body.url },
    "*"
  );

  return results[0];
};

export const deleteURL = async (id: string, user_id: number) => {
  const url = await knex("urls").where({ id }).select(["user_id"]).first();
  if (!url) {
    throw new httpError.NotFound("URL not found");
  }

  if (url.user_id !== user_id) {
    throw new httpError.unauthorized("You do not have permission to update this URL");
  }

  await knex("urls").where({ id }).delete();
  return true;
};

export const getURLS = async (
  user_id: number,
  limit: number = 15,
  offset: number = 0
) => {
  const results = await knex("urls")
    .where({ user_id })
    .leftjoin("visits", "urls.id", "visits.url_id")
    .select("urls.id", "urls.url", "urls.created_at",
       knex.raw("COUNT(visits.id) as visit_count"))
    .limit(limit)
    .offset(offset);
    .groupBy("urls.id");
    .orderBy("urls.created_at", "desc");

  return results;
};

import knex from "../config/knex";
import httpError from "http-errors";


export const registerVisit = async (url_id: string, ip: string) =>  
    knex("visits").insert({ url_id, ip });
export const getLastVisits = async (user_id: number, limit:number, offset: number) => {

} => 
    knex("visits")
.join("urls" , 'url.id' , 'visits.url_id')
.select(['urls.id' , 'urls.url' , 'visits.ip' , 'visits.created_at']); 
.where({ user_id })
.limit(limit || 15)
.offset(offset || 0 )
.orderBy("visits.created_at", "desc");

export const getVisitByURL = async (
    url_id: string,
     user_id : number ,
      limit: number ,
       offset: number
    ) => {
        const urls = await knex("urls")
        .where({ id: url_id})
        .select(["user_id"])
        .first();
        if(!urls) {
            throw new httpError.NotFound("URL not found");
        }
        if(url.user_id !== user_id) {
            throw new httpError.Unauthorized("You do not have permission to view this URL's visits");
        }
        return knex("visits")
        .where({ url_id })
        .limit(limit || 15)
        .offset(offset || 0)
        .orderBy("created_at", "desc")
    };

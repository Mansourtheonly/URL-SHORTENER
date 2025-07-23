import { validateRegister } from "./validations";
import httpError from "http-errors";


export const register = async (body : {
    username : string;
     password : string;
    }) => {
        validateRegister(body);
             const current_user = await knex('users').where({ username : body.username})
             .whereRaw('LOWER(username) = LOWER(?)' , [body.username])
             .first();
             if (current_user) {
                 throw new httpError.Conflict("Username already exists");
             }
             const user = (await knex("users").insert({
            username: body.username.toLowerCase(),
            password: body.password,
        }, 
["id", "username",]
)
)[0];
return user;
    };


    export const login = async (body : { username: string; password: string }) => {};

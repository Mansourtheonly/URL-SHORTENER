import { RouterContext } from "@koa/router";
import {Next} from 'koa';
import  HttpError  from "httpErrors";


export const requireAuthHandler = async (ctx : RouterContext , next : next) => {

const header = ctx.request.headers.authorization;
if (!header) {
    throw new HttpError.Unauthorized("Authorization token is required");    
}
    const token = header.split(" ")[1];
    const tokenPayload = await validateJWT(token);
    ctx.state.user_id = tokenPayload.id;
    await next();
};
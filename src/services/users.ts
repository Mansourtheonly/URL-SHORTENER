import { validateLogin, validateRegister } from "./validations";
import httpError from "http-errors";
import knex from "../config/knex";
import { hashPassword, comparePassword } from "../config/encryption";
import { generateToken } from "../config/jwt";
import { User, PublicUser } from "../types";

const getUser = async (username: string): Promise<User | undefined> => {
    return knex("users")
        .whereRaw('LOWER(username) = LOWER(?)', [username])
        .first();
};

export const register = async (body: {
    username: string;
    password: string;
}): Promise<PublicUser> => {
    validateRegister(body);
    const current_user = await getUser(body.username);
    if (current_user) {
        throw new httpError.Conflict("Username already exists");
    }
    const [user] = await knex("users")
        .insert({
            username: body.username.toLowerCase(),
            password: await hashPassword(body.password),
        }, ["id", "username", "created_at", "updated_at"]);
    return user;
};

export const login = async (body: { username: string; password: string }) => {
    validateLogin(body);
    const user = await getUser(body.username);
    if (!user) {
        throw new httpError.NotFound("User not found");
    }
    const passwordMatch = await comparePassword(body.password, user.password);
    if (!passwordMatch) {
        throw new httpError.Unauthorized("Invalid password");
    }
    const token = await generateToken({ id: user.id });
    const { password, ...publicUser } = user;
    return {
        user: publicUser,
        token,
    };
};

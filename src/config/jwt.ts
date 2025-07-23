import jwt from 'jsonwebtoken';
import httpError from 'http-errors';
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string; 

export const generateToken = async (payload : {[key : string] : any}) => 
    jwt.sign(payload , '', {expiresIn : '365d'});

    export const validateJWT = async (token: string) => {

    try{
   const content = jwt.verify(token , JWT_PRIVATE_KEY);
   return content;
    }catch(e){
        throw new httpError.Unauthorized('please provide a valide JWT token');
    }
    };
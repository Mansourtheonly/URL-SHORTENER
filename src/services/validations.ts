import Validator from 'validatorjs';


type RequestBody = {[key : string]: any };
const validateBody = 
(body : RequestBody , validation_schema : Validator.Rules) => {
    let validation = new Validator(body, validation_schema);
    if (validation.fails()) {
        const errors = validation.errors.all();
        const aggregratedErrors: string[] = [];
        Object.keys(errors).forEach((key) => {
            aggregratedErrors.push(validation.errors.first(key) as string); 
        });
        throw new Error(aggregratedErrors.join(', '));
    } else {
return true;
}
    };
export const validateCreateShortURL = async (body : RequestBody) => validateBody(body, {
    url: 'required|url',
    id: "string|min:5|max:10",
});

    export const validateUpdateShortURL = async (body : RequestBody) => 
        validateBody(body, {
            url: 'required|url',
        });
import Joi from "joi";
export const userSchema = Joi.defaults((schema) => {
    return schema.required();
}).object({
    name: Joi.string().trim().min(1).required(),
    isAdmin: Joi.boolean().required(),
});
export function isValidUser(user) {
    const result = userSchema.validate(user);
    return !result.error;
}
export const userSchemaPut = Joi.defaults((schema) => {
    return schema.required();
})
    .object()
    .keys({
    name: Joi.string().min(1).optional(),
    isAdmin: Joi.boolean().optional(),
})
    .required()
    .min(1);
export function isValidUserPut(user) {
    const result = userSchemaPut.validate(user);
    return !result.error;
}

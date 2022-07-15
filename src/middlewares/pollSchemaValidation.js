import pollSchema from "../schemas/pollSchema.js";

export default function pollSchemaMiddleware(req, res, next){
    const validation = pollSchema.validate(req.body, {abortEarly: false})
    if(validation.error){
        return res.sendStatus(422);
    }
    next()
}
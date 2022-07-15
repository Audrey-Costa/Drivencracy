import choiceSchema from "../schemas/choiceSchema.js";

export default function choiceSchemaValidation(req, res, next){
    const validation = choiceSchema.validate(req.body, {abortEarly: false})
    if(validation.error){
        return res.sendStatus(422);
    }
    next()
}
import db from "../db/db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export default async function voteController(req, res){
    const choiceId = req.params.id;
    try {
        const choice = await db.collection('choices').findOne({_id: new ObjectId(choiceId)});
        console.log(choice, 1)
        const poll = await db.collection('polls').findOne({_id: new ObjectId(choice.poolId)});
        console.log(poll, 2)
        if(!choice){
            return res.sendStatus(404);
        }
        if(dayjs(poll.expireAt).valueOf()-dayjs(Date.now()) < 0){
            return sendStatus(403)
        }
        await db.collection('votes').insertOne({createdAt: dayjs(Date.now()).format("YYYY-MM-DD HH:mm"), choiceId: new ObjectId(choiceId)});
        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
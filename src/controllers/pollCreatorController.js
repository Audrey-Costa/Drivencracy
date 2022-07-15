import db from "../db/db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export async function postPoll(req, res){
    const poll = req.body;
    if (!poll.expireAt){
        const validity = dayjs(Date.now()).format("YYYY-MM-DD HH:mm");
        const defaultValidity = dayjs(validity).add(30, 'day').format("YYYY-MM-DD HH:mm");
        poll.expireAt = defaultValidity;
    }
    try{
        await db.collection('polls').insertOne(poll)
        return res.sendStatus(201);

    } catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function postChoice(req, res){
    const choice = req.body;
    try{
        const poll = await db.collection('polls').findOne({_id: new ObjectId(choice.poolId)})
        const alreadyExist = await db.collection('choices').findOne({title: choice.title})
        if(dayjs(poll.expireAt).valueOf()-dayjs(Date.now()) < 0){
            return res.sendStatus(403)
        }
        if (!poll) {
            return res.sendStatus(404)
        }
        if(alreadyExist){
            return res.sendStatus(409)
        }
        await db.collection('choices').insertOne(choice)
        res.sendStatus(201)
        
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
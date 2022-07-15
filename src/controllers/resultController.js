import db from "../db/db.js";
import { ObjectId } from "mongodb";

export default async function resultController(req, res){
    const poolId = req.params.id;
    try {
        const pool = await db.collection('polls').findOne({_id: new ObjectId(poolId)});
        if(!pool){
            return res.sendStatus(404)
        }
        const choices = await db.collection('choices').find({poolId: new ObjectId(pool._id).toString()}).toArray();
        let moreVoted = 0;
        let choiceId = "";
        for (let i = 0; i < choices.length; i++){
            const votes = await db.collection('votes').find({choiceId: ObjectId(choices[i]._id).toString()}).toArray();
            if(votes.length > moreVoted){
                moreVoted = votes.length
                choiceId = votes[i].choiceId
            }
        }
        const choice = await db.collection('choices').findOne({_id: new ObjectId(choiceId)})
        res.send({_id: new ObjectId(), title: pool.title, expireAt: pool.expireAt, result: {title: choice.title, votes: moreVoted}});
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
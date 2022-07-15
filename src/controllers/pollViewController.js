import db from "../db/db.js";

export default async function pollViewController(req, res){
    try {
        const polls = await db.collection('polls').find().toArray();
        return res.send(polls);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
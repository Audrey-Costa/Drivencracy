import db from "../db/db.js";

export async function pollViewController(req, res){
    try {
        const polls = await db.collection('polls').find().toArray();
        return res.send(polls);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function choicesViewController(req, res){
    const poolId = req.params.id;
    try {
        const choices = await db.collection('choices').find({poolId: poolId}).toArray();
        if(choices.length === 0){
            return res.sendStatus(404)
        }
        return res.send(choices);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
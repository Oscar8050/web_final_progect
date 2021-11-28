import express from 'express'
import scoreCard from '../models/scoreCard';

const router = express.Router()

router.delete('/api/clear-db', async (_, res) => {
    try {
        await scoreCard.deleteMany({});
        console.log("Database deleted");
        res.json({ message: 'Database cleared' })
    }
    catch (e) { throw new Error("Database deletion failed"); }

})

router.post('/api/create-card', async (req, res) => {
    const existing = await scoreCard.findOne({ name: req.body.name, subject: req.body.subject });
    try {
        if (existing) {
            existing.name = req.body.name;
            existing.subject = req.body.subject;
            existing.score = req.body.score;
            existing.save();
            res.json({ message: `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})` });
        }
        else {
            const newscore = new scoreCard({ name: req.body.name, subject: req.body.subject, score: req.body.score });
            newscore.save();
            res.json({ message: `Adding(${req.body.name}, ${req.body.subject}, ${req.body.score})`, card: newscore });
        }

    } catch (e) { throw new Error("User creation error: " + e); }
})


router.get('/api/query-cards', async (req, res) => {
    //console.log((req.query.type === 'name'), '/', req.query.queryString)
    const _type = req.query.type, _queryString = req.query.queryString
    var fullfilled = 0;
    if (_type === 'name')
        fullfilled = await scoreCard.find({ name: _queryString })
    else
        fullfilled = await scoreCard.find({ subject: _queryString })
    console.log(fullfilled.length)
    if (!fullfilled.length) {
        res.json({ message: `${_type}(${_queryString}) not found!` })
        return;
    }

    var re = []
    for (let i = 0; i < fullfilled.length; ++i)
        re.push(`${fullfilled[i].name} gets ${fullfilled[i].score} in ${fullfilled[i].subject}`);
    res.json({ messages: re })
})

export default router

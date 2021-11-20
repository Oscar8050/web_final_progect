import express from 'express'
//import { guess } from '../../frontend/src/axios';
import { getNumber, genNumber } from '../core/getNumber'


const router = express.Router()
function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }
    return parsed;
}

router.post('/start', (_, res) => {
    genNumber()  // 用亂數產生一個猜數字的 number
    console.log('This time the number = ', getNumber())
    res.json({ msg: 'The game has started.' })
})
router.get('/guess', (req, res) => {
    //while (True) { ; }
    const number = getNumber()
    const guessed = roughScale(req.query.number, 10)
    // check if NOT a num or not in range [1,100]
    //console.log('guessed = ', guessed)
    if (!guessed || guessed < 1 || guessed > 100) {
        res.status(406).send({ msg: 'Not a legal number.' })
    }
    else if (number === guessed) {
        res.json({ msg: 'Equal' })
    }
    else if (guessed > number) {
        res.json({ msg: 'Smaller' })
    }
    else {
        res.json({ msg: 'Bigger' })
    }
}
)

router.post('/restart', (_, res) => {
    genNumber();
    //console.log('From restart, This time the number = ', getNumber())
    res.json({ msg: 'The game has restarted.' })
})
export default router

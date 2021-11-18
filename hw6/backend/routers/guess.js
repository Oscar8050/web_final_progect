import express from 'express'
import { guess } from '../../frontend/src/axios'

const router = express.Router()

router.post('/start', (_, res) => {
    genNumber()  // 用亂數產生一個猜數字的 number
    res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
    const number = getNumber()
    const guessed = roughScale(req.query.number, 10)
    // check if NOT a num or not in range [1,100]
    if (!guessed || guessed < 1 || guessed > 100) {
        res.status(406).send({ msg: 'Not a legal number.' })
    }
    // else if (number === guessed) {
    //     res.json({ msg: 'Equal' })
    // }
    // else if (guessed > number) {
    //     res.json({ msg: 'Smaller' })
    // }
    // else {
    //     res.json({ msg: 'Bigger' })
    // }

})
router.post('/restart', (_, res) => { })
export default router

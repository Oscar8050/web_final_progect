import express from 'express'
import {getTexture, getTitle, getArt, saveTexture, saveTitle, saveArt} from './bank.js'

const router = express.Router()
router.post('/start', (_, res) => {
  res.json({ msg: 'Start generating letter.' })
})

router.get('/store_tit', (req, res) => {
    const tit = req.query.title;
    const tex = req.query.tex;
    try{
        saveTitle(tit);
        saveTexture(tex);
        res.json({msg: 'success'});
        var bar = getTitle();
        var ber = getTexture();
        console.log({bar, ber});
    }catch(e){
        res.status(406).send({ msg: 'Fail' })
    }
  }
)

router.get('/restore_tit', (req, res) => {
    const tit = getTitle();
    const tex = getTexture();
    console.log({tit, tex});
    try{
        res.json({msg: {tex, tit} });
    }catch(e){
        res.status(406).send({ msg: 'Fail' })
    }
  }
)

router.get('/store_art', (req, res) => {
    const art = req.query.art;
    try{
        saveArt(art);
        res.json({msg: 'success'});
        var eer = getArt();
        console.log({eer});
    }catch(e){
        res.status(406).send({ msg: 'Fail' })
    }
  }
)

router.get('/restore_art', (req, res) => {
    const art = getArt();
    try{
        res.json({msg: art});
    }catch(e){
        res.status(406).send({ msg: 'Fail' })
    }
  }
)

export default router;
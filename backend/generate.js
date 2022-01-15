import express from 'express'
import {getTexture, getTitle, getArt, saveTexture, saveTitle, saveArt} from './bank.js'
import mongo from "./mongo.js";
import mongoose from "mongoose";

const router = express.Router()
router.post('/start', (_, res) => {
  res.json({ msg: 'Start generating letter.' })
})

router.get('/store_tit', (req, res) => {
    const tit = req.query.title;
    const tex = req.query.tex;
    const usr = req.query.usr;
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
    const usr = req.query.usr;
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

const letterSchema = new mongoose.Schema({
  content: String,
  title: String,
  texture: String,
  attr1: String,
  attr2: String,
  attr3: String,
})

const Let = mongoose.model('Letter', letterSchema)

router.get('/send_letter', (req, res) => {
  const art = getArt();
  const tit = getTitle();
  const tex = getTexture();
  const attr1 = req.query.attr1;
  const attr2 = req.query.attr2;
  const attr3 = req.query.attr3;
  try{
    const lett = new Let({
      content: art,
      title: tit,
      texture: tex,
      attr1: attr1,
      attr2: attr2,
      attr3: attr3,
    })
    lett.save().then(result => {
      console.log('note saved!')
    })
    saveTitle("");
    saveTexture("classic");
    saveArt("");
      res.json({msg: "success"});
  }catch(e){
      res.status(406).send({ msg: 'Fail' })
  }
}
)

export default router;
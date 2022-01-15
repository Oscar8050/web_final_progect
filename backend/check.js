import express from 'express'
import mongoose from 'mongoose'

const router = express.Router()
router.post('/start', (_, res) => {
  res.json({ msg: 'Start checking account.' })
})

const accountSchema = new mongoose.Schema({
    account: String,
    password: String,
    title: String,
    content: String,
    texture: String,
  })
  
const Acc = mongoose.model('Account', accountSchema)

router.get('/find', async(req, res) => {
    const account = req.query.account;
    const password = req.query.password;
    try{
      const existing = await Acc.findOne({ account:account, password:password });
      console.log(existing);
        if (existing){
            res.json({msg: existing});
        }
        else{
            res.json({msg: "fail"});
        }
    }catch(e){
        res.status(406).send({ msg: 'Fail' })
    }
  }
  )

  router.get('/create_acc', async(req, res) => {
    const account = req.query.account;
    const password = req.query.password;
    try{
      const ac = new Acc({
        account: account,
        password: password,
        title: "",
        content: "",
        texture: "",
      })
      const existing = await Acc.findOne({ account:account, password:password });
        if (existing){
            res.json({msg: "fail"});
        }
        else{
            ac.save().then(result => {
                console.log('account saved!')
            })
            res.json({msg: "success"});
        }
    }catch(e){
        res.status(406).send({ msg: 'Fail' })
    }
  }
  )

export default router;
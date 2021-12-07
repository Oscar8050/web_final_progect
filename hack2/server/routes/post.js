import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async (req, res) => {
    Post.find().sort({ timestamp: -1 }).exec(
        (err, _res) => {
            if (err || !_res) {
                res.status(403).json({ message: 'error', data: null })
            }
            //console.log(_res)
            res.status(200).json({ message: 'success', data: _res })
        }
    )
})

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async (req, res) => {
    //console.log(req.query, '/', req.body, '/', req.params)
    //console.log(req.query.pid)
    const parti = await Post.findOne({ postId: req.query.pid })
    //console.log(parti)
    try {
        if (parti) {
            res.status(200).json({ message: 'success', post: parti })
        }
        else
            res.status(403).json({ message: 'error', post: null })
    }
    catch (e) {
        res.status(403).json({ message: 'error', post: null })
    }
})
// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async (req, res) => {
    //console.log("i'm here")
    //console.log(req.body)
    try {
        const newpost = new Post({
            postId: req.body.postId, title: req.body.title,
            content: req.body.content, timestamp: req.body.timestamp
        });
        newpost.save();
        res.status(200).json({ message: 'success' })
    }
    catch (e) {
        res.status(403).json({ message: 'error' })
    }
})
// TODO 5-(1): create the 4th API (/api/post)
router.delete('/post', async (req, res) => {
    try {
        await Post.deleteOne({ postId: req.query.pid })
        res.status(200).json({ message: 'success' })
    }
    catch (e) {
        res.status(403).json({ message: 'error', post: null })
    }

})


export default router
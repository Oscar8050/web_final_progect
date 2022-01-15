import mongoose from 'mongoose'

var title = "";
var tex = "Default texture";
var art = "";
var files = [];
var tags = [];

const getTitle = () => {
    /*const accountSchema = require('mongoose').model('Account').schema
    const Acc = mongoose.model('Account', accountSchema);
    const existing = await Acc.findOne({ account:usr });
    var title = existing.title;*/
    return title;
}

const saveTitle = (str) => {
    /*const accountSchema = require('mongoose').model('Account').schema
    const Acc = mongoose.model('Account', accountSchema);
    var query = {account: usr};
    var existing = await Acc.findOne({ account:usr });
    existing.title = str;
    Acc.findOneAndUpdate(query, existing, {upsert: true}, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.send('Succesfully saved.');
});*/
    title = str;
    return;
}
const getTexture = () => {
    /*const accountSchema = require('mongoose').model('Account').schema
    const Acc = mongoose.model('Account', accountSchema);
    const existing = await Acc.findOne({ account:usr });
    var tex = existing.texture;*/
    return tex;
}

const saveTexture = function(str){
    tex = str;
    return;
}

const getArt = function(){
    return art;
}

const saveArt = function(str){
    art = str;
    return;
}

export {getTexture, getTitle, getArt, saveTexture, saveTitle, saveArt}
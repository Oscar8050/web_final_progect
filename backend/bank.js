var title = "Default title";
var tex = "Default texture";
var art = "Default content";
var files = [];
var tags = [];

const getTitle = function(){
    return title;
}

const saveTitle = function(str){
    title = str;
    return;
}
const getTexture = function(){
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
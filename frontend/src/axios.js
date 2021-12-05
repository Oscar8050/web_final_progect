import axios from 'axios'

const instance = axios.create
({ baseURL: 'http://localhost:4000/api/create' })

const store_page1 = async (title, tex) => {
    try{
        const { data: { msg } } = await instance.get
        ('/store_tit', { params: { title , tex } })
        return msg
    }
    catch(error){
        console.log(error.message);
        if(error.message === "Network Error"){
            return "server ERROR"
        }
        return "unexpected error, please try again later."
    }
}

const render_page1 = async () => {
    var temp = 0;
    try{
        const { data: { msg } } = await instance.get
        ('/restore_tit', { params: { temp } })
        console.log(msg);
        return msg
    }
    catch(error){
        console.log(error.message);
        if(error.message === "Network Error"){
            return "server ERROR"
        }
        return "unexpected error, please try again later."
    }
}

const store_page2 = async (art) => {
    try{
        const { data: { msg } } = await instance.get
        ('/store_art', { params: { art } })
        return msg
    }
    catch(error){
        console.log(error.message);
        if(error.message === "Network Error"){
            return "server ERROR"
        }
        return "unexpected error, please try again later."
    }
}

const render_page2 = async () => {
    var temp = 0;
    try{
        const { data: { msg } } = await instance.get
        ('/restore_art', { params: { temp } })
        console.log(msg);
        return msg
    }
    catch(error){
        console.log(error.message);
        if(error.message === "Network Error"){
            return "server ERROR"
        }
        return "unexpected error, please try again later."
    }
}

export { store_page1 , render_page1, store_page2 , render_page2}
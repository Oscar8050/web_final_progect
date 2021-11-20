import axios from 'axios'

//const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })
const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })


const startGame = async () => {
    try {
        const { data: { msg } } = await instance.post('/start')
        return msg
    }
    catch (error) {
        return error.message;
    }
}

const guess = async (number, _status) => {
    if (_status === 'Network Error') {
        try {
            const { data: { msg } } = await instance.post('/start')
        }
        catch (error) {
            return error.message;
        }
    }
    try {
        const { data: { msg } } = await instance.get
            ('/guess', { params: { number } })
        return msg
    }
    catch (error) {
        //console.log(error.status)
        if (error) {
            if (error.message === 'Network Error')
                return error.message
            else {
                let len = error.message.length
                if ('406' === error.message.substring(len - 3, len))
                    return error.response.data.msg;
                else
                    return error.message;

            }

        }
        else
            return '!!!!!!';
    }
}
const restart = async (number) => {
    try {
        const { data: { msg } } = await instance.post('/restart')
        return msg;
    }
    catch (error) {
        return error.message;
    }

}

export { startGame, guess, restart }

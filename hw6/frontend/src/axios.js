import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' })
const startGame = async () => {
    const { data: { msg } }
        = await instance.post('/start')
    return msg
}
const guess = async (number) => {
    try {
        const { data: { msg } } = await instance.get
            ('/guess', { params: { number } })
        return msg
    }
    catch (error) {
        console.log(error(error))
        return error.response;
    }
}
const restart = async (number) => {
    try {
        const { data: { msg } } = await instance.get
            ('/guess', { params: { number } })
        return msg
    }
    catch (error) {
        return error.response
    }
}
export { startGame, guess, restart }


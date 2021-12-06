//import WebSocket from 'ws';
import { WebSocketServer } from 'ws'
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import express from "express";;
import http from 'http'
import { sendData, sendStatus, initData } from './wssConnect';
import Message from './models/message'


dotenv.config();
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created"));

const db = mongoose.connection
const app = express()
//app.use(cors());
const server = http.createServer(app)
const wss = new WebSocketServer({ server: server })

db.once('open', () => {
    console.log('MongoDB connected!')
    wss.on('connection', async (ws) => {
        await initData(ws);
        ws.onmessage = async (byteString) => {

            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            switch (task) {
                case 'input': {
                    const { name, body } = payload
                    const message = new Message({ name, body })
                    try {
                        await message.save();
                    }
                    catch (e) {
                        throw new Error("Message DB save error: " + e);
                    }

                    sendData(['output', [payload]], ws)
                    sendStatus({ type: 'success', msg: 'Message sent.' }, ws)
                    break
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        sendData(['cleared'], ws)
                        sendStatus({ type: 'info', msg: 'Message cache cleared.' }, ws)
                    })
                    break
                }

                default: break
            }

        }
    }
    )
    const PORT = process.env.port || 4000

    server.listen(PORT, () => { console.log(`Listening on http://localhost:${PORT}`) })
})



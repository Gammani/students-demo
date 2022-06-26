import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import {videosRouter} from "./routes/videos-routes";


const app = express()
app.use(cors())
app.use(bodyParser.json())


const port = process.env.PORT || 5000


app.get('/', (req: Request, res: Response) => {
    res.send("Hello World!!!")
})
app.get('/samurais', (req: Request, res: Response) => {
    res.send('Hello Samurais!')
})

app.use('/videos', videosRouter)


app.listen(port, () => {
    console.log(`server run on port ${port}`)
})
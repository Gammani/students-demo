import {Request, Response, Router} from "express";
import {videosRepository} from "../repositories/videos-repository";

export const videosRouter = Router({})


videosRouter.get('/', (req: Request, res: Response) => {
    const videos = videosRepository.findVideos(req.query.title?.toString())
    res.send(videos)
})
videosRouter.get('/:id', (req: Request, res: Response) => {
    const video = videosRepository.findVideoById(+req.params.id)
    if(!video) {
        res.sendStatus(404)
    } else {
        res.send(video)
    }
})
videosRouter.post('/', (req: Request, res: Response) => {
    const newVideo = videosRepository.createVideo(req.body.title)
    res.status(201).send(newVideo)
})
videosRouter.delete('/:id',(req: Request, res: Response)=>{
    const isDelete = videosRepository.deleteVideo(+req.params.id)
    if(isDelete) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)
    }
})
videosRouter.put('/:id',(req: Request, res: Response)=>{
    const isUpdated = videosRepository.updateVideo(+req.params.id, req.body.title)
    if(isUpdated) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})
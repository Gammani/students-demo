import {NextFunction, Request, Response} from "express";
import {videos} from "../repositories/videos-repository";

type ErrorsMessagesType = {
    message: string
    field: string
}
type ErrorsType = {
    errorsMessages: Array<ErrorsMessagesType>
}

export let errors: ErrorsType = {errorsMessages: []}

export const checkedPostMethodErrors = (title: string) => {
    if(title === null) {
        errors.errorsMessages.push({message: 'title не должно быть null', field: 'title'})
    } else if(title.trim() === "") {
        errors.errorsMessages.push({message: 'title не должен быть пустым', field: 'title'})
    } else if(title.trim().length > 40) {
        errors.errorsMessages.push({message: 'title не должен быть больше 40 символов', field: 'title'})
    } else if(typeof title !== 'string') {
        errors.errorsMessages.push({message: 'title должен быть строкой', field: 'title'})
    }
    return errors;
}

export const checkedPutMethodErrors = (title: string, id: number) => {
    const videoId = videos.find(v => v.id === id)
    if(videoId) {
        return checkedPostMethodErrors(title)
    } else {
        errors.errorsMessages.push({message: 'id не найден', field: 'id'})
        return errors;
    }
}

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    errors = {errorsMessages: []}
    switch (req.method) {
        case 'POST': {
            const checked = checkedPostMethodErrors(req.body.title)
            if(checked.errorsMessages.length > 0) {
                res.status(400).send(errors)
            } else {
                next()
            }
            break;
        }
        case 'PUT': {
            const checked = checkedPutMethodErrors(req.body.title, +req.params.id)
            // console.log('Request Type:', req.method)
            if(checked.errorsMessages.length > 0) {
                res.status(400).send(errors)
            } else {
                next()
            }
            break;
        }
        default: break;
    }
}
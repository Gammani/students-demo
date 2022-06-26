const videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]

export const videosRepository = {
    findVideos(title: string | null | undefined) {
        if(title) {
            const filtered = videos.filter(v => v.title.indexOf(title.toString()) > -1)
            return filtered;
        } else {
            return videos;
        }
    },
    findVideoById(id: number) {
        const video = videos.find(v => v.id === id)
        return video;
    },
    createVideo(title: string) {
        const newVideo = {
            id: +new Date(),
            title: title,
            author: 'it-incubator.eu'
        }
        videos.push(newVideo)
        return newVideo;
    },
    deleteVideo(id: number) {
        const index = videos.findIndex(v => v.id === id)
        if(index === -1) {
            return false;
        } else {
            videos.splice(index, 1)
            return true;
        }
    },
    updateVideo(id: number, title: string) {
        const video = videos.find(v => v.id === id)
        if(video) {
            if(video) video.title = title
            return true;
        } else {
            return false;
        }
    }
}

export function getUid() {
    return Math.random().toString(36).substring(2, 9)
}


export function isHtmlVideoElement(element:
        | HTMLVideoElement
        | HTMLImageElement
        | HTMLCanvasElement
        | null
        | HTMLElement): element is HTMLVideoElement {
    if (!element) {
        return false
    }
    return element.tagName === 'VIDEO'
}
export function isHtmlImageElement(element:
        | HTMLVideoElement
        | HTMLImageElement
        | HTMLCanvasElement
        | null
        | HTMLElement): element is HTMLImageElement {
    if (!element) {
        return false
    }
    return element.tagName === 'IMG'
}

export function isHtmlAudioElement(element:
        | HTMLVideoElement
        | HTMLImageElement
        | HTMLCanvasElement
        | null
        | HTMLElement): element is HTMLAudioElement {
    if (!element) {
        return false
    }
    return element.tagName === 'AUDIO'
}


export function formatTimeToMinSec(time: number) {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${appendZero(seconds, 2)}`
}

export function formatTimeToMinSecMili(time: number) {
    const mili = Math.floor((time % 1000) / 10)
    return formatTimeToMinSec(time / 1000) + `.${appendZero(mili, 2)}`
}

function appendZero(value: number, minDigits: number = 2) {
    return value.toString().padStart(minDigits, '0')
}


export function imageUrlToBlob(imageUrl, callback) {
    fetch(imageUrl)
        .then((response) => {
            // 检查请求是否成功
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.blob()
        })
        .then((blob) => {
            // 调用回调函数并传递Blob对象
            callback(blob)
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error)
        })
}

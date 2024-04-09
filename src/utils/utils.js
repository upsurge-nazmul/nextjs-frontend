const gameUrl = (url) => {
    return url.replace("https://upsurge-public-games.s3.ap-south-1.amazonaws.com", process.env.NEXT_PUBLIC_GAME_BUCKET)
}

const assetsCdn = (url, buc='upsurge-assets-cdn') => {
    return `${process.env.NEXT_PUBLIC_MEDIA_BUCKET}/${buc}/${url}`
}

const assetsVideo = (url, buc='upsurgevideoassets') => {
    return `${process.env.NEXT_PUBLIC_MEDIA_BUCKET}/${buc}/${url}`
}

export { gameUrl, assetsCdn, assetsVideo }

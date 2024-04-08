const gameUrl  = (url) => {
    return url.replace("https://upsurge-public-games.s3.ap-south-1.amazonaws.com", process.env.NEXT_PUBLIC_GAME_BUCKET)
}

export { gameUrl }

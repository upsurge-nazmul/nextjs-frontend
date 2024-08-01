const gameUrl = (url, buc = "upsurge-public-games") => {
  // return url.replace("https://upsurge-public-games.s3.ap-south-1.amazonaws.com", process.env.NEXT_PUBLIC_GAME_BUCKET)
  let main_url = `${process.env.NEXT_PUBLIC_GAME_BUCKET}/${buc}`;
  console.log(main_url);
  return url.replace(
    "https://upsurge-public-games.s3.ap-south-1.amazonaws.com",
    main_url
  );
};

const assetsCdn = (url, buc = "upsurge-assets-cdn") => {
  return `${process.env.NEXT_PUBLIC_MEDIA_BUCKET}/${buc}/${url}`;
};

const assetsVideo = (url, buc = "upsurgevideoassets") => {
  return `${process.env.NEXT_PUBLIC_MEDIA_BUCKET}/${buc}/${url}`;
};

export { gameUrl, assetsCdn, assetsVideo };

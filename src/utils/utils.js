const NEXT_PUBLIC_GAME_BUCKET = "https://storage.googleapis.com";
const NEXT_PUBLIC_MEDIA_BUCKET = "https://storage.googleapis.com";

const gameUrl = (url, buc = "upsurge-public-games") => {
  // return url.replace("https://upsurge-public-games.s3.ap-south-1.amazonaws.com", process.env.NEXT_PUBLIC_GAME_BUCKET)
  let main_url = `${NEXT_PUBLIC_GAME_BUCKET}/${buc}`;
  console.log(main_url);
  return url.replace(
    "https://upsurge-public-games.s3.ap-south-1.amazonaws.com",
    main_url
  );
};

const assetsCdn = (url, buc = "upsurge-assets-cdn") => {
  return `${NEXT_PUBLIC_MEDIA_BUCKET}/${buc}/${url}`;
};

const assetsVideo = (url, buc = "upsurgevideoassets") => {
  return `${NEXT_PUBLIC_MEDIA_BUCKET}/${buc}/${url}`;
};

export { gameUrl, assetsCdn, assetsVideo };

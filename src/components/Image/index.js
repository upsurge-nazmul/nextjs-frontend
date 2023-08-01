import { useEffect, useState } from "react";

const Image = ({
  imageUrl = "",
  alt = "",
  placeholderText = "Image",
  borderRadius = "10px",
}) => {
  const [currentUrl, setCurrentUrl] = useState(null);

  useEffect(() => {
    let url;
    if (imageUrl) {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.onload = () => {
        url = imageUrl;
        setCurrentUrl(url);
      };
      img.onerror = () => {
        url = `https://placehold.co/800@3x.png?text=${placeholderText}+Image`;
        setCurrentUrl(url);
      };
    } else {
      url = `https://placehold.co/800@3x.png?text=${placeholderText}+Image`;
      setCurrentUrl(url);
    }
  }, [imageUrl, placeholderText]);

  return (
    <img
      src={currentUrl}
      alt={alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius,
      }}
      className="img-fluid rounded-3"
    />
  );
};

export default Image;

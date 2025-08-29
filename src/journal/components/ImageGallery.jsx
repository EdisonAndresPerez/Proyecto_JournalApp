import { ImageListItem, ImageList } from "@mui/material";

export const ImageGallery = ({ images = [] }) => {
  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={200}>
      {images.map((imgUrl, idx) => (
        <ImageListItem key={imgUrl + idx}>
          <img src={imgUrl} alt={`imagen-${idx}`} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

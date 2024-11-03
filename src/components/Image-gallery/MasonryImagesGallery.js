import React from "react";
import galleryImages from "./galleryImages";
import Masonnry, { ResponsiveMasonry } from "react-responsive-masonry";

const MasonryImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
      <Masonnry gutter="1rem">
        {galleryImages.map((item, index) => (
          <img className="masonry__img"
            src={item}
            key={index}
            alt=""
            style={{ width: "100%", display: "block", borderRadius: "10px" }}
          />
        ))}
      </Masonnry>
    </ResponsiveMasonry>
  );
};

export default MasonryImagesGallery;

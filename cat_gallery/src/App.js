import React, { useState, useEffect } from "react";
import "./CatImagesGallery.css";

const CatImagesGallery = () => {
  const [cats, setCats] = useState([]);

  const fetchCats = async () => {
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=9");
      const data = await response.json();
      setCats(data);
    } catch (error) {
      console.error("Failed to fetch cat images", error);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className="cat-gallery-container">
      <h1 className="title">🐱 Random Cat Images</h1>
      <button className="load-more-btn" onClick={fetchCats}>🔄 Load More</button>
      <div className="cat-grid">
        {cats.map((cat) => (
          <img key={cat.id} src={cat.url} alt="Cat" className="cat-image" />
        ))}
      </div>
    </div>
  );
};

export default CatImagesGallery;

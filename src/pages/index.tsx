import React, { useState, useEffect } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";

const ImageUploadAndConvert: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<{url: string, width: number, height: number}[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(file => {
        const url = URL.createObjectURL(file);
        const img = new window.Image();
        img.onload = () => {
          setSelectedImages(prev => [...prev, { url, width: img.width, height: img.height }]);
          URL.revokeObjectURL(url); // メモリリークを防ぐ
        };
        img.src = url;
      });
    }
  };

  return (
    <Container>
      <Typography variant="h5" style={{ margin: "20px 0" }}>
        画像アップロードと動画変換
      </Typography>
      <Button variant="contained" color="primary" component="label" style={{ margin: "20px" }}>
        画像をアップロード
        <input type="file" multiple hidden onChange={handleImageChange} />
      </Button>
      <Button variant="contained" color="primary" style={{ margin: "20px" }}>
        画像を動画に変換
      </Button>
      <Grid container spacing={2}>
        {selectedImages.map((image, index) => (
          <Grid item xs={4} key={index}>
            <Image
              src={image.url}
              alt={`uploaded ${index}`}
              width={image.width}
              height={image.height}
              max-width={300}
              max-height={300}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ImageUploadAndConvert;
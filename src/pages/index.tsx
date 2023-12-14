import React, { useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useImage } from '../models/Image/index';
import { RecoilRoot } from "recoil"

const ImageUploadAndConvert: React.FC = () => {
  const [images, addImages] = useImage();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addImages(Array.from(e.target.files))
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
      <Button variant="contained" color="primary" sx={{ margin: "20px" }}>
        画像を動画に変換
      </Button>
      <Grid container spacing={1}>
        {images.map((image, index) => (
          <Grid item key={index} sx={{ margin: "20px", maxWidth: "100px", maxHeight: "100px" }}>
            <Image
              src={image.url}
              alt={`uploaded ${index}`}
              width={image.width}
              height={image.height}
              style={{maxWidth: "100px", maxHeight: "100px"  }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

function App() {
  return (
    <RecoilRoot>
      <ImageUploadAndConvert />
    </RecoilRoot>
  )
}
export default App;
import React from "react";
import { Grid } from "@mui/material";

const ImageList = ({ images }) => {
    const largeImage = images[0];
    const smallImages = images.slice(1);

    return (
        <Grid container spacing={2}>
            <Grid sx={{ width: "100%", height: "36rem" }} item xs={9}>
                <img className="w-full h-full object-cover" src={largeImage} alt="" />
            </Grid>
            <Grid item xs={3}>
                <Grid container columns={4} spacing={2}>
                    {smallImages.map((index) => (
                        <Grid sx={{ width: "100%", height: "9rem" }} item key={index}>
                            <img className="w-full h-full object-cover" src={index} alt="" />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ImageList;
import { ArrowUpward } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const ScrollOnTop = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 100) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <Box sx={{ position: "fixed", bottom: 50, right: 50 }}>
            {showButton && (
                <Button onClick={scrollToTop} variant="contained" color="primary">
                    <ArrowUpward />
                </Button>
            )}
        </Box>
    );
};

export default ScrollOnTop;
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { Typography, Box, Button } from "@mui/material"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const carouselItems = [
    {
        image: 'https://i.ibb.co/rRjFz4Qj/carousel5.jpg',
        title: 'School Management Solutions',
        description: 'Explore Our School Management Solutions at Affordable Prices'

    },
    {
        image: 'https://i.ibb.co/zhBZrGWf/carousel4.jpg',
        title: 'Teachers Outsourcing',
        description: 'Source The Most Competent Teachers From Our Pool of Outsourced Subject Teachers'

    },
    {
        image: 'https://i.ibb.co/4Zr5S48X/carousel-stem.jpg',
        title: 'STEM Textbooks For All Levels',
        description: 'Our STEM textbooks are World-Class and High Quality Knowledge Sources For All Years and Levels'

    },
    {
        image: 'https://i.ibb.co/8CkvRsF/carousel-lab.jpg',
        title: 'ICT and Science Lab. Setup',
        description: 'We Set Up ICT and Science To Enable Schools Run 21st-Century-Compliant Systems '

    },
]

export default function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }
    const handleBack = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1)
    }

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            <SwipeableViews index={activeIndex} onChangeIndex={(index) => setActiveIndex(index)}>
                {carouselItems.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'relative',
                            textAlign: 'center',
                            color: 'green',
                        }}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: '100%', height: '70vh', minHeight: '400px', objectFit: 'cover' }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 20,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                bgcolor: 'rgba(0,0,0.0.6)',
                                padding: '10px 20px',
                                borderRadius: 1,
                            }}
                        >
                            <Typography variant="h5">{item.title}</Typography>
                            <Typography variant="body1">{item.description}</Typography>
                        </Box>
                    </Box>
                ))}
            </SwipeableViews>
            {/* NavigTION BUTTONS */}
            <Box sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', zIndex: 1 }}>
                <Button variant="contained" onClick={handleBack}>
                    <ArrowBackIosIcon />
                </Button>
            </Box>
            <Box sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 1 }}>
                <Button variant="contained" onClick={handleNext}>
                    <ArrowForwardIosIcon />
                </Button>
            </Box>
        </Box>
    )
}
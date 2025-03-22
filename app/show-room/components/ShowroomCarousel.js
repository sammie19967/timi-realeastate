"use client";
import { useState } from "react";

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: "600px", margin: "auto" }}>
            <div style={{ overflow: "hidden", position: "relative" }}>
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "10px" }}
                />
            </div>
            <button
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "50%",
                }}
                onClick={prevSlide}
            >
                ❮
            </button>
            <button
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    background: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "50%",
                }}
                onClick={nextSlide}
            >
                ❯
            </button>
        </div>
    );
};

export default Carousel;

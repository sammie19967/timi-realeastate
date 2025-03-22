import Carousel from "./components/ShowroomCarousel";

export default function Showroom() {
    const images = [
        "/car1.jpg",
        "/car2.jpg",
        "/car3.jpg",
    ];

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Showroom</h1>
            <Carousel images={images} />
        </div>
    );
}

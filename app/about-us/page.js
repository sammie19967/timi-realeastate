import "./about.css";  // Import the CSS file

export default function AboutUsPage() {
  return (
    <main className="about-container">
      <h1><span className="highlight">About Us</span></h1>
      
      <p>
        At <span className="company-name">KENYORC ZENIA GROUP</span>, we are committed to helping you 
        find your dream property with ease and confidence. Our expert team specializes in 
        <span className="highlight"> buying, selling, and renting</span> residential and commercial properties.
      </p>

      <h2><span className="highlight">Our Mission</span></h2>
      <p>
        To provide <span className="highlight">personalized, professional, and transparent</span> 
        real estate services that meet your unique needs. Whether you are a 
        <span className="emphasis"> first-time buyer, a seasoned investor, or looking to sell</span> 
        your property, we offer expert guidance every step of the way.
      </p>

      <h2><span className="highlight">Why Choose Us?</span></h2>
      <p>
        We take pride in our <span className="highlight">deep market knowledge, strong network, and dedication</span> 
        to customer satisfaction. At <span className="company-name">Kenyorc Zenia Group</span>, 
        your property goals are our priority. 
      </p>
      <p>
        <span className="highlight">We have also expanded our platform!</span> Now, you can 
        <span className="emphasis"> buy and sell cars and electronics </span> on our platform.
      </p>

      <h2><span className="highlight">Contact Us</span></h2>
      <p>Email: <span className="emphasis">kenyorczenia@gmail.com</span></p>
      <p>Phone: <span className="emphasis">0725 619 364</span></p>
    </main>
  );
}

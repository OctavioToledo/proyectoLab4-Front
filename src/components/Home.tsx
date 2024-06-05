import React from "react";
import Slider from "react-slick";
import "../styles/Home.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home: React.FC = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Pantera Store</h1>
      <Slider {...sliderSettings} className="home-slider">
        <div>
          <img src="/assets/img/instrumentoHome1.jpg" alt="Instrumento 1" />
        </div>
        <div>
          <img src="/assets/img/instrumentoHome2.jpg" alt="Instrumento 2" />
        </div>
        <div>
          <img src="/assets/img/instrumentoHome3.jpg" alt="Instrumento 3" />
        </div>
      </Slider>
      <p className="home-description">
        Bienvenido a Pantera Store, tu tienda de música favorita. Ofrecemos una gran variedad de instrumentos musicales para todos los gustos y niveles. Ya seas un principiante o un músico experimentado, tenemos el instrumento perfecto para ti. ¡Explora nuestra colección y descubre la magia de la música con Pantera Store!
      </p>
    </div>
  );
};

export default Home;

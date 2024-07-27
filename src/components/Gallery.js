import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {

    var settings = {
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,

    };
    return (
        <Slider {...settings}>
            
            <div>
                <h3><center><img src="https://media.ksp.co.il/otk19z8kk62fr85y4fts5.png"></img></center></h3>
            </div>
            <div>
                <h3><center><img src="https://media.ksp.co.il/9g5zlqcyf7vgsar0cqc0m.png"></img></center></h3>
            </div>
            <div>
                <h3><center><img src="https://ksp.co.il/images/slider/1687089652.jpg"></img></center></h3>
            </div>
            <div>
                <h3><center><img src="https://media.ksp.co.il/aq7wfqy1544b7pvnjhrn6.png"></img></center></h3>
            </div>
            <div>
                <h3><center><img src="https://media.ksp.co.il/o3xlpy0z5qhzfmsnfeazl.png"></img></center></h3>
            </div>
        </Slider>
    );
}

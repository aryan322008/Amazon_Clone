import React from 'react';

const Carousel = () => {
    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61aURrton0L._SX3000_.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71YEY+JRlKL._SX3000_.jpg" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51ovs76vmtL._SX3000_.jpg" className="d-block w-100" alt="..." />
                </div>
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;

import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function ImageSlider({ pictures }) {
    let carouselId = pictures[0].slice(1, -4).replaceAll('/', '')
    return (
        <div
            id={carouselId}
            className="carousel carousel-dark slide"
            style={{ maxWidth: '34rem' }}
        >
            <div className="carousel-indicators">
                {pictures.map((picture, i) => (
                    <button
                        key={picture}
                        type="button"
                        data-bs-target={'#' + carouselId}
                        data-bs-slide-to={i}
                        className={i === 0 ? "active" : ''}
                    />
                ))}
            </div>
            <div className="carousel-inner">
                {pictures.map((picture, i) => (
                    <div key={picture} className={'carousel-item' + (i === 0 ? ' active' : '')}>
                        <img src={picture} className="d-block w-100" alt="..." />
                    </div>
                ))}
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={'#' + carouselId}
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target={'#' + carouselId}
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
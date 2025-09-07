import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import slider1 from '/assets/slider1.png';
import slider2 from '/assets/slider2.png';
import slider3 from '/assets/slider3.png';
import slider4 from '/assets/slider4.png';
import slider5 from '/assets/slider5.png';
import slider6 from '/assets/slider6.png';
import prevIcon from '/assets/prev.png';
import nextIcon from '/assets/next.png';
import logoIcon from '/assets/logo-icon.png';
import logoText from '/assets/logo-text.png';
import { slides } from './data/sliderData';

function CircularProgress({ currentIndex, totalSlides }) {
    const radius = 128; // Circle radius (reduced from 160)
    const centerX = 160; // Center X coordinate (reduced from 200)
    const centerY = 160; // Center Y coordinate (reduced from 200)

    // Calculate rotation angle to keep active slider at top
    const rotationAngle = -(currentIndex * 360 / totalSlides);

    return (
        <div className="circular-progress">
            {/* Logo icon - positioned outside the rotating SVG so it doesn't rotate */}
            <div className="circle-logo">
                <img src={logoIcon} alt="Logo" className="circle-logo-icon" />
            </div>

            <svg
                width="320"
                height="320"
                viewBox="0 0 320 320"
                style={{
                    transform: `rotate(${rotationAngle}deg)`,
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                {/* Gradient definition for border */}
                <defs>
                    <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="22.5%" stopColor="rgba(0, 123, 255, 0.7)" />
                        <stop offset="80.89%" stopColor="rgba(23, 219, 252, 0.7)" />
                    </linearGradient>
                </defs>

                {/* Circle border */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="none"
                    stroke="url(#circleGradient)"
                    strokeWidth="4"
                    className="progress-circle"
                />

                {/* Slider names positioned around the circle */}
                {slides.map((slide, index) => {
                    const angle = (index * 360 / totalSlides - 90) * (Math.PI / 180); // Start from top
                    const textRadius = radius + 20; // Text positioned closer to circle
                    const x = centerX + textRadius * Math.cos(angle);
                    const y = centerY + textRadius * Math.sin(angle);
                    const isActive = index === currentIndex;

                    return (
                        <text
                            key={slide.id}
                            x={x}
                            y={y}
                            className={`slider-name ${isActive ? 'active' : ''}`}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{
                                fontSize: 18,
                                transform: `rotate(${angle * 180 / Math.PI + 90}deg) scale(${isActive ? 1.35 : 1})`,
                                transformOrigin: `${x}px ${y}px`,
                                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            {slide.name}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
}

export default function Home() {
    const scrollerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState('next');
    const [imageWidth, setImageWidth] = useState(window.innerWidth / 3);

    // Update image width on window resize
    useEffect(() => {
        const handleResize = () => {
            setImageWidth(window.innerWidth / 3);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-advance slider with infinite loop
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isTransitioning) {
                setDirection('next');
                setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [isTransitioning]);

    // Update transform for smooth scrolling
    useEffect(() => {
        if (scrollerRef.current) {
            const gapWidth = 20; // 20px gap between images
            const totalItemWidth = imageWidth + gapWidth;
            const scrollPosition = currentIndex * totalItemWidth;
            scrollerRef.current.style.transform = `translateX(-${scrollPosition}px)`;
        }
    }, [currentIndex, imageWidth]);



    const nextSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setDirection('next');
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);

            setTimeout(() => {
                setIsTransitioning(false);
            }, 600);
        }
    };

    const prevSlide = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setDirection('prev');
            setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);

            setTimeout(() => {
                setIsTransitioning(false);
            }, 600);
        }
    };

    return (
        <div className="home-container">
            <div className="circle-background-left"></div>
            <div className="circle-background-right"></div>

            {/* Logo text positioned absolutely */}
            <div className="home-logo-text">
                <img src={logoText} alt="Logo Text" className="home-logo-text-background" />
            </div>

            <div className="slider-container">
                <div className="top-ellipse">
                    <svg className="ellipse-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 1920 147">
                        <ellipse cx="960" cy="73.5" fill="#111214" rx="960" ry="73.5" />
                    </svg>
                </div>

                <div className="image-scroller-wrapper">
                    <div className="image-scroller-container">
                        <div ref={scrollerRef} className="image-scroller" style={{ width: `${slides.length * (imageWidth + 20)}px` }}>
                            {[...slides, ...slides, ...slides].map((slide, index) => (
                                <div key={`${index}-${slide.id}`} className="image-slide" style={{ width: `${imageWidth}px`, backgroundImage: `url('${slide.img}')` }} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bottom-ellipse">
                    <svg className="ellipse-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 1920 147">
                        <ellipse cx="960" cy="73.5" fill="#111214" rx="960" ry="73.5" />
                    </svg>
                </div>
            </div>

            <div className="circular-progress-container">
                <button className="slider-nav-btn slider-prev-btn" onClick={prevSlide} disabled={isTransitioning}>
                    <img src={prevIcon} alt="Previous" className="slider-nav-icon" />
                </button>
                <CircularProgress currentIndex={currentIndex} totalSlides={slides.length} />
                <button className="slider-nav-btn slider-next-btn" onClick={nextSlide} disabled={isTransitioning}>
                    <img src={nextIcon} alt="Next" className="slider-nav-icon" />
                </button>
            </div>
        </div>
    );
} 

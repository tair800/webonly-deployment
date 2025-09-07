import React, { useState, useEffect } from 'react';
import ServiceCard3D from './components/ServiceCard3D';
import Spline from '@splinetool/react-spline';
import './Services.css';

function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [splineError, setSplineError] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/services');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setServices(data);
        } catch (err) {
            console.error('Error fetching services:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="services-container">
                <div className="services-center">
                    <div>Loading services...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="services-container">
                <div className="services-center">
                    <div>Error loading services: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="services-container">
            <div className="services-circle-background-1"></div>
            <div className="services-circle-background-2"></div>
            <div className="services-circle-background-3"></div>

            <div className="services-center">
                <div className="services-rainbow">
                    {!splineError ? (
                        <Spline
                            scene="https://prod.spline.design/mP2TljaQ-tsNIzZt/scene.splinecode"
                            onError={(error) => {
                                setSplineError(true);
                            }}
                        />
                    ) : (
                        <div className="spline-fallback">
                            <img src="/assets/rainbow.png" alt="Rainbow" />
                        </div>
                    )}
                </div>

                <div className="services-grid-3d">
                    {services.map((service) => (
                        <div key={service.id} className="service-card-3d-wrapper">
                            <ServiceCard3D service={service} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Services;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServiceDetail.css';

const API = 'http://localhost:5000/api';

function ServiceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentService, setCurrentService] = useState({});
    const [allServices, setAllServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const resolveUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('/uploads/')) return `http://localhost:5000${url}`;
        return url;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch all services for sidebar navigation
                const servicesRes = await fetch(`${API}/services`);
                if (!servicesRes.ok) throw new Error('Failed to load services');
                const servicesData = await servicesRes.json();
                setAllServices(servicesData);

                // Fetch current service details
                const serviceRes = await fetch(`${API}/services/${id}`);
                if (!serviceRes.ok) throw new Error('Failed to load service');
                const serviceData = await serviceRes.json();
                setCurrentService(serviceData);
            } catch (e) {
                console.error('Error fetching data:', e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Show loading state
    if (loading) {
        return (
            <div className="service-detail-container">
                <div className="service-detail-content">
                    <div className="service-detail-center">
                        <h2>Yüklənir...</h2>
                    </div>
                </div>
            </div>
        );
    }

    // Show error state
    if (error || !currentService) {
        return (
            <div className="service-detail-container">
                <div className="service-detail-content">
                    <div className="service-detail-center">
                        <h2>Xəta: {error || 'Xidmət tapılmadı'}</h2>
                    </div>
                </div>
            </div>
        );
    }


    function Icon({ isActive }) {
        return (
            <div className="icon-container" data-name="Icon">
                <img
                    height="41"
                    src={isActive ? "/assets/services-active.png" : "/assets/services-deac.png"}
                    width="41"
                    alt="Icon"
                />
            </div>
        );
    }

    function Background({ isActive }) {
        return (
            <div className="background" data-name="Background">
                <div className="background-inner">
                    <div className="icon-flip">
                        <Icon isActive={isActive} />
                    </div>
                </div>
            </div>
        );
    }

    function Link({ service, isActive }) {
        return (
            <div className="link-container" data-name="Link" onClick={() => navigate(`/services/${service.id}`)}>
                <div className="link-text">
                    <p className="adjustLetterSpacing">
                        {service.subtitle}
                    </p>
                </div>
                <Background isActive={isActive} />
                <div className="side-indicator" data-name="Background" />
            </div>
        );
    }

    function Item({ service, isActive }) {
        return (
            <div className="item-container" data-name="Item">
                <div aria-hidden="true" className="item-border" />
                <Link service={service} isActive={isActive} />
            </div>
        );
    }

    function Icon1({ isActive }) {
        return (
            <div className="icon-container-small" data-name="Icon">
                <img
                    height="36"
                    src={isActive ? "/assets/services-active.png" : "/assets/services-deac.png"}
                    width="36"
                    alt="Icon"
                />
            </div>
        );
    }

    function Link1({ service, isActive }) {
        return (
            <div className="link-container-inactive" data-name="Link" onClick={() => navigate(`/services/${service.id}`)}>
                <div className="link-text-inactive">
                    <p className="adjustLetterSpacing">
                        {service.subtitle}
                    </p>
                </div>
                <div className="icon-wrapper">
                    <div className="icon-flip">
                        <Icon1 isActive={isActive} />
                    </div>
                </div>
                <div className="side-indicator-white" data-name="Background" />
            </div>
        );
    }

    function Item1({ service, isActive }) {
        return (
            <div className="item-container item-inactive" data-name="Item">
                <div aria-hidden="true" className="item-border" />
                <Link1 service={service} isActive={isActive} />
            </div>
        );
    }

    function List() {
        return (
            <div className="list-container" data-name="List">
                {allServices.map((service) => {
                    const isActive = service.id === parseInt(id);

                    if (isActive) {
                        return <Item key={service.id} service={service} isActive={isActive} />;
                    } else {
                        return <Item1 key={service.id} service={service} isActive={isActive} />;
                    }
                })}
            </div>
        );
    }

    function Aside() {
        return (
            <div className="aside-container" data-name="Aside">
                <List />
            </div>
        );
    }

    return (
        <div className="service-detail-container">
            {/* Circle Background Element */}
            <div className="service-detail-circle-background-right"></div>

            <div className="service-detail-content">
                <div className="service-detail-left">
                    <h3 className="service-detail-sidebar-title">Xidmətlərimiz</h3>
                    <div className="list-container">
                        <Aside />
                    </div>
                </div>
                <div className="service-detail-right">
                    <div className="service-detail-content-area">
                        <img
                            src={resolveUrl(currentService.detailImage)}
                            alt={currentService.name}
                            className="service-detail-image"
                        />
                    </div>
                    <h1 className="service-detail-title">{currentService.name}</h1>
                    {currentService.description && (
                        <p className="service-detail-description">{currentService.description}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ServiceDetail; 

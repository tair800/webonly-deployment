import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SimilarEquipmentCard from './components/SimilarEquipmentCard';
import './EquipmentDetail.css';

function EquipmentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const [equipment, setEquipment] = useState(null);
    const [similarEquipment, setSimilarEquipment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [similarCurrentPage, setSimilarCurrentPage] = useState(0);

    const resolveUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;

        // Map database upload paths to local assets
        if (url.includes('equipment1.png')) {
            return '/assets/equipment1.png';
        }
        if (url.includes('equipment2.png')) {
            return '/assets/equipment2.png';
        }

        // For other uploads, try the API server
        if (url.startsWith('/uploads/') || url.startsWith('/assets/')) {
            return `http://localhost:5000${url}`;
        }
        return url;
    };

    // Fetch equipment detail
    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:5000/api/equipment/${id}`);
                if (!res.ok) throw new Error('Failed to load equipment');
                const data = await res.json();

                // Process features
                const features = data.features || [];

                // Process specifications
                const specifications = data.specifications || {};

                setEquipment({
                    ...data,
                    features: features,
                    specifications: specifications
                });
                setLoading(false);
            } catch (e) {
                setError(e.message);
                setLoading(false);
            }
        };
        fetchEquipment();
    }, [id]);

    // Fetch similar equipment
    useEffect(() => {
        const fetchSimilarEquipment = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/equipment');
                if (!res.ok) throw new Error('Failed to load similar equipment');
                const data = await res.json();

                // Filter out current equipment only
                const filtered = data.filter(item => item.id !== parseInt(id));

                // Use all available equipment (no artificial limit)
                setSimilarEquipment(filtered);
            } catch (e) {
                // Error handling for similar equipment fetch
            }
        };

        if (equipment) {
            fetchSimilarEquipment();
        }
    }, [equipment, id]);

    // Handle similar equipment scroll
    const handleSimilarScroll = (event) => {
        const container = event.target;
        const scrollLeft = container.scrollLeft;
        const pageWidth = 5 * 270; // 5 cards per page * (250px + 20px gap)
        const currentPageIndex = Math.round(scrollLeft / pageWidth);
        setSimilarCurrentPage(Math.max(0, Math.min(currentPageIndex, totalSimilarPages - 1)));
    };

    // Calculate total pages for similar equipment (5 cards per page)
    const totalSimilarPages = Math.ceil(similarEquipment.length / 5);

    // Handle dot click navigation
    const handleDotClick = (pageIndex) => {
        const container = document.querySelector('.similar-equipment-cards');
        if (container) {
            const scrollPosition = pageIndex * (5 * 270); // 5 cards per page * (250px + 20px gap)
            container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            setSimilarCurrentPage(pageIndex);
        }
    };



    if (loading) {
        return (
            <div className="equipment-detail-container">
                <div className="equipment-detail-center">
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="equipment-detail-container">
                <div className="equipment-detail-center">
                    <h2>Error: {error}</h2>
                    <button onClick={() => navigate('/equipment')} className="back-btn">
                        Back to Equipment
                    </button>
                </div>
            </div>
        );
    }

    if (!equipment) {
        return (
            <div className="equipment-detail-container">
                <div className="equipment-detail-center">
                    <h2>Equipment not found</h2>
                    <button onClick={() => navigate('/equipment')} className="back-btn">
                        Back to Equipment
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="equipment-detail-container">
            <div className="equipment-detail-circle-background-1"></div>
            <div className="equipment-detail-circle-background-2"></div>
            <div className="equipment-detail-circle-background-3"></div>
            <div className="equipment-detail-circle-background-4"></div>

            <div className="equipment-detail-content">
                <div className="equipment-detail-left">
                    <h1 className="equipment-detail-title">{equipment.name}</h1>
                    <p className="equipment-detail-description">{equipment.description}</p>
                    <div className="equipment-detail-features">
                        {equipment.features.map((featureObj, index) => (
                            <div key={index} className="equipment-feature-item">
                                <div className="feature-checkmark">✓</div>
                                <span className="feature-text">{featureObj.feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="equipment-detail-right">
                    <div className="equipment-image-container">
                        <img src={resolveUrl(equipment.imageUrl)} alt={equipment.name} className="equipment-detail-image" />
                    </div>
                </div>
            </div>

            <div className="equipment-detail-team-header">
                <div className="equipment-detail-team-title">Xüsusiyyətlər</div>
                <div className="equipment-detail-team-nav">
                    <div className="equipment-detail-team-nav-dot equipment-detail-team-nav-dot-faded"></div>
                    <div className="equipment-detail-team-nav-dot equipment-detail-team-nav-dot-gradient"></div>
                    <div className="equipment-detail-team-divider"></div>
                    <div className="equipment-detail-team-bar"></div>
                </div>
            </div>

            <div className="equipment-specifications-section">
                <div className="equipment-specifications-header">
                    <div className="equipment-model">{equipment.version || equipment.core || 'Model'}</div>
                    {equipment.specifications && Object.keys(equipment.specifications).length > 6 && (
                        <button className="equipment-detail-nav-button" onClick={() => setCurrentPage(currentPage === 0 ? 1 : 0)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: currentPage === 1 ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="equipment-specifications-list">
                    {equipment.specifications && equipment.specifications.length > 0 ? (
                        equipment.specifications
                            .filter(spec => spec.key !== 'model' && spec.value && spec.value.trim() !== '')
                            .slice(currentPage * 6, (currentPage * 6) + 6)
                            .map((spec) => {
                                const parts = spec.value.split(' - ');
                                const topValue = parts[0];
                                const bottomValue = parts[1] || '';

                                return (
                                    <div key={spec.id} className="specification-item">
                                        <div className="spec-label">{spec.key}</div>
                                        <div className="spec-line-css"></div>
                                        <div className="spec-value">
                                            <div className="spec-value-top">{topValue}</div>
                                            {bottomValue && <div className="spec-value-bottom">{bottomValue}</div>}
                                        </div>
                                    </div>
                                );
                            })
                    ) : (
                        <div className="text-center text-muted py-4">
                            No specifications available
                        </div>
                    )}
                </div>
            </div>

            <div className="equipment-detail-team-header">
                <div className="equipment-detail-team-title">Oxşar avadanlıqlar</div>
                <div className="equipment-detail-team-nav">
                    <div className="equipment-detail-team-nav-dot equipment-detail-team-nav-dot-faded"></div>
                    <div className="equipment-detail-team-nav-dot equipment-detail-team-nav-dot-gradient"></div>
                    <div className="equipment-detail-team-divider"></div>
                    <div className="equipment-detail-team-bar"></div>
                </div>
            </div>

            <div className="similar-equipment-scroller">
                <div className="similar-equipment-cards" onScroll={handleSimilarScroll}>
                    {similarEquipment.map((item, index) => (
                        <SimilarEquipmentCard key={item.id} equipment={item} />
                    ))}
                </div>

                {/* Dynamic Dot Navigation */}
                {totalSimilarPages > 1 && (
                    <div className="similar-equipment-dots">
                        {Array.from({ length: totalSimilarPages }, (_, index) => (
                            <div
                                key={index}
                                className={`similar-equipment-dot ${index === similarCurrentPage ? 'similar-equipment-dot-active' : ''}`}
                                onClick={() => handleDotClick(index)}
                            ></div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EquipmentDetail; 

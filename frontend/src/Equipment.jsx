import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import LazySpline from './components/LazySpline';
import OptimizedImage from './components/OptimizedImage';
import FiltersComponent from './components/FiltersComponent';
import EquipmentCard from './components/EquipmentCard';
import MemoryCleanupButton from './components/MemoryCleanupButton';
import { memoryManager } from './utils/memoryManager';
import './Equipment.css';

function Equipment() {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideDirection, setSlideDirection] = useState(null);
    const [isSliding, setIsSliding] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStartY, setTouchStartY] = useState(null);
    const [lastScrollTime, setLastScrollTime] = useState(0);

    const [equipmentList, setEquipmentList] = useState([]);
    const [filteredEquipment, setFilteredEquipment] = useState([]);
    const [currentFilters, setCurrentFilters] = useState({
        categories: [],
        tags: [],
        search: ''
    });
    const [isSearching, setIsSearching] = useState(false);
    const timeoutRef = useRef(null);

    const slideDuration = 300;

    const resolveUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('/uploads/') || url.startsWith('/assets/')) {
            return `http://localhost:5000${url}`;
        }
        return url;
    };

    const currentItem = equipmentList[currentIndex] || {};
    const hasMultipleImages = false;
    const currentImage = resolveUrl(currentItem.imageUrl);

    const handleMoreClick = () => {
        if (currentItem?.id) navigate(`/equipment/${currentItem.id}`);
    };

    const handleFilterChange = async (filters) => {
        setCurrentFilters(filters);
        setIsSearching(true);
        console.log('Filters changed:', filters); // Debug log

        try {
            // Apply client-side filtering for categories and tags
            let filtered = equipmentList;

            // Filter by categories
            if (filters.categories && filters.categories.length > 0) {
                filtered = filtered.filter(equipment =>
                    equipment.categories &&
                    equipment.categories.some(cat => cat.id === filters.categories[0])
                );
                console.log(`After category filtering: ${filtered.length} items`);
            }

            // Filter by tags
            if (filters.tags && filters.tags.length > 0) {
                filtered = filtered.filter(equipment =>
                    equipment.tags &&
                    filters.tags.every(selectedTagId =>
                        equipment.tags.some(tag => tag.id === selectedTagId)
                    )
                );
                console.log(`After tag filtering: ${filtered.length} items`);
            }

            // If there's a search term, use API search
            if (filters.search && filters.search.trim() !== '') {
                const searchUrl = `http://localhost:5000/api/equipment/search?q=${encodeURIComponent(filters.search.trim())}`;
                console.log('Searching API:', searchUrl); // Debug log

                const response = await fetch(searchUrl);
                if (!response.ok) {
                    throw new Error(`Search failed: ${response.status}`);
                }

                const searchResults = await response.json();
                console.log(`Search results: ${searchResults.length} items found`); // Debug log

                // Apply category and tag filters to search results
                let searchFiltered = searchResults;

                // Filter by categories
                if (filters.categories && filters.categories.length > 0) {
                    searchFiltered = searchFiltered.filter(equipment =>
                        equipment.categories &&
                        equipment.categories.some(cat => cat.id === filters.categories[0])
                    );
                }

                // Filter by tags
                if (filters.tags && filters.tags.length > 0) {
                    searchFiltered = searchFiltered.filter(equipment =>
                        equipment.tags &&
                        filters.tags.every(selectedTagId =>
                            equipment.tags.some(tag => tag.id === selectedTagId)
                        )
                    );
                }

                setFilteredEquipment(searchFiltered);
            } else {
                // No search term, just apply category and tag filters
                setFilteredEquipment(filtered);
            }

        } catch (error) {
            console.error('Search error:', error);
            // Fallback to client-side filtering if API fails
            let filtered = equipmentList;

            // Filter by categories
            if (filters.categories && filters.categories.length > 0) {
                filtered = filtered.filter(equipment =>
                    equipment.categories &&
                    equipment.categories.some(cat => cat.id === filters.categories[0])
                );
            }

            // Filter by tags
            if (filters.tags && filters.tags.length > 0) {
                filtered = filtered.filter(equipment =>
                    equipment.tags &&
                    filters.tags.every(selectedTagId =>
                        equipment.tags.some(tag => tag.id === selectedTagId)
                    )
                );
            }

            // Filter by search term - only search by name
            if (filters.search && filters.search.trim() !== '') {
                const searchTerm = filters.search.toLowerCase().trim();
                filtered = filtered.filter(equipment => {
                    const name = equipment.name?.toLowerCase() || '';
                    return name.includes(searchTerm);
                });
            }

            setFilteredEquipment(filtered);
        } finally {
            setIsSearching(false);
        }
    };

    const startSlide = (direction) => {
        if (isSliding) return;
        setSlideDirection(direction);
        setIsSliding(true);

        timeoutRef.current = setTimeout(() => {
            setCurrentIndex((prev) => {
                if (!equipmentList.length) return 0;
                if (direction === 'left') {
                    return prev === equipmentList.length - 1 ? 0 : prev + 1;
                } else {
                    return prev === 0 ? equipmentList.length - 1 : prev - 1;
                }
            });
            setSlideDirection(null);
            setIsSliding(false);
        }, slideDuration);
    };

    const getSlideStyle = () => {
        if (!slideDirection) return {};
        const distance = slideDirection === 'left' ? '-100%' : '100%';
        return {
            transform: `translateX(${distance})`,
            transition: `transform ${slideDuration}ms ease-in-out`,
        };
    };

    const resetSlideStyle = () => ({
        transform: 'translateX(0)',
        transition: `transform ${slideDuration}ms ease-in-out`,
    });

    const handleScrollerTouchStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!hasMultipleImages) return;
        const touch = e.touches[0];
        setTouchStartY(touch.clientY);
    };

    const handleScrollerTouchMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!hasMultipleImages || !touchStartY) return;
    };

    const handleScrollerTouchEnd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setTouchStartY(null);
    };

    useEffect(() => {
        let isMounted = true;

        const fetchEquipment = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/equipment/full');
                if (!res.ok) throw new Error('Failed to load equipment');
                const data = await res.json();

                if (isMounted) {
                    console.log('Fetched equipment data:', data);
                    console.log('First equipment item:', data[0]);
                    if (data[0]) {
                        console.log('Categories:', data[0].categories);
                        console.log('Tags:', data[0].tags);
                    }
                    setEquipmentList(data);
                    setFilteredEquipment(data);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchEquipment();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        setCurrentImageIndex(0);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex]);

    // Memory monitoring
    useEffect(() => {
        const memoryCheckInterval = setInterval(() => {
            if (memoryManager.isMemoryUsageHigh()) {
                console.warn('High memory usage detected');
                // Optionally clear caches or show warning to user
            }
        }, 30000); // Check every 30 seconds

        return () => {
            clearInterval(memoryCheckInterval);
        };
    }, []);

    const handleEquipmentCardClick = (equipmentId) => {
        navigate(`/equipment/${equipmentId}`);
    };

    return (
        <div className="equipment-container">
            <div className="equipment-circle-background-left-1"></div>
            <div className="equipment-circle-background-left-2"></div>
            <div className="equipment-circle-background-left-3"></div>
            <div className="equipment-circle-background-left-4"></div>

            <div className="equipment-center">
                <div className="equipment-rainbow">
                    <LazySpline
                        scene="https://prod.spline.design/mP2TljaQ-tsNIzZt/scene.splinecode"
                        fallbackImage="/assets/rainbow.png"
                        className="equipment-spline"
                    />
                </div>
            </div>

            <div className="equipment-content-row">
                {/* Main Content Area */}
                <div className="equipment-main-content">
                    <div className="equipment-left">
                        <div className="equipment-square" style={slideDirection ? getSlideStyle() : resetSlideStyle()} onTouchStart={handleScrollerTouchStart} onTouchMove={handleScrollerTouchMove} onTouchEnd={handleScrollerTouchEnd}>
                            <div className="equipment-square-content">
                                <div className="equipment-product-title">
                                    {(currentItem.name || '').split(' ').slice(0, -1).join(' ')}<br />
                                    {(currentItem.name || '').split(' ').slice(-1)}
                                </div>
                                <div className="equipment-product-model blue">{currentItem.version}</div>
                                <div className="equipment-product-cpu">{currentItem.core}</div>
                                <button className="equipment-more-btn" onClick={handleMoreClick}>Daha çox</button>
                            </div>
                        </div>
                    </div>

                    <div className="equipment-right">
                        <div className="equipment-img-wrapper" style={slideDirection ? getSlideStyle() : resetSlideStyle()}>
                            <div className="equipment-title-left">
                                <div className="equipment-product-id">{currentItem.id}</div>
                                {currentItem.name}
                            </div>
                            <button className="equipment-nav-btn prev-btn" onClick={() => startSlide('right')}>&#60;</button>
                            {currentImage && <OptimizedImage src={currentImage} alt={currentItem.name} className="equipment-main-img" onClick={() => setShowModal(true)} lazy={false} />}
                            <button className="equipment-nav-btn next-btn" onClick={() => startSlide('left')}>&#62;</button>
                        </div>

                        <div className="equipment-details" style={slideDirection ? getSlideStyle() : resetSlideStyle()}>
                            <div className="equipment-cpu">{currentItem.core}</div>
                            <div className="equipment-model">{currentItem.version}</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Left Sidebar + Right Content */}
                <div className="equipment-bottom-section">
                    {/* Left Sidebar - Filters */}
                    <div className="equipment-sidebar">
                        <FiltersComponent onFilterChange={handleFilterChange} />
                        <MemoryCleanupButton className="equipment-memory-cleanup" />
                    </div>

                    {/* Right Content Area */}
                    <div className="equipment-right-content">
                        <div className="equipment-cards-container">
                            <div className="equipment-cards-heade">
                                {currentFilters.categories.length > 0 || currentFilters.tags.length > 0 || currentFilters.search ? (
                                    <div className="active-filters">
                                        <span>Active filters:</span>
                                        {currentFilters.categories.length > 0 && (
                                            <span className="filter-badge">Category: {currentFilters.categories.length}</span>
                                        )}
                                        {currentFilters.tags.length > 0 && (
                                            <span className="filter-badge">Tags: {currentFilters.tags.length}</span>
                                        )}
                                        {currentFilters.search && (
                                            <span className="filter-badge">Search: "{currentFilters.search}"</span>
                                        )}
                                    </div>
                                ) : null}
                            </div>

                            {filteredEquipment.length === 0 ? (
                                <div className="no-equipment-found">
                                    <p>No equipment found matching your filters.</p>
                                    <button
                                        className="clear-filters-btn"
                                        onClick={() => handleFilterChange({ categories: [], tags: [], search: '' })}
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="equipment-cards-grid">
                                    {filteredEquipment.map(equipment => (
                                        <EquipmentCard
                                            key={equipment.id}
                                            equipment={equipment}
                                            onMoreClick={handleEquipmentCardClick}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showModal && currentImage && (
                <div className="equipment-modal" onClick={() => setShowModal(false)}>
                    <OptimizedImage src={currentImage} alt={currentItem.name} className="equipment-modal-img" lazy={false} />
                </div>
            )}
        </div>
    );
}

export default Equipment;

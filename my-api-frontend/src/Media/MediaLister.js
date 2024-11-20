import React, { useState, useEffect } from 'react';
import MediaService from './MediaService'; // Adjust based on your project structure
import ListHeader from '../components/ListHeader';

const MEDIA_TYPES = ['DVD', 'VHS', 'BluRay', 'CD', 'Vinyl', 'Cassette', 'Digital', 'Other'];
const indexToMediaType = (index) => MEDIA_TYPES[index];

// Filter logic
const filterMediaList = (medias, filters) => {
    let filtered = [...medias];

    if (filters.name) {
        filtered = filtered.filter(media =>
            media.name.toLowerCase().includes(filters.name.toLowerCase())
        );
    }

    if (filters.description) {
        filtered = filtered.filter(media =>
            media.description.toLowerCase().includes(filters.description.toLowerCase())
        );
    }

    if (filters.genre) {
        filtered = filtered.filter(media =>
            media.genre.toLowerCase().includes(filters.genre.toLowerCase())
        );
    }

    if (filters.rating) {
        filtered = filtered.filter(media => {
            return filters.ratingComparison === 'greater'
                ? media.rating >= parseFloat(filters.rating)
                : media.rating <= parseFloat(filters.rating);
        });
    }

    if (filters.type.length > 0) {
        filtered = filtered.filter(media =>
            filters.type.includes(String(media.type)) // Check if media's type is selected
        );
    }

    if (filters.duration) {
        filtered = filtered.filter(media => {
            return filters.durationComparison === 'greater'
                ? media.duration >= parseInt(filters.duration)
                : media.duration <= parseInt(filters.duration);
        });
    }

    if (filters.stock) {
        filtered = filtered.filter(media => media.stock > 0);
    }

    return filtered;
};

// Sort logic
const sortMediaList = (medias, sortConfig) => {
    const sorted = [...medias];
    const { key, direction } = sortConfig;

    return sorted.sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
    });
};

const TableRow = ({ media, onEdit, onDelete }) => (
    <div className="table-row">
        <div className="form-field">{media.name}</div>
        <div className="form-field">{media.description}</div>
        <div className="form-field">{media.genre}</div>
        <div className="form-field">{media.rating}</div>
        <div className="form-field">{indexToMediaType(media.type)}</div>
        <div className="form-field">{media.duration}</div>
        <div className="form-field">{media.stock}</div>
        <div className="form-buttons">
            <button className="modify-button" onClick={() => onEdit(media.mediaId)}>
                Edit
            </button>
            <button className="delete-button" onClick={() => onDelete(media.mediaId)}>
                Delete
            </button>
        </div>
    </div>
);

const MediaLister = () => {
    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        description: '',
        genre: '',
        rating: '',
        type: [], // Now an array to hold multiple selected types
        duration: '',
        stock: '',
        ratingComparison: 'greater',
        durationComparison: 'greater',
    });
    const [sortConfig, setSortConfig] = useState({
        key: 'name',
        direction: 'asc',
    });

    // Fetch media data on initial load
    useEffect(() => {
        MediaService.getAll()
            .then(response => {
                setMedias(response.data);
                setFilteredMedias(response.data);
            })
            .catch(error => console.error('Error fetching media:', error));
    }, []);

    // Update filtered and sorted media whenever filters or sortConfig change
    useEffect(() => {
        const filtered = filterMediaList(medias, filters);
        const sorted = sortMediaList(filtered, sortConfig);
        setFilteredMedias(sorted);
    }, [filters, sortConfig, medias]);

    const handleDelete = (mediaId) => {
        MediaService.delete(mediaId)
            .then(() => {
                setMedias(medias.filter(media => media.mediaId !== mediaId));
            })
            .catch(error => console.error('Error deleting media:', error));
    };

    const handleEdit = (mediaId) => {
        window.location.href = `/media/update/${mediaId}`;
    };

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const handleTypeSelect = (selectedTypes) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            type: selectedTypes,
        }));
    };

    const handleSortChange = (key) => {
        setSortConfig(prevConfig => {
            return prevConfig.key === key
                ? { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' }
                : { key, direction: 'asc' };
        });
    };

    return (
        <div className="list-page">
            <ListHeader
                headers={[
                    { key: 'name', label: 'Name' },
                    { key: 'description', label: 'Description' },
                    { key: 'genre', label: 'Genre' },
                    { key: 'rating', label: 'Rating' },
                    { key: 'type', label: 'Type' },
                    { key: 'duration', label: 'Duration' },
                    { key: 'stock', label: 'Stock' },
                ]}
                onFilter={handleFilterChange}
                onSort={handleSortChange}
                filters={filters}
                sortConfig={sortConfig}
                onTypeSelect={handleTypeSelect}
                indexToMediaType={indexToMediaType}
            />

            {/* Table */}
            <div className="table">
                {filteredMedias.map(media => (
                    <TableRow
                        key={media.mediaId}
                        media={media}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default MediaLister;

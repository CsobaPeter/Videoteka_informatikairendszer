import React, { useState, useEffect } from 'react';
import MediaService from './MediaService'; // Adjust the import based on your project structure
import ListHeader from '../components/ListHeader';

const MediaLister = () => {
  const [medias, setMedias] = useState([]); // Store all media
  const [filteredMedias, setFilteredMedias] = useState([]); // Store filtered and sorted media
  const [filters, setFilters] = useState({
    name: '',
    genre: '',
    rating: '',
    duration: '',
    ratingComparison: 'greater', // Default comparison: greater than
    durationComparison: 'greater' // Default comparison: greater than
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'name', // Default sort key
    direction: 'asc' // Default sort order
  });

  // Fetch all media data on initial load
  useEffect(() => {
    MediaService.getAll()
      .then(response => {
        setMedias(response.data);
        setFilteredMedias(response.data); // Initially show all medias
      })
      .catch(error => console.error(error));
  }, []);

  // Filter media based on the current filter values
  const filterMedias = () => {
    let filtered = [...medias]; // Copy the original list to avoid mutation

    if (filters.name) {
      filtered = filtered.filter(media =>
        media.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.genre) {
      filtered = filtered.filter(media =>
        media.genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }
    if (filters.rating) {
      filtered = filtered.filter(media => {
        if (filters.ratingComparison === 'greater') {
          return media.rating >= parseFloat(filters.rating);
        }
        return media.rating <= parseFloat(filters.rating);
      });
    }
    if (filters.duration) {
      filtered = filtered.filter(media => {
        if (filters.durationComparison === 'greater') {
          return media.duration >= parseInt(filters.duration);
        }
        return media.duration <= parseInt(filters.duration);
      });
    }

    return filtered;
  };

  // Sort media based on the current sort config
  const sortMedias = (medias) => {
    const sorted = [...medias];
    const { key, direction } = sortConfig;

    return sorted.sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Update filtered and sorted media
  useEffect(() => {
    let filtered = filterMedias(); // First, filter the media
    filtered = sortMedias(filtered); // Then, sort the filtered media
    setFilteredMedias(filtered); // Update the state
  }, [filters, sortConfig, medias]); // Run whenever filters or sortConfig change

  const handleDelete = (mediaId) => {
    MediaService.delete(mediaId)
      .then(() => {
        // Remove the deleted media from state (UI update)
        setMedias(medias.filter(media => media.mediaId !== mediaId));
      })
      .catch(error => console.error("Error deleting media:", error));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value
    }));
  };

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  return (
    <div className="list-page">
      <ListHeader
        headers={[
          { key: 'name', label: 'Name' },
          { key: 'genre', label: 'Genre' },
          { key: 'rating', label: 'Rating' },
          { key: 'duration', label: 'Duration' },
          { key: 'stock', label: 'Stock'}
        ]}
        onFilter={handleFilterChange}
        onSort={handleSort}
        filters={filters}
      />

      {/* Table */}
      <div className="table">
        {filteredMedias.map(media => (
          <div key={media.mediaId} className="table-row">
            <div className="form-field">{media.name}</div>
            <div className="form-field">{media.genre}</div>
            <div className="form-field">{media.rating}</div>
            <div className="form-field">{media.duration}</div>
            <div className="form-field">
              <button className="modify-button">Edit</button>
              <button className="delete-button" onClick={() => handleDelete(media.mediaId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLister;

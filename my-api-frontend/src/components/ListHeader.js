import React, { useState, useEffect } from 'react';

const ListHeader = ({ headers, onSort, onFilter, filters }) => {
    const [sortDirection, setSortDirection] = useState({});
    
    const handleSort = (key) => {
        const newDirection = sortDirection[key] === 'asc' ? 'desc' : 'asc';
        setSortDirection((prev) => ({ ...prev, [key]: newDirection }));
        onSort(key, newDirection);  // Trigger the sorting in the parent
    };

    return (
        <div className="list-header">
            {headers.map((header) => (
                <div key={header.key} className="header-cell">
                    <span>{header.label}</span>
                    <input
                        className="filter-input"
                        type="text"
                        placeholder={`Filter ${header.label}`}
                        value={filters[header.key] || ''}
                        onChange={(e) => onFilter(header.key, e.target.value)} // Handle filtering in the parent
                    />
                    {header.key === 'rating' || header.key === 'duration' ? (
                        <>
                            <select
                                className="filter-input"
                                value={filters[`${header.key}Comparison`] || 'greater'}
                                onChange={(e) => onFilter(`${header.key}Comparison`, e.target.value)}
                            >
                                <option value="greater">Greater than</option>
                                <option value="less">Less than</option>
                            </select>
                        </>
                    ) : null}
                    <button
                        className="sort-button"
                        onClick={() => handleSort(header.key)}
                    >
                        {sortDirection[header.key] === 'asc' ? '↑' : sortDirection[header.key] === 'desc' ? '↓' : '⇅'}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ListHeader;
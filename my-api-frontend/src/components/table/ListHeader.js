import React, {useContext, useState} from 'react';
import {AuthContext} from "../../UserManagement/AuthContext";
import {useNavigate} from "react-router-dom";

const ListHeader = ({
                        headers,
                        onFilter,
                        onSort,
                        filters,
                        sortConfig,
                        indexToMediaType,
                        model,
                        ghostHeaderNeeded
                    }) => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [isInStockActive, setIsInStockActive] = useState(false); // Track the toggle state for the "In Stock" button
    const [comparisonStates, setComparisonStates] = useState({}); // Store toggle states for comparison buttons
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle toggling the "In Stock" button
    const handleInStockToggle = () => {
        setIsInStockActive((prevState) => !prevState); // Toggle the button's state
        onFilter('stock', isInStockActive ? '' : 'greater'); // Send appropriate filter value to parent
    };

    // Handle toggling comparison buttons (rating/duration)
    const handleComparisonToggle = (key) => {
        const currentComparison = comparisonStates[key] || 'greater';
        const newComparison = currentComparison === 'greater' ? 'less' : 'greater';

        setComparisonStates((prevStates) => ({
            ...prevStates,
            [key]: newComparison,
        }));

        onFilter(`${key}Comparison`, newComparison); // Send the updated comparison to parent
    };

    const handleTypeSelect = (type) => {
        if (!selectedTypes.includes(type)) {
            const updatedTypes = [...selectedTypes, type];
            setSelectedTypes(updatedTypes);
            onFilter('type', updatedTypes);
        }
    };

    const handleTypeRemove = (type) => {
        const updatedTypes = selectedTypes.filter((t) => t !== type);
        setSelectedTypes(updatedTypes);

        onFilter('type', updatedTypes);
    };

    const sortButtonCreatorWithHeaderKey = (key) => {
        const isActiveSort = sortConfig.key === key;
        const direction = isActiveSort ? sortConfig.direction : null;

        return (
            <button
                className={`sort-button ${isActiveSort ? direction : ''}`}
                onClick={() => onSort(key)}
            >
                {direction === 'asc' ? '↑' : direction === 'desc' ? '↓' : '⇅'}
            </button>
        );
    };

    return (
        <div className="table-header">
            {headers.map((header) => (
                <div key={header.key} className="header-item">
                    {header.key === 'rating' || header.key === 'duration' ? (
                        <>
                            {/* Toggle Button for Comparison */}
                            <button
                                className={`comparison-button ${
                                    comparisonStates[header.key] === 'less' ? 'less' : 'greater'
                                }, comparison-button-default`}
                                onClick={() => handleComparisonToggle(header.key)}
                            >
                                {comparisonStates[header.key] === 'less'
                                    ? 'Less than'
                                    : 'Greater than'}
                            </button>
                            <input
                                className="filter-input, filter-number-input"
                                type="number"
                                value={filters[header.key] || ''}
                                onChange={(e) => onFilter(header.key, e.target.value)}
                            />
                        </>
                    ) : header.key === 'type' ? (
                        <>
                            <select
                                className="filter-input-sorter"
                                onChange={(e) => handleTypeSelect(e.target.value)}
                            >
                                <option value="-1" disabled>Select type</option>
                                <option value="0">DVD</option>
                                <option value="1">VHS</option>
                                <option value="2">BluRay</option>
                                <option value="3">CD</option>
                                <option value="4">Vinyl</option>
                                <option value="5">Cassette</option>
                                <option value="6">Digital</option>
                                <option value="7">Other</option>
                            </select>
                            <div className="selected-types">
                                {selectedTypes.map((type, index) => (
                                    <span key={index} className="selected-type">
                                        {indexToMediaType(type)}
                                        <button className='type-remove-button' onClick={() => handleTypeRemove(type)}>x</button>
                                    </span>
                                ))}
                            </div>
                        </>
                    ) : header.key === 'stock' ? (
                        <>
                            <div className="header-item">
                                <button
                                    className={`stock-button ${isInStockActive ? 'active' : ''}`}
                                    onClick={handleInStockToggle}
                                >
                                    {isInStockActive ? 'Show All' : 'In Stock'}
                                </button>
                            </div>
                        </>
                    ) : header.key === 'returned' ? (
                            <>
                                <div className="header-item">
                                    <button
                                        className={`returned-button ${isInStockActive ? 'active' : ''}`}
                                        onClick={handleInStockToggle}
                                    >
                                        {isInStockActive ? 'Show All' : 'Returned'}
                                    </button>
                                </div>
                            </>
                        ) : (
                        <>
                            <input
                                className="filter-input"
                                type="text"
                                placeholder={`Filter ${header.label}`}
                                value={filters[header.key] || ''}
                                onChange={(e) => onFilter(header.key, e.target.value)}
                            />
                        </>
                    )}
                    <div>
                        <span>{header.label}</span>
                        {sortButtonCreatorWithHeaderKey(header.key)}
                    </div>
                </div>
            ))}
            {(auth.userRole === 0 || auth.userRole === 2) ? (
                <div className="header-item">
                    <button
                        className="add-button"
                        onClick={() => navigate(`/${model}/add`)}
                    >
                        Add New
                    </button>
                </div>
            ) : (auth.userRole !== null ? (
                <div className="ghost-header">Actions</div>
                ): null)
            }

        </div>
    );
};

export default ListHeader;

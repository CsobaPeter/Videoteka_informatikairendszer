import React, { useState, useEffect, useContext } from 'react';
import ListHeader from '../components/table/ListHeader';
import { AuthContext } from "../UserManagement/AuthContext";
import MediasService from "./MediasService";
import Modal from '../components/form/Modal';
import ClientsService from "../Client/ClientsService";
import BorrowsService from "../Borrow/BorrowsService";
import {useNavigate} from "react-router-dom"; // Assuming you have a Modal component or will create one

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

const handleBookBorrow = () => {

}

const retrieveNextTimeInStock = () => {

}

const TableRow = ({ media, onEdit, onDelete, onBorrow, showBorrowButton, isAdmin, isUser, }) => (
    <div className="table-row">
        <div className="form-field">{media.name}</div>
        <div className="form-field">{media.description}</div>
        <div className="form-field">{media.genre}</div>
        <div className="form-field">{media.rating}</div>
        <div className="form-field">{indexToMediaType(media.type)}</div>
        <div className="form-field">{media.duration}</div>
        <div className="form-field">{media.stock}</div>
        {isUser && (
            <div className="form-buttons">
                {isAdmin && (
                    <>
                        <button className="modify-button" onClick={() => onEdit(media.mediaId)}>
                            Edit
                        </button>
                        <button className="delete-button" onClick={() => onDelete(media.mediaId)}>
                            Delete
                        </button>
                    </>
                )}
                {showBorrowButton && (
                    <button
                        className={`borrow-button ${media.stock === 0 ? 'disabled' : ''}`}
                        onClick={() => onBorrow(media.mediaId)}
                        disabled={media.stock === 0}
                    >
                        Borrow Now
                    </button>
                )}
                {media.stock === -1 && (
                    <div>
                        <h5>Next time in stock: {retrieveNextTimeInStock}</h5>
                        <button
                            className={"book-borrow-button"}
                            onClick={handleBookBorrow}
                        >
                            Book as soon as possible
                        </button>
                    </div>
                )}
            </div>
        )}
    </div>
);

const MediaLister = () => {
    const {auth} = useContext(AuthContext);
    const mediaService = MediasService(auth.username);
    const clientService = ClientsService(auth.username);
    const borrowService = BorrowsService(auth.username);
    const [medias, setMedias] = useState([]);
    const [filteredMedias, setFilteredMedias] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        description: '',
        genre: '',
        rating: '',
        type: [],
        duration: '',
        stock: '',
        ratingComparison: 'greater',
        durationComparison: 'greater',
    });
    const today = new Date().toISOString().slice(0, 16);
    const navigate = useNavigate();

    const [sortConfig, setSortConfig] = useState({
        key: 'name',
        direction: 'asc',
    });
    const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
    const [currentMediaId, setCurrentMediaId] = useState(null);
    const [borrowDetails, setBorrowDetails] = useState({
        borrowDate: today,
        returnDate: '',
    });

    // Fetch media data on initial load
    useEffect(() => {
        mediaService.getAll()
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
        mediaService.delete(mediaId)
            .then(() => {
                setMedias(medias.filter(media => media.mediaId !== mediaId));
            })
            .catch(error => console.error('Error deleting media:', error));
    };

    const handleEdit = (mediaId) => {
        navigate(`/media/update/${mediaId}`);
    };


    const handleBorrow = (mediaId) => {
        setCurrentMediaId(mediaId);
        setBorrowDetails({
            borrowDate: today,
            returnDate: '',
            price: 0,
        });
        setIsBorrowModalOpen(true);
    };

    const handleBorrowDetailsChange = (key, value) => {
        const updatedDetails = { ...borrowDetails, [key]: value };
        if (key === 'borrowDate' || key === 'returnDate') {
            const newReturnDate = calculateReturnDate(updatedDetails.borrowDate, updatedDetails.returnDate);
            const price = calculatePrice(currentMediaId, updatedDetails.borrowDate, newReturnDate);
            updatedDetails.price = price;
        }
        setBorrowDetails(updatedDetails);
    };

    const calculateReturnDate = (duration) => {
        const returnDate = new Date(borrowDetails.borrowDate);
        if (duration === 1) returnDate.setDate(returnDate.getDate() + 7);
        if (duration === 2) returnDate.setDate(returnDate.getDate() + 14);
        if (duration === 3) returnDate.setMonth(returnDate.getMonth() + 1);
        return returnDate.toISOString().split('T')[0];
    };

    const calculatePrice = (mediaId, borrowDate, returnDate) => {
        if (!mediaId || !borrowDate || !returnDate) return 0;

        const media = medias.find((m) => m.mediaId === mediaId);
        if (!media) return 0;

        const days = (new Date(returnDate) - new Date(borrowDate)) / (1000 * 60 * 60 * 24);

        const mediaTypeFactor = {
            0: 1.4,
            1: 1.5,
            2: 2,
            3: 1.3,
            4: 2.5,
            5: 1.1,
            6: 1.05,
            7: 1,
        }[media.type] || 0;

        return Math.round(days * mediaTypeFactor * 100) / 100;
    };

    const handleBorrowSubmit = async () => {
        try {
            const borrowData = {
                clientId: (await clientService.getidByUserName(auth.username)).data,
                mediaId: currentMediaId,
                borrowDate: borrowDetails.borrowDate,
                returnDate : borrowDetails.returnDate,
                returned: false,
                price: borrowDetails.price,
            };

            // Make the borrow request
            borrowService.create(borrowData)
                .then(() => {
                    const media = medias.find((media) => media.mediaId === borrowData.mediaId);
                    const updatedMedia = { ...media, stock: media.stock - 1 };
                    mediaService.update(borrowData.mediaId, updatedMedia)
                        .then(() => {
                            setMedias(medias.map((media) =>
                                media.mediaId === borrowData.mediaId
                                    ? { ...media, stock: media.stock - 1 }
                                    : media
                            ));
                            alert("Borrow record created successfully and stock updated.");
                        })
                        .catch((error) => alert("Failed to update stock: " + error.message));
                })
                .catch((error) => alert("Failed to create borrow record: " + error.message));

            // Reset the modal state and form
            setIsBorrowModalOpen(false);
            setBorrowDetails({ borrowDate: '', returnDate: '', price: 0 });
            alert('Borrow request created successfully!');
        } catch (error) {
            console.error('Error creating borrow:', error);
            alert('Failed to create borrow request.');
        }
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
                ? {key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'}
                : {key, direction: 'asc'};
        });
    };

    const handleReturnButtonsPressed = (duration) => {
        const newReturnDate = calculateReturnDate(duration);
        const newPrice = calculatePrice(currentMediaId, borrowDetails.borrowDate, newReturnDate);
        setBorrowDetails({
            ...borrowDetails,
            returnDate: newReturnDate,
            price: newPrice,
        });
    }

    return (
        <div className="list-page">
            <ListHeader
                headers={[
                    {key: 'name', label: 'Name'},
                    {key: 'description', label: 'Description'},
                    {key: 'genre', label: 'Genre'},
                    {key: 'rating', label: 'Rating'},
                    {key: 'type', label: 'Type'},
                    {key: 'duration', label: 'Duration'},
                    {key: 'stock', label: 'Stock'},
                ]}
                onFilter={handleFilterChange}
                onSort={handleSortChange}
                filters={filters}
                sortConfig={sortConfig}
                onTypeSelect={handleTypeSelect}
                indexToMediaType={indexToMediaType}
                model="media"
            />

            <div className="table">
                {filteredMedias.map(media => (
                    <TableRow
                        key={media.mediaId}
                        media={media}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onBorrow={handleBorrow}
                        isAdmin={(auth.userRole === 0 || auth.userRole === 2)} // Only show if userRole is '1'
                        showBorrowButton={auth.userRole === 1}
                        isUser={auth.username !== null}// Only show if userRole is '1'
                    />
                ))}
            </div>

            {isBorrowModalOpen && (
                <Modal
                    isOpen={isBorrowModalOpen}
                    title="Borrow Media"
                    onClose={() => setIsBorrowModalOpen(false)}
                    onAction={handleBorrowSubmit}
                    actionText="Submit"
                    type="add"
                >
                    <div>
                        <label>
                            Borrow Date:
                            <input
                                type="datetime-local"
                                value={borrowDetails.borrowDate}
                                onChange={(e) =>
                                    handleBorrowDetailsChange('borrowDate', e.target.value)
                                }
                            />
                        </label>
                        <label>
                            Return Date:
                            <div style={{display: "flex", gap: "10px"}}>
                                <button
                                    type="button"
                                    className={`duration-button ${borrowDetails.returnDate === "1" ? "active" : ""}`}
                                    onClick={() => handleReturnButtonsPressed(1)}
                                >
                                    1 Week
                                </button>
                                <button
                                    type="button"
                                    className={`duration-button ${borrowDetails.returnDate === "2" ? "active" : ""}`}
                                    onClick={() =>  handleReturnButtonsPressed(2)}
                                >
                                    2 Weeks
                                </button>
                                <button
                                    type="button"
                                    className={`duration-button ${borrowDetails.returnDate === "3" ? "active" : ""}`}
                                    onClick={() =>  handleReturnButtonsPressed(3)}
                                >
                                    1 Month
                                </button>
                            </div>
                        </label>
                        <div>
                            <strong>Price: ${borrowDetails.price.toFixed(2)}</strong>
                        </div>
                    </div>
                </Modal>

            )}

        </div>
    );
};

export default MediaLister;
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
    const today = new Date().toISOString().split("T")[0]; // Format today as YYYY-MM-DD
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
            borrowDate: today, // Set today's date
            returnDate: '', // Clear the return date
        });
        setIsBorrowModalOpen(true);
    };

    const calculateReturnDate = (borrowDate, duration) => {
        const date = new Date(borrowDate);
        const returnDate = new Date(date.setDate(date.getDate() + duration));

        if (duration === 1) date.setDate(returnDate.getDate() + 7);
        if (duration === 2) date.setDate(returnDate.getDate() + 14);
        if (duration === 3) date.setMonth(returnDate.getMonth() + 1);

        return returnDate.toISOString().split("T")[0];
    }

    const handleBorrowSubmit = async () => {
        try {

            const { borrowDate, returnDate } = borrowDetails;
            const borrowData = {
                clientId: (await clientService.getidByUserName(auth.username)).data,
                mediaId: currentMediaId,
                borrowDate,
                returnDate : calculateReturnDate(borrowDate, returnDate),
                returned: false,
                //hasBeenExtended: false,
            };
            console.log('Borrow data:', borrowData);

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
            setBorrowDetails({ borrowDate: '', returnDate: '' });
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
                                type="date"
                                value={borrowDetails.borrowDate}
                                onChange={(e) =>
                                    setBorrowDetails((prev) => ({
                                        ...prev,
                                        borrowDate: e.target.value,
                                    }))
                                }
                            />
                        </label>
                        <label>
                            Return Date:
                            <div style={{display: "flex", gap: "10px"}}>
                                <button
                                    type="button"
                                    className={`duration-button ${borrowDetails.returnDate === "1" ? "active" : ""}`}
                                    onClick={() =>
                                        setBorrowDetails((prev) => ({
                                            ...prev,
                                            returnDate: "1", // Set 1 Week
                                        }))
                                    }
                                >
                                    1 Week
                                </button>
                                <button
                                    type="button"
                                    className={`duration-button ${borrowDetails.returnDate === "2" ? "active" : ""}`}
                                    onClick={() =>
                                        setBorrowDetails((prev) => ({
                                            ...prev,
                                            returnDate: "2", // Set 2 Weeks
                                        }))
                                    }
                                >
                                    2 Weeks
                                </button>
                                <button
                                    type="button"
                                    className={`duration-button ${borrowDetails.returnDate === "3" ? "active" : ""}`}
                                    onClick={() =>
                                        setBorrowDetails((prev) => ({
                                            ...prev,
                                            returnDate: "3", // Set 1 Month
                                        }))
                                    }
                                >
                                    1 Month
                                </button>
                            </div>
                        </label>
                    </div>
                </Modal>

            )}

        </div>
    );
};

export default MediaLister;
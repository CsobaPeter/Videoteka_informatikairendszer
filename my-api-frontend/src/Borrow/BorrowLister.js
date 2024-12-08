import React, { useState, useEffect, useContext } from 'react';
import BorrowsService from './BorrowsService';
import ClientsService from '../Client/ClientsService';
import MediasService from '../Media/MediasService';
import ListHeader from '../components/table/ListHeader';
import { AuthContext } from "../UserManagement/AuthContext";
import '../App.css';
import {useNavigate} from "react-router-dom";
import Modal from "../components/form/Modal";


// Filter logic
const filterBorrowList = (borrows, filters) => {
    let filtered = [...borrows];

    if (filters.clientId) {
        filtered = filtered.filter(borrow =>
            borrow.clientId.toLowerCase().includes(filters.clientId.toLowerCase())
        );
    }

    if (filters.mediaId) {
        filtered = filtered.filter(borrow =>
            borrow.mediaId.toLowerCase().includes(filters.mediaId.toLowerCase())
        );
    }

    if (filters.borrowDate) {
        filtered = filtered.filter(borrow => {
            const borrowBorrowDate = new Date(borrow.borrowDate);
            const filterBorrowDate = new Date(filters.borrowDate);
            return borrowBorrowDate.getTime() === filterBorrowDate.getTime();
        });
    }

    if (filters.returnDate) {
        filtered = filtered.filter(borrow => {
            const borrowReturnDate = new Date(borrow.returnDate);
            const filterReturnDate = new Date(filters.returnDate);
            return borrowReturnDate.getTime() === filterReturnDate.getTime();
        });
    }

    if (filters.returned !== undefined) {
        filtered = filtered.filter(borrow => borrow.returned === false);
    }

    if (filters.price) {
        filtered = filtered.filter(borrow =>
            borrow.price.toString().toLowerCase().includes(filters.price.toLowerCase())
        );
    }

    return filtered;
};

// Sort logic
const sortBorrowList = (borrows, sortConfig) => {
    const sorted = [...borrows];
    const { key, direction } = sortConfig;

    return sorted.sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
    });
};

const BorrowLister = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const borrowService = BorrowsService(auth.username);
    const mediaService = MediasService(auth.username);
    const clientService = ClientsService(auth.username);
    const [borrows, setBorrows] = useState([]);
    const [medias, setMedias] = useState([]);
    const [clients, setClients] = useState([]);
    const [filteredBorrows, setFilteredBorrows] = useState([]);
    const [filters, setFilters] = useState({
        borrowId: '',
        clientId: '',
        mediaId: '',
        borrowDate: '',
        returnDate: '',
        returned: '',
        hasBeenExtended: '',
        price: '',
    });
    const [sortConfig, setSortConfig] = useState({
        key: 'clientId',
        direction: 'asc',
    });
    const [showExtendPopup, setShowExtendPopup] = useState(false);
    const [showReturnPopup, setShowReturnPopup] = useState(false);  // For Return Confirmation Popup
    const [selectedBorrowId, setSelectedBorrowId] = useState(null);

    useEffect(() => {
        if (auth.userRole === 0 || auth.userRole === 2) {
            clientService.getAll().then((response) => setClients(response.data));
            borrowService.getAll().then((response) => setBorrows(response.data));
        }
        if (auth.userRole === 1) {
            borrowService.getAllForUser(auth.username).then((response) => {
                setBorrows(response.data);
            });
        }

        mediaService.getAll().then((response) => setMedias(response.data));
    }, []);

    useEffect(() => {
        const filtered = filterBorrowList(borrows, filters);
        const sorted = sortBorrowList(filtered, sortConfig);
        setFilteredBorrows(sorted);
    }, [filters, sortConfig, borrows]);

    const getClientName = (clientId) => clients.find((client) => client.clientId === clientId)?.name || '';
    const getMediaName = (mediaId) => medias.find((media) => media.mediaId === mediaId)?.name || '';

    const handleExtendPopup = (borrowId) => {
        setSelectedBorrowId(borrowId);
        setShowExtendPopup(true);
    };

    const currentBorrow = borrows.find((b) => b.borrowId === selectedBorrowId);
    const currentPrice = currentBorrow ? currentBorrow.price : 0;


    const handleExtend = (days, newPrice) => {
        const borrow = borrows.find((b) => b.borrowId === selectedBorrowId);
        if (!borrow) return;

        const newReturnDate = new Date(borrow.returnDate);

        if (days === 1) newReturnDate.setDate(newReturnDate.getDate() + 7);
        if (days === 2) newReturnDate.setDate(newReturnDate.getDate() + 14);
        if (days === 3) newReturnDate.setMonth(newReturnDate.getMonth() + 1);

        const updatedBorrow = {
            ...borrow,
            returnDate: newReturnDate,
            price: newPrice,
            hasBeenExtended: true,
        };

        borrowService
            .update(selectedBorrowId, updatedBorrow)
            .then(() => {
                setBorrows(borrows.map((b) => (b.borrowId === selectedBorrowId ? updatedBorrow : b)));
                setShowExtendPopup(false); // Close the modal after success
            })
            .catch((error) => console.error('Error extending borrow:', error));
    };

    const calculateFuturePrice = (currentPrice, days) => {
        const priceMultiplier = {
            1: 1.3, // 10% increase for 1 week
            2: 1.5, // 20% increase for 2 weeks
            3: 2.0, // 50% increase for 1 month
        };
        return (currentPrice * priceMultiplier[days]).toFixed(2);
    };

    const handleDelete = (borrowId) => {
        borrowService.delete(borrowId)
            .then(() => {
                setBorrows(borrows.filter((borrow) => borrow.borrowId !== borrowId));
            })
            .catch((error) => console.error('Error deleting borrow:', error));
    };

    const handleEdit = (borrowId) => {
        navigate(`/borrow/update/${borrowId}`);
    };

    const handleReturnPopup = (borrowId) => {
        setSelectedBorrowId(borrowId);
        setShowReturnPopup(true);
    };

    const handleReturn = () => {
        const borrow = borrows.find((b) => b.borrowId === selectedBorrowId);

        if (!borrow) return;

        const media = medias.find((m) => m.mediaId === borrow.mediaId);
        if (media) {
            media.stock += 1; // Increase the media stock by 1
            mediaService
                .update(media.mediaId, media)  // Update media stock
                .then(() => {
                    const updatedBorrow = { ...borrow, returned: true };
                    borrowService
                        .update(borrow.borrowId, updatedBorrow)
                        .then(() => {
                            setBorrows(borrows.filter((b) => b.borrowId !== borrow.borrowId));
                            setShowReturnPopup(false);
                        })
                        .catch((error) => console.error('Error updating borrow:', error));
                })
                .catch((error) => console.error('Error updating media:', error));
        }
    };

    const handleReturnCancel = () => {
        setShowReturnPopup(false);
    };
    const handleExtendCancel = () => {
        setShowExtendPopup(false);
    }

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const handleSortChange = (key) => {
        setSortConfig((prevConfig) =>
            prevConfig.key === key
                ? { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' }
                : { key, direction: 'asc' }
        );
    };

    const dateFormatter = (date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString( 'hu-HU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    }


    return (
        <div className="list-page">
            {(auth.userRole === 0 || auth.userRole === 2) && (
                <ListHeader
                    headers={[
                        { key: 'clientId', label: 'Client Name' },
                        { key: 'mediaId', label: 'Media Name' },
                        { key: 'borrowDate', label: 'Borrow Date' },
                        { key: 'returnDate', label: 'Return Date' },
                        { key: 'price', label: 'Price' },
                    ]}
                    onFilter={handleFilterChange}
                    onSort={handleSortChange}
                    filters={filters}
                    sortConfig={sortConfig}
                    model="borrow"
                />
            )}
            {auth.userRole === 1 && (
                <ListHeader
                    headers={[
                        { key: 'mediaId', label: 'Media Name' },
                        { key: 'borrowDate', label: 'Borrow Date' },
                        { key: 'returnDate', label: 'Return Date' },
                        { key: 'price', label: 'Price' },
                    ]}
                    onFilter={handleFilterChange}
                    onSort={handleSortChange}
                    filters={filters}
                    sortConfig={sortConfig}
                />
            )}
            {filteredBorrows.map((borrow) => (
                <div className="table-row" key={borrow.borrowId}>
                    {(auth.userRole === 0 || auth.userRole === 2 )&& (
                        <div className="form-field">{getClientName(borrow.clientId)}</div>)}
                    <div className="form-field">{getMediaName(borrow.mediaId)}</div>
                    <div className="form-field">{dateFormatter(borrow.borrowDate)}</div>
                    <div className="form-field">{dateFormatter(borrow.returnDate)}</div>
                    <div className="form-field">{borrow.price}</div>
                    <div className="form-buttons">
                        {borrow.hasBeenExtended ? (
                            <button className="extend-button" disabled>
                                Extended
                            </button>
                        ) : (
                            <button
                                className="extend-button"
                                onClick={() => handleExtendPopup(borrow.borrowId)}
                            >
                                Extend Borrow
                            </button>
                        )}
                        {(auth.userRole === 0 || auth.userRole === 2)&& (
                        <button
                            className="return-button"
                            onClick={() => handleReturnPopup(borrow.borrowId)}
                        >
                            Return
                        </button>
                        )}
                        {(auth.userRole === 0 || auth.userRole === 2) && (
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(borrow.borrowId)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            ))}
            {showExtendPopup && currentBorrow && (
                <Modal
                    onAction={handleExtend}
                    onClose={handleExtendCancel}
                    type="extend"
                    isOpen={showExtendPopup}
                    actionText="Extend"
                    title="Extend Borrow"
                    message="Select the extension period for this borrow:"
                    futurePrices={{
                        oneWeek: calculateFuturePrice(currentPrice, 1),
                        twoWeeks: calculateFuturePrice(currentPrice, 2),
                        oneMonth: calculateFuturePrice(currentPrice, 3),
                    }}
                />
            )}

            {(auth.userRole === 0 || auth.userRole === 2)&& (
                <Modal
                    onAction={handleReturn}
                    onClose={handleReturnCancel}
                    type="return"
                    isOpen={showReturnPopup}
                    actionText="Return"
                    title="Return Confirmation"
                    message="Are you sure you want to return this media?"

                />
            )}
        </div>
    );
};

export default BorrowLister;
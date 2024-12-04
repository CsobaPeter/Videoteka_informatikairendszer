import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../UserManagement/AuthContext";
import BorrowsService from "./BorrowsService";
import ClientsService from "../Client/ClientsService";
import MediasService from "../Media/MediasService";
import ClientSelect from "../components/form/ClientSelect";
import MediaSelect from "../components/form/MediaSelect";
import DateInput from "../components/form/DateInput";
import Modal from "../components/form/Modal";
import { useNavigate } from "react-router-dom";

const BorrowInitiator = () => {
    const { auth } = useContext(AuthContext);
    const borrowService = BorrowsService(auth.username);
    const mediaService = MediasService(auth.username);
    const clientService = ClientsService(auth.username);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];

    const [borrow, setBorrow] = useState({
        clientId: "",
        mediaId: "",
        borrowDate: today,
        returnDate: "",
        returned: false,
        price: 0,
    });

    const [clients, setClients] = useState([]);
    const [medias, setMedias] = useState([]);
    const [selectedClient, setSelectedClient] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        clientService.getAll().then((response) => setClients(response.data));
        mediaService.getAll().then((response) => setMedias(response.data));
    }, []);

    const calculateReturnDate = (duration) => {
        const borrowDate = new Date(borrow.borrowDate);
        if (duration === "1w") borrowDate.setDate(borrowDate.getDate() + 7);
        if (duration === "2w") borrowDate.setDate(borrowDate.getDate() + 14);
        if (duration === "1m") borrowDate.setMonth(borrowDate.getMonth() + 1);
        return borrowDate.toISOString().split("T")[0];
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

    const handleBorrowDateChange = (value) => {
        setBorrow({
            ...borrow,
            borrowDate: value,
        });
    };

    const handleDurationClick = (duration) => {
        setSelectedDuration(duration);
    };

    const handleClientChange = (selected) => {
        if (selected.length > 0) {
            setBorrow({ ...borrow, clientId: selected[0].id });
            setSelectedClient(selected);
        } else {
            setBorrow({ ...borrow, clientId: "" });
            setSelectedClient([]);
        }
    };

    const handleMediaChange = (selected) => {
        if (selected.length > 0) {
            const newPrice = calculatePrice(selected[0].id, borrow.borrowDate, borrow.returnDate);
            setBorrow({ ...borrow, mediaId: selected[0].id, price: newPrice });
            setSelectedMedia(selected);
        } else {
            setBorrow({ ...borrow, mediaId: "", price: 0 });
            setSelectedMedia([]);
        }
    };

    useEffect(() => {
        if (selectedDuration) {
            const newReturnDate = calculateReturnDate(selectedDuration);
            const newPrice = calculatePrice(borrow.mediaId, borrow.borrowDate, newReturnDate);
            setBorrow({
                ...borrow,
                returnDate: newReturnDate,
                price: newPrice,
            });
        }
    }, [borrow.borrowDate, selectedDuration]); // Recalculate when borrowDate or duration changes

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!borrow.returnDate) {
            setErrorMessage("Please select a return duration.");
            return;
        }

        borrowService.create(borrow)
            .then(() => {
                const media = medias.find((media) => media.mediaId === borrow.mediaId);
                const updatedMedia = { ...media, stock: media.stock - 1 };
                mediaService.update(borrow.mediaId, updatedMedia)
                    .then(() => {
                        setMedias(medias.map((media) =>
                            media.mediaId === borrow.mediaId
                                ? { ...media, stock: media.stock - 1 }
                                : media
                        ));
                        setIsModalOpen(true);
                    })
                    .catch((error) => alert("Failed to update stock: " + error.message));
            })
            .catch((error) => alert("Failed to create borrow record: " + error.message));
    };

    const handleAddMore = () => {
        setIsModalOpen(false);
        setBorrow({
            clientId: "",
            mediaId: "",
            borrowDate: today,
            returnDate: "",
            returned: false,
            price: 0,
        });
        setSelectedDuration("");
    };

    const handleGoToClientList = () => {
        setIsModalOpen(false);
        navigate("/borrow/list");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                <ClientSelect
                    clients={clients}
                    selectedClient={selectedClient}
                    onClientChange={handleClientChange}
                />

                <MediaSelect
                    medias={medias}
                    selectedMedia={selectedMedia}
                    onMediaChange={handleMediaChange}
                />

                <DateInput
                    label="Borrow Date:"
                    value={borrow.borrowDate}
                    onChange={handleBorrowDateChange}
                />

                <div>
                    <label>Return Duration:</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                            type="button"
                            className={`duration-button ${selectedDuration === "1w" ? "active" : ""}`}
                            onClick={() => handleDurationClick("1w")}
                        >
                            1 Week
                        </button>
                        <button
                            type="button"
                            className={`duration-button ${selectedDuration === "2w" ? "active" : ""}`}
                            onClick={() => handleDurationClick("2w")}
                        >
                            2 Weeks
                        </button>
                        <button
                            type="button"
                            className={`duration-button ${selectedDuration === "1m" ? "active" : ""}`}
                            onClick={() => handleDurationClick("1m")}
                        >
                            1 Month
                        </button>
                    </div>
                </div>

                <p>Price: ${borrow.price.toFixed(2)}</p>

                <button type="submit">Initiate Borrow</button>
            </form>
            <Modal
                isOpen={isModalOpen}
                title="Success!"
                message="Your client has been added successfully."
                onAction={handleAddMore}
                actionText="Add More"
                onClose={handleGoToClientList}
                type="add"
            />
        </div>
    );
};

export default BorrowInitiator;
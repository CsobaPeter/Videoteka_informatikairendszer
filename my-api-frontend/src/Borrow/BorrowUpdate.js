import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../UserManagement/AuthContext";
import BorrowsService from "./BorrowsService";
import DateInput from '../components/form/DateInput'; // Reusable DateInput component for date fields
import Modal from '../components/form/Modal';
import ClientSelect, { ClientControlledSelection } from "../components/form/ClientSelect";
import MediaSelect, { MediaControlledSelection } from "../components/form/MediaSelect";
import ClientsService from "../Client/ClientsService";
import MediasService from "../Media/MediasService";
import { useNavigate, useParams } from "react-router-dom";

const BorrowUpdate = () => {
    const { auth } = useContext(AuthContext);
    const borrowService = BorrowsService(auth.username);
    const mediaService = MediasService(auth.username);
    const clientService = ClientsService(auth.username);
    const { id } = useParams(); // Get the borrowId from the URL params
    const navigate = useNavigate();
    const today = new Date().toISOString().split("T")[0]; // Format today as YYYY-MM-DD

    const [borrow, setBorrow] = useState({
        clientId: "",
        mediaId: "",
        borrowDate: "", // Default value; this will be replaced by fetched data
        returnDate: "",
        returned: "",

    });

    const [clients, setClients] = useState([]);
    const [medias, setMedias] = useState([]);
    const [selectedClient, setSelectedClient] = useState([]); // Ensure it's an empty array initially
    const [selectedMedia, setSelectedMedia] = useState([]); // Ensure it's an empty array initially
    const [isModalOpen, setIsModalOpen] = useState(false); // For showing success modal
    const [errorMessage, setErrorMessage] = useState("");
    const [initialClient, setInitialClient] = useState(null); // Initially set to null
    const [initialMedia, setInitialMedia] = useState(null); // Initially set to null

    // Fetch clients, medias, and borrow data on component mount
    useEffect(() => {
        console.log("Fetching clients and medias...");

        // Fetch clients and medias only once
        clientService.getAll().then((response) => {
            setClients(response.data);
            console.log("Clients fetched:", response.data); // Debugging line
        });

        mediaService.getAll().then((response) => {
            setMedias(response.data);
            console.log("Medias fetched:", response.data); // Debugging line
        });

        // Fetch the borrow data after clients and medias are set
        borrowService.getById(id)
            .then((response) => {
                setBorrow(response.data);
                console.log("Borrow data fetched:", response.data); // Debugging line
            })
            .catch((error) => console.error("Failed to fetch borrow data:", error));
    }, [id]); // Now, only run when `id` changes

    useEffect(() => {
        // This effect will run whenever the `clients`, `medias`, or `borrow` data changes
        if (clients.length > 0 && medias.length > 0 && borrow.clientId && borrow.mediaId) {
            const client = clients.find((client) => client.clientId === borrow.clientId);
            const media = medias.find((media) => media.mediaId === borrow.mediaId);

            // Debugging line to check if the client and media are found
            console.log("Client found:", client);
            console.log("Media found:", media);

            if (client && media) {
                setInitialClient(client);
                setInitialMedia(media);
                setSelectedClient([client]); // Wrap in an array
                setSelectedMedia([media]); // Wrap in an array
            } else {
                console.error("Client or Media not found!"); // Error if not found
            }
        }
    }, [clients, medias, borrow]); // Runs when clients, medias, or borrow state changes

    const handleChange = (e) => setBorrow({ ...borrow, [e.target.name]: e.target.value });

    // Update borrow state when a client is selected
    const handleClientChange = (selected) => {
        if (selected.length > 0) {
            setBorrow({ ...borrow, clientId: selected[0].id });
            setSelectedClient(selected);
        } else {
            setBorrow({ ...borrow, clientId: "" });
            setSelectedClient([]);
        }
    };

    // Update borrow state when a media is selected
    const handleMediaChange = (selected) => {
        if (selected.length > 0) {
            setBorrow({ ...borrow, mediaId: selected[0].id });
            setSelectedMedia(selected);
        } else {
            setBorrow({ ...borrow, mediaId: "" });
            setSelectedMedia([]);
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        if (borrow.returnDate < borrow.borrowDate) {
            setErrorMessage("Return date cannot be before borrow date.");
            return;
        }
        borrowService.update(id, borrow)
            .then(() => {
                setIsModalOpen(true); // Open success modal
            })
            .catch((error) => {
                console.error("Failed to update borrow:", error);
                setErrorMessage("Failed to update borrow. Please try again.");
            });
    };

    // Modal close handler
    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate('/client/list');
        // Navigate to borrow list or any other desired action
    };

    // Only render the form if the initial client and media data are available
    if (!initialClient || !initialMedia) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form className="add-form" onSubmit={handleSubmit}>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <div className="filter-container">
                    {/* Use the Typeahead for client selection with selected and onChange */}
                    <ClientControlledSelection
                        clients={clients}
                        selected={selectedClient} // Bind selected value to state
                        onClientChange={handleClientChange} // Handle selection change
                    />

                    {/* Use the Typeahead for media selection with selected and onChange */}
                    <MediaControlledSelection
                        medias={medias}
                        selected={selectedMedia} // Bind selected value to state
                        onMediaChange={handleMediaChange} // Handle selection change
                    />

                    <DateInput
                        label="Return Date:"
                        value={borrow.returnDate}
                        onChange={(value) => setBorrow({ ...borrow, returnDate: value })}
                    />
                </div>

                <button className="modify-button" type="submit" >
                    Update
                </button>
            </form>

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    title="Success!"
                    message="The borrow information has been updated successfully."
                    onAction={handleModalClose}
                    actionText="Go to Borrow List"
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
};

export default BorrowUpdate;

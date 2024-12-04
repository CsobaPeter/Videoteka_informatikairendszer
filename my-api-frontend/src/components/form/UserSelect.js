import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";

const UserSelect = ({ users, selectedUser, onUserChange }) => {
    return (
        <div>
            <label>Select User:</label>
            <Typeahead
                id="client-typeahead"
                labelKey={(option) => `${option.name}`}
                options={users.map((user) => ({ id: user.userId, name: user.username }))}
                placeholder="Search for a client..."
                onChange={onUserChange}
                selected={selectedUser}
            />
        </div>
    );
};

export default UserSelect;

// App.js
import React from "react";
import MediaLister from "../Media/MediaLister";
import MediaAdder from "../Media/MediaAdder";
import MediaUpdate from "../Media/MediaUpdate";
import ClientLister from "../Client/ClientLister";
import ClientAdder from "../Client/ClientAdder";
import ClientUpdate from "../Client/ClientUpdate";
import BorrowLister from "../Borrow/BorrowLister";
import BorrowInitiator from "../Borrow/BorrowInitiator";
import BorrowUpdate from "../Borrow/BorrowUpdate";
import Layout from "./Layout";
import Unauthorized from "./Unauthorized";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../UserManagement/ProtectedRoute";
import { AuthProvider } from "../UserManagement/AuthContext";
import HomePage from "./HomePage";
import AdminDashboard from "./AdminDashboard";
import NotFound from "./NotFound";
import RegisterUser from "../UserManagement/RegisterUser";


const routes = [
    {
        path: "/",
        element: <Layout />, // Key ensures re-mount on auth change
        children: [
            { path: "/", element: <HomePage /> },
            { path: "registerUser", element: <RegisterUser /> },
            { path: "admin/dashboard", element: <ProtectedRoute element={<AdminDashboard />} allowedRoles={[0, 2]} /> }, // Admin Dashboard route
            { path: "media/list", element: <MediaLister /> },
            { path: "media/add", element: <ProtectedRoute element={<MediaAdder />} allowedRoles={[0, 2]} /> },
            { path: "media/update/:id", element: <ProtectedRoute element={<MediaUpdate />} allowedRoles={[0, 2]} /> },
            { path: "client/list", element: <ProtectedRoute element={<ClientLister />} allowedRoles={[0, 2]} /> },
            { path: "client/add", element: <ProtectedRoute element={<ClientAdder />} allowedRoles={[2]} /> },
            { path: "client/update/:id", element: <ProtectedRoute element={<ClientUpdate />} allowedRoles={[0, 2]} /> },
            { path: "borrow/list", element: <ProtectedRoute element={<BorrowLister />} allowedRoles={[0, 1, 2]} /> },
            { path: "borrow/add", element: <ProtectedRoute element={<BorrowInitiator />} allowedRoles={[0, 2]} /> },
            { path: "borrow/update/:id", element: <ProtectedRoute element={<BorrowUpdate />} allowedRoles={[0, 2]} /> },
            { path: "unauthorized", element: <Unauthorized /> },
            { path: "*", element: <NotFound /> }, // Catch-all route for 404 Not Found
        ],
    },
];

const router = createBrowserRouter(routes);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;

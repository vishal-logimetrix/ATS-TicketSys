import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from './Layout/DashboardLayout';
import NewTicket from './Pages/NewTicket';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import "./App.css"
import NewUser from './Pages/NewUser';
import TicketDetailsModal from './Pages/TicketDetails';
import TicketHistory from './Pages/TicketHistory';
import { useEffect, useState } from 'react';




const App = () => {
  const [token, setToken] = useState(null);

    useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

    if (token === null) {
    return null; // or a loader
  }
  
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard/*"
        element={token ? <DashboardLayout /> : <Navigate to="/" />}
      >
        <Route index element={<Dashboard />} />
        {/* <Route path="tickets" element={<Ticket />} /> */}
        <Route path="tickets" element={<NewTicket />} />
        <Route path="new-user" element={<NewUser />} />
        <Route path="ticket/:id" element={<TicketDetailsModal />} />
        <Route path="history" element={<TicketHistory />} />
      </Route>
    </Routes>
  );
};

export default App;

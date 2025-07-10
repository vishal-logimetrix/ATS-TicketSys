
import "./App.css"
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './Layout/DashboardLayout';
import NewTicket from './Pages/NewTicket';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import NewUser from './Pages/NewUser';
import TicketDetailsModal from './Pages/TicketDetails';
import TicketHistory from './Pages/TicketHistory';
import ToastContainer from './components/ToastContainer';
import ProtectedRoute from './utils/ProtectedRoute';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "superadmin", "user"]} />}>
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="history" element={<TicketHistory />} />
            <Route path="ticket/:id" element={<TicketDetailsModal />} />

            {/* Admin routes only */}
            <Route element={<ProtectedRoute allowedRoles={["admin", "superadmin"]} />}>
              <Route path="tickets" element={<NewTicket />} />
              <Route path="new-user" element={<NewUser />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;

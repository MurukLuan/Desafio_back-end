import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import ClienteForm from "./pages/ClienteForm";
import ClienteList from "./pages/ClienteList";
import ClienteEdit from "./pages/ClienteEdit";
import AdminRoute from "./components/AdminRoute";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clientes"
            element={
              <ProtectedRoute>
                <ClienteList />
              </ProtectedRoute>
            }
          />

          {/* Essas duas rotas abaixo são só para ADMIN */}
          <Route
            path="/clientes/novo"
            element={
              <AdminRoute>
                <ClienteForm />
              </AdminRoute>
            }
          />
          <Route
            path="/clientes/:id/editar"
            element={
              <AdminRoute>
                <ClienteEdit />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

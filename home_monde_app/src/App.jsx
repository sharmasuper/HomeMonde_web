import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/SignIn";
import Home from "./pages/Home";
import About from "./components/About/About";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./routes/admin/AdminDashboard";
import EmployeeDashboard from "./routes/employee/EmployeeDashboard";
import { AuthProvider } from "./context/AuthContext";
import EmployeeLayout from "./pages/employee/EmployeeLayout";
import EmpProfile from "./routes/employee/EmpProfile";
import ProfileEdit from "./routes/employee/ProfileEdit";
import EmployeeList from "./routes/admin/EmployeeList";
import EmployeeDetails from "./routes/admin/EmployeeDetails";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>

          {/* Auth */}
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<SignIn />} />

          {/* 🔐 EMPLOYEE PROTECTED (ONE TIME) */}
          <Route
            path="/employee"
            element={<ProtectedRoute allowedRoles={["employee"]} />}
          >
            <Route element={<EmployeeLayout />}>
              <Route path="dashboard" element={<EmployeeDashboard />} />
              <Route path="profile" element={<EmpProfile />} />
              <Route path="profile/edit" element={<ProfileEdit />} />
              <Route path="tasks" element={<div>Tasks Page</div>} />
              <Route path="attendance" element={<div>Attendance Page</div>} />
              <Route path="settings" element={<div>Settings Page</div>} />
            </Route>
          </Route>

          {/* 🔐 ADMIN PROTECTED */}
          <Route
            path="/admin"
            element={<ProtectedRoute allowedRoles={["admin"]} />}
          >
            <Route path="dashboard" element={<AdminDashboard />} />

            <Route path="employees" element={<EmployeeList />} />
            <Route path="employees/:id" element={<EmployeeDetails />} />

            <Route path="roles" element={<div>Roles</div>} />
            <Route path="reports" element={<div>Reports</div>} />
            <Route path="settings" element={<div>settings</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

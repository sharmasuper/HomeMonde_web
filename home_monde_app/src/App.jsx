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
import ReportsPopup from "./routes/admin/reports/ReportsPopup";
import EmpReports from "./routes/employee/EmpReports";
import ReportsList from "./routes/employee/ReportsList";

import DepartmentReports from "./routes/admin/reports/DepartmentReports";
import AdminReports from "./routes/admin/reports/AdminReports";
import CreateReports from "./routes/admin/reports/CreateReports";
import EditReports from "./routes/admin/reports/EditReports";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
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
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />

          {/* 🔐 EMPLOYEE PROTECTED (ONE TIME) */}
          <Route
            path="/employee/:department"
            element={<ProtectedRoute allowedRoles={["employee"]} />}
          >
            <Route element={<EmployeeLayout />}>
              <Route path="dashboard" element={<EmployeeDashboard />} />
              <Route path="employees" element={<EmpProfile />} />
              <Route path="employees/edit" element={<ProfileEdit />} />
              <Route path="reports" element={<EmpReports />} />
              <Route path="reports/:type" element={<ReportsList />} />
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
            {/* <Route path="reports" element={<ReportsPopup />} /> */}
            <Route path="reports" element={<AdminReports />} />
            <Route
              path="/admin/reports/:type"
              element={<DepartmentReports />}
            />
            <Route path="/admin/reports/create" element={<CreateReports />} />
            <Route path="/admin/reports/edit/:id" element={<EditReports />} />
            <Route path="settings" element={<div>settings</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

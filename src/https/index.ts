import axios from "axios";
import type { LoginProps, RegisterProps } from "../types/types.js";

// Create reusable axios instance for all API calls
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  // CURRENT: Base backend URL loaded from .env
  // TODO (PRODUCTION): Ensure HTTPS + environment-specific URLs
  // Example:
  // - Development: http://localhost:8000
  // - Production: https://your-pos-backend.com

  withCredentials: true, 
  // MEANING: Send cookies + auth tokens across domains
  // TODO (PRODUCTION): Make sure backend includes:
  // - Access-Control-Allow-Credentials: true
  // - SameSite + Secure cookie settings
  
  headers: {
    "Content-Type": "application/json", 
    // MEANING: You are sending JSON body in POST/PUT

    Accept: "application/json" 
    // MEANING: You expect JSON responses from backend
    // TODO (PRODUCTION): Add support for CSV/PDF if exporting reports later
  }
});

// ---------- API ENDPOINT WRAPPERS ----------

// Login user
export const loginUser = (data: LoginProps) => 
  api.post("/api/user/login", data);
// CURRENT: POST request to login
// TODO (PRODUCTION): Add retry logic for unstable internet
// TODO (SECURITY): Do NOT log `data` as it contains passwords

// Register user
export const registerUser = (data: any) => 
  api.post("/api/user/register", data);
// TODO (PRODUCTION): Add input validation before calling API
// TODO (SECURITY): Hash passwords server-side only

// Get logged-in user data
export const getUserData = () => 
  api.get("/api/user");
// TODO (PRODUCTION): Implement access token refresh if needed
// TODO (PRODUCTION): Cache with React Query (5–30 sec)

export const logOutUser = () => api.post("/api/user/logout")

export const addTable = (data: any) => api.post("/api/table", data)
export const getTableData = () => api.get("/api/table")
export const deleteTable = (id: string) => api.delete(`/api/table/${id}`)


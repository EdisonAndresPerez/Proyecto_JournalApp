import { Routes, Route, Navigate } from "react-router-dom";
import { JournalPages } from "../pages/JournalPages.jsx";

export const JournalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<JournalPages />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

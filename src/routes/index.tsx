import { Route, Routes } from "react-router-dom";

import { Welcome } from "@/pages/welcome/welcome";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
    </Routes>
  );
};

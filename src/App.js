import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeConfig } from "./routers/RouteConfig";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routeConfig.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
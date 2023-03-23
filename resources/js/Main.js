import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/Index"
import ListVehicles from "./components/pages/ListVehicles"
import ListModels from "./components/pages/ListModels"
import ListBrands from "./components/pages/ListBrands"
import ListTypes from "./components/pages/ListTypes"
import CreateVehicle from "./components/pages/CreateVehicle"
import EditVehicle from "./components/pages/EditVehicle"
import ViewVehicle from "./components/pages/ViewVehicle"

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/"  element={<Index/>} />
                <Route path="/models"  element={<ListModels/>} />
                <Route path="/brands"  element={<ListBrands/>} />
                <Route path="/vehicles-types" element={<ListTypes/>} />
                <Route exact path="/vehicles" element={<ListVehicles/>} />
                <Route path="/create"  element={<CreateVehicle/>} />
                <Route path="/edit/:id"  element={<EditVehicle/>} />
                <Route path="/show/:id"  element={<ViewVehicle/>} />
            </Routes>
        </Router>
    );
}

export default Main;

if (document.getElementById('app')) {
    ReactDOM.render(<Main />, document.getElementById('app'));
}

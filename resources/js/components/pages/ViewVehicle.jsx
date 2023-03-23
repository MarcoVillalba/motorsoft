import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../Layout"

const ViewVehicle = () => {
    const [id, setId] = useState(useParams().id)
    const [vehicle, setVehicle] = useState({chassis:'', domain:'', kilometres:'', car_models_id:''})

    useEffect(() => {
        axios.get(`/api/vehicles/${id}`)
            .then(function (response) {
                setVehicle(response.data[0])
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Mostrar Vehículo</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-dark"
                            to="/vehicles">
                            <i className="fas fa-arrow-left"></i> Volver
                        </Link>
                    </div>
                    <div className="card-body">
                        <div className="card card-group">
                            <div className="card border-dark">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b className="text-muted">Marca</b>
                                        <p><strong>{vehicle.brand}</strong></p>
                                    </li>
                                    <li className="list-group-item">
                                        <b className="text-muted">Modelo</b>
                                        <p><strong>{vehicle.model_name}</strong></p>
                                    </li>
                                    <li className="list-group-item">
                                        <b className="text-muted">Tipo de Vehículo</b>
                                        <p><strong>{vehicle.type}</strong></p>
                                    </li>
                                </ul>
                            </div>
                            <div className="card border-dark">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b className="text-muted">Cantidad de Neumáticos</b>
                                        <p><strong>{vehicle.wheels}</strong></p>
                                    </li>
                                    <li className="list-group-item">
                                        <b className="text-muted">Color</b>
                                        <p><strong>{vehicle.color}</strong></p>

                                    </li>
                                    <li className="list-group-item">
                                        <b className="text-muted">Año</b>
                                        <p><strong>{vehicle.year}</strong></p>
                                    </li>
                                </ul>
                            </div>
                            <div className="card border-dark">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <b className="text-muted">Dominio</b>
                                        <p><strong>{vehicle.domain}</strong></p>
                                    </li>
                                    <li className="list-group-item">
                                        <b className="text-muted">Chasis</b>
                                        <p><strong>{vehicle.chassis}</strong></p>
                                    </li>
                                    <li className="list-group-item">
                                        <b className="text-muted">Kilometraje</b>
                                        <p><strong>{vehicle.kilometres}</strong></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ViewVehicle;

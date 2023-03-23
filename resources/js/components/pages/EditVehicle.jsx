import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import Layout from "../Layout"
import Swal from 'sweetalert2'

const EditVehicle = () => {
    const navigate = useNavigate();

    const [id, setId] = useState(useParams().id)
    const [model, setModel] = useState([]);
    const [year, setYear] = useState([]);
    const [color, setColor] = useState([]);
    const [brand, setBrand] = useState([])
    const [chassis, setChassis] = useState('');
    const [domain, setDomain] = useState('');
    const [kilometres, setKilometres] = useState('');
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        fetchItem()
    }, [])

    const fetchItem = () => {
        axios.get(`/api/vehicles/${id}`)
            .then(function (response) {
                let resp = response.data[0]

                setChassis(resp.chassis);
                setDomain(resp.domain);
                setKilometres(resp.kilometres);
                setModel(resp.model_name);
                setColor(resp.color);
                setYear(resp.year);
                setBrand(resp.brand);

            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ocurrió un Error!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }

    const handleSave = () => {
        setIsSaving(true);
        axios.patch(`/api/vehicles/${id}`, {
            chassis: chassis,
            domain: domain,
            kilometres: kilometres
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Vehículo actualizado de manera correcta!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                navigate('/vehicles');
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Ocurrió un error!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }


    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Editar</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-dark"
                            to="/vehicles">
                            <i className="fas fa-arrow-left"></i> Volver
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label htmlFor="brand">Marca</label>
                                <input
                                    value={brand}
                                    type="text"
                                    className="form-control"
                                    id="brand"
                                    name="brand"
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="model">Modelo</label>
                                <input
                                    value={model}
                                    type="text"
                                    className="form-control"
                                    id="model"
                                    name="model"
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="year">Año</label>
                                <input
                                    value={year}
                                    type="text"
                                    className="form-control"
                                    id="year"
                                    name="year"
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="color">Color</label>
                                <input
                                    value={color}
                                    type="text"
                                    className="form-control"
                                    id="color"
                                    name="color"
                                    disabled={true}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="chassis">Chasis</label>
                                <input
                                    onChange={(event)=>{setChassis(event.target.value)}}
                                    value={chassis}
                                    type="text"
                                    className="form-control"
                                    id="chassis"
                                    name="chassis"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="domain">Dominio</label>
                                <input
                                    onChange={(event)=>{setDomain(event.target.value)}}
                                    value={domain}
                                    type="text"
                                    className="form-control"
                                    id="domain"
                                    name="domain"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="kilometres">Kilometros</label>
                                <input
                                    onChange={(event)=>{setKilometres(event.target.value)}}
                                    value={kilometres}
                                    type="text"
                                    className="form-control"
                                    id="kilometres"
                                    name="kilometres"/>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                <i className="fas fa-save"></i> Guardar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default EditVehicle;

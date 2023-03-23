import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Layout from "../Layout"
import Swal from 'sweetalert2'

const CreateVehicle = () => {
    const navigate = useNavigate();

    const [model, setModel] = useState([]);
    const [brand, setBrand] = useState([])
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [chassis, setChassis] = useState('');
    const [domain, setDomain] = useState('');
    const [kilometres, setKilometres] = useState('');

    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        fetchBrands()
        // fetchModels()
    }, [])

    const fetchBrands = () => {
        axios.get('/api/brands')
            .then(function (response) {
                setBrands(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const fetchModels = (id) => {
        axios.get(`/api/car-models/${id}`)
            .then(function (response) {
                setModels(response.data);
            })
            .catch(function (error) {
                console.log(error);
                setModels('');
                setModel('');
            })
    }

    const handleChangeBrand = (e) => {
        setBrand(e);
        fetchModels(e);
    }

    const handleSave = () => {
        setIsSaving(true);
        axios.post('/api/vehicles', {
            car_models_id: model,
            chassis: chassis,
            domain: domain,
            kilometres: kilometres
        }).then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Vehículo creado de manera correcta!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setModel('')
            setChassis('')
            setDomain('')
            setKilometres('')
            setModels('')
            setBrands('')

            navigate('/vehicles');
        }).catch(function (error) {
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
                <h2 className="text-center mt-5 mb-3">Crear Nuevo</h2>
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
                                <select onChange={(event)=>{handleChangeBrand(event.target.value)}}
                                        className="form-select"
                                        id="brand"
                                        name="brand" >
                                    <option value="">Seleccione</option>
                                    {brands ? (
                                        brands.map((option) => (
                                                <option value={option.id} key={option.id}>{option.name}</option>
                                            )
                                        )) : ( <option value="">Seleccione</option> )}
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="model">Modelo</label>
                                <select onChange={(event)=>{setModel(event.target.value)}}
                                        className="form-select"
                                        id="model"
                                        name="model" >
                                    <option value="">Seleccione</option>
                                    {models ? (
                                        models.map((option) => (
                                        <option value={option.id} key={option.id}>
                                            {option.name} |
                                             Color: {option.color} |
                                             Year: {option.year}
                                        </option>
                                        )
                                    )) : ( <option value="">Seleccione</option> )}
                                </select>
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

export default CreateVehicle;

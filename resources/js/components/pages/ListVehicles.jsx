import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../Layout";
import Swal from 'sweetalert2';

const ListVehicles = () => {
    const [Vehicles, setVehicles] = useState([])
    const [filter, setFilter] = useState('')
    const [filterType, setFilterType] = useState('')

    useEffect(() => {
        fetchVehicles()
    }, [])

    const fetchVehicles = () => {
        axios.get('/api/vehicles')
            .then(function (response) {
                setVehicles(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleSearch = () => {

        let uri = (filterType != "" && filterType == 'brand') ? 'api/vehicles/get-by-brand' : 'api/vehicles/get-by-model';

        if(filter != ""){
            axios.get(`${uri}/${filter}`)
                .then(function (response) {
                    setVehicles(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }else{
            fetchVehicles()
        }
    }

    const handleCleanSearch = () => {
        setFilter("");
        fetchVehicles();
    }

    const handleComboChange = (e) => {
        setFilter("");
        setFilterType(e);
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Eliminar?',
            text: "Esta acción no puede deshacerse!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/vehicles/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Vehículo eliminado con éxito!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchVehicles()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ocurrió un error!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Administrar Vehículos</h2>
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <Link
                            className="btn btn-outline-dark"
                            to="/">
                            <i className="fas fa-arrow-left"></i> Volver
                        </Link>
                        <Link
                            className="btn btn-outline-dark"
                            to="/create">
                            <i className="fas fa-plus"></i> Crear nuevo
                        </Link>
                    </div>
                    <div className="card-body">
                        <form className={"form-inline d-none d-md-block"}>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="filter-label">Filtrar por</span>
                                <select onChange={(event)=>{handleComboChange(event.target.value)}}
                                        className="form-select"
                                        id="filterType"
                                        name="filterType" >
                                    <option value="">Seleccione</option>
                                    <option value="brand">Marca</option>
                                    <option value="model">Modelo</option>
                                </select>
                                <span className="input-group-text" id="basic-addon2">Filtro</span>
                                <input
                                    onChange={(event)=>{setFilter(event.target.value)}}
                                    value={filter}
                                    type="text"
                                    className="form-control"
                                    id="filter"
                                    name="filter"
                                    required
                                />
                                <button
                                    onClick={handleSearch}
                                    type="button"
                                    className="btn btn-outline-dark">
                                    <i className="fas fa-search"></i>
                                </button>
                                <button
                                    onClick={handleCleanSearch}
                                    type="button"
                                    className="btn btn-outline-dark">
                                    <i className="fas fa-sync-alt"></i>
                                </button>
                            </div>
                        </form>

                        <div className="table-responsive">
                            <table className="table table-hover table-borderless">
                                <thead className={"bg-dark text-white"}>
                                <tr className={""}>
                                    <th>#</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>N° de Chasis</th>
                                    <th>Dominio</th>
                                    <th>KM</th>
                                    <th colSpan={2} className={"text-center"} >Opciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    Vehicles ?
                                        (
                                            Vehicles.map((vehicle, key)=>{
                                                return (
                                                    <tr key={key}>
                                                        <td>{vehicle.id}</td>
                                                        <td>{vehicle.brand}</td>
                                                        <td>{vehicle.model_name}</td>
                                                        <td>{vehicle.chassis}</td>
                                                        <td>{vehicle.domain}</td>
                                                        <td>{vehicle.kilometres}</td>
                                                        <td className={"text-center d-md-inline-flex d-sm-inline-flex d-xs-inline-flex"}>
                                                            <Link
                                                                to={`/show/${vehicle.id}`}
                                                                className="btn btn-outline-secondary mx-1">
                                                                <i className="far fa-eye"></i>
                                                                <span className="btn-text d-none d-lg-inline-flex">
                                                                     Ver
                                                                </span>
                                                            </Link>
                                                            <Link
                                                                className="btn btn-outline-success mx-1"
                                                                to={`/edit/${vehicle.id}`}>
                                                                <i className="far fa-edit"></i>
                                                                <span className="btn-text d-none d-lg-inline-flex">
                                                                     Editar
                                                                </span>
                                                            </Link>
                                                            <button
                                                                onClick={()=>handleDelete(vehicle.id)}
                                                                className="btn btn-outline-danger mx-1">
                                                                <i className="fas fa-trash"></i>
                                                                <span className="btn-text d-none d-lg-inline-flex">
                                                                     Eliminar
                                                                </span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        ) :
                                        (
                                            <td colSpan="7" className="text-muted text-center">No hay registros para mostrar</td>
                                        )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ListVehicles;

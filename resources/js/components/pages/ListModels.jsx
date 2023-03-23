import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../Layout";
import Swal from 'sweetalert2';

const ListModels = () => {
    const [Models, setModels] = useState([])

    useEffect(() => {
        fetchModels()
    }, [])

    const fetchModels = () => {
        axios.get('/api/car-models')
            .then(function (response) {
                setModels(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Ver Modelos</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-dark"
                            to="/"> <i className="fas fa-arrow-left"></i> Volver
                        </Link>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover table-borderless">
                                <thead className={"bg-dark text-white"}>
                                <tr className={""}>
                                    <th>#</th>
                                    <th>Marca</th>
                                    <th>Nombre</th>
                                    <th>Color</th>
                                    <th>Año</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    Models ?
                                        (
                                            Models.map((model, key)=>{
                                                return (
                                                    <tr key={key}>
                                                        <td>{model.id}</td>
                                                        <td>{model.brand_id}</td>
                                                        <td>{model.name}</td>
                                                        <td>{model.color}</td>
                                                        <td>{model.year}</td>
                                                    </tr>
                                                )
                                            })
                                        ) :
                                        (
                                            <td colSpan="5" className="text-muted text-center">No hay registros para mostrar</td>
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

export default ListModels;

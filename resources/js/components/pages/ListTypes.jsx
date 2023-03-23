import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../Layout";

const ListTypes = () => {
    const  [Types, setTypes] = useState([])

    useEffect(() => {
        fetchTypes()
    }, [])

    const fetchTypes = () => {
        axios.get('/api/types')
            .then(function (response) {
                setTypes(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Ver Tipo de Vehículos</h2>
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
                                    <th>Nombre</th>
                                    <th>Cantidad de Neumáticos</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    Types ?
                                        (
                                            Types.map((type, key)=>{
                                                return (
                                                    <tr key={key}>
                                                        <td>{type.id}</td>
                                                        <td>{type.type}</td>
                                                        <td>{type.wheels}</td>
                                                    </tr>
                                                )
                                            })
                                        ) :
                                        (
                                            <td colSpan="3" className="text-muted text-center">No hay registros para mostrar</td>
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

export default ListTypes;

import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../Layout";
import Swal from 'sweetalert2';

const ListBrands = () => {
    const [Brands, setBrands] = useState([])

    useEffect(() => {
        fetchBrands()
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

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Ver Marcas</h2>
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
                                    <th>Tipo</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    Brands ?
                                        (
                                            Brands.map((brand, key)=>{
                                                return (
                                                    <tr key={key}>
                                                        <td>{brand.id}</td>
                                                        <td>{brand.name}</td>
                                                        <td>{brand.vehicle_types_id}</td>
                                                    </tr>
                                                )
                                            })
                                        ) :
                                        (
                                            <td colSpan="2" className="text-muted text-center">No hay registros para mostrar</td>
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

export default ListBrands;

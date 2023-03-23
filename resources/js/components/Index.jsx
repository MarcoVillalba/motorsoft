import React from 'react'
import { Link } from "react-router-dom";
import brand from "../../img/brand.webp";
import cars from "../../img/cars.webp";
import model from "../../img/model.webp";
import type from "../../img/type.webp";

const Index = () => {
    return (
        <div className="container">
            <h2 className="text-center mt-5 mb-3">Bienvenido a MotorSoft</h2>
            <div className="card">
                <div className="card-header text-center">
                    <p>
                        Laravel Project Manager
                    </p>
                </div>
                <div className="card-body">
                    <div className="row row-cols-1 row-cols-md-4 g-4 mt-3 ">
                        <div className="col">
                            <Link className="link" to='/brands'>
                                <div className="card h-100 text-white bg-dark border-light">
                                    <img src={brand} className="card-img-top" alt="brands" height={450} width={300}/>
                                    <div className="card-body">
                                        <h5 className="card-title h-title">Marcas</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link className="link" to='/models'>
                                <div className="card h-100 text-white bg-dark border-light">
                                    <img src={model} className="card-img-top" alt="brands" height={450} width={300}/>                                        <div className="card-body">
                                    <h5 className="card-title h-title">Modelos</h5>
                                </div>
                                </div>
                            </Link>
                        </div>

                        <div className="col">
                            <Link className="link" to='/vehicles'>
                                <div className="card h-100 text-white bg-dark border-light">
                                    <img src={cars} className="card-img-top" alt="brands" height={450} width={300}/>                                        <div className="card-body">
                                    <h5 className="card-title h-title">Vehículos</h5>
                                </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col">
                            <Link className="link" to='/vehicles-types'>
                                <div className="card h-100 text-white bg-dark border-light">
                                    <img src={type} className="card-img-top" alt="brands" height={450} width={300}/>                                        <div className="card-body">
                                    <h5 className="card-title h-title">Tipo de Vehículos</h5>
                                </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;

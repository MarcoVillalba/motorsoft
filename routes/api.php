<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\CarModelController;
use App\Http\Controllers\VehicleTypeController;
use App\Http\Controllers\BrandController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::resource('vehicles',VehicleController::class);
Route::resource('car-models',CarModelController::class);
Route::resource('types',VehicleTypeController::class);
Route::resource('brands',BrandController::class);

//search routes
Route::get('/vehicles/get-by-brand/{param}', [VehicleController::class, 'getByBrand']);
Route::get('/vehicles/get-by-model/{param}', [VehicleController::class, 'getByModel']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Vehicle;
use App\Models\CarModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return (DB::table('vehicles')
            ->join('car_models', 'vehicles.car_models_id', '=', 'car_models.id')
            ->join('brands', 'car_models.brand_id', '=', 'brands.id')
            ->select('vehicles.*', 'car_models.name as model_name', 'brands.name as brand' )
            ->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'car_models_id' => 'required',
            'chassis' => 'required|max:100|string',
            'domain' => 'required|max:100|string',
            'kilometres' => 'required|integer'
        ]);

        try{

            $oper = Vehicle::create([
                'car_models_id' => $request->car_models_id,
                'chassis' => $request->chassis,
                'domain' => $request->domain,
                'kilometres' => $request->kilometres
            ]);

            return response()->json(['message'=>'Vehicle Created Successfully!!']);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something goes wrong while creating a Vehicle!! '.$e->getMessage()
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function show(Vehicle $vehicle)
    {
        return (DB::table('vehicles')
            ->join('car_models', 'vehicles.car_models_id', '=', 'car_models.id')
            ->join('brands', 'car_models.brand_id', '=', 'brands.id')
            ->join('vehicle_types', 'brands.vehicle_types_id', '=', 'vehicle_types.id')
            ->select('vehicles.*', 'car_models.name as model_name', 'car_models.color', 'car_models.year',
                'brands.name as brand', 'vehicle_types.type', 'vehicle_types.wheels')
            ->where('vehicles.id', $vehicle->id)->get());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function edit(Vehicle $vehicle)
    {
     //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vehicle $vehicle)
    {
        $request->validate([
            //'car_models_id' => 'required',
            'chassis' => 'required|max:100|string',
            'domain' => 'required|max:100|string',
            'kilometres' => 'required|integer'
        ]);

        try{

            $vehicle->fill($request->post())->update();

            $vehicle->save();

            return response()->json(['message'=>'Vehicle Updated Successfully!!']);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something goes wrong while updating a Vehicle!! '.$e->getMessage()
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vehicle $vehicle)
    {
        try{

            $vehicle->delete();

            return response()->json(['message'=>'Vehicle Deleted Successfully!!']);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something goes wrong while deleting a Vehicle!! '.$e->getMessage()
            ],500);
        }
    }

    /**
     * Show results filter by Brand.
     *
     * @param  string $param
     * @return \Illuminate\Http\Response
     */
    public function getByBrand($param)
    {
        return (DB::table('vehicles')
            ->join('car_models', 'vehicles.car_models_id', '=', 'car_models.id')
            ->join('brands', 'car_models.brand_id', '=', 'brands.id')
            ->select('vehicles.*', 'car_models.name as model_name', 'brands.name as brand' )
            ->where('brands.name','like', '%'.$param.'%')->get());
    }

    /**
     * Show results filter by Model.
     *
     * @param  string $param
     * @return \Illuminate\Http\Response
     */
    public function getByModel($param)
    {
        return (DB::table('vehicles')
            ->join('car_models', 'vehicles.car_models_id', '=', 'car_models.id')
            ->join('brands', 'car_models.brand_id', '=', 'brands.id')
            ->select('vehicles.*', 'car_models.name as model_name', 'brands.name as brand' )
            ->where('car_models.name','like', '%'.$param.'%')->get());
    }
}

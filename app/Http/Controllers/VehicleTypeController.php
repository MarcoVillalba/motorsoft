<?php

namespace App\Http\Controllers;

use App\Models\VehicleType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class VehicleTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return VehicleType::select('id','type','wheels')->get();
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
          'type' => 'required|max:100|string',
          'wheels' => 'required|integer'
        ]);

        try{

            $oper = VehicleType::create(['type' => $request->type, 'wheels' => $request->wheels]);

            return response()->json(['message'=>'VehicleType Created Successfully!!']);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something goes wrong while creating a VehicleType!! '.$e->getMessage()
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\VehicleType  $vehicleType
     * @return \Illuminate\Http\Response
     */
    public function show(VehicleType $vehicleType)
    {
        return response()->json([
            'vehicleType'=>$vehicleType
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\VehicleType  $vehicleType
     * @return \Illuminate\Http\Response
     */
    public function edit(VehicleType $vehicleType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VehicleType  $vehicleType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VehicleType $vehicleType)
    {
        $request->validate([
            'type' => 'required|max:100|string',
            'wheels' => 'required|integer'
        ]);

        try{

            $vehicleType->fill($request->post())->update();

            $vehicleType->save();

            return response()->json(['message'=>'VehicleType Updated Successfully!!']);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something goes wrong while updating a VehicleType!! '.$e->getMessage()
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\VehicleType  $vehicleType
     * @return \Illuminate\Http\Response
     */
    public function destroy(VehicleType $vehicleType)
    {
        try{

            $vehicleType->delete();

            return response()->json(['message'=>'VehicleType Deleted Successfully!!']);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something goes wrong while deleting a VehicleType!! '.$e->getMessage()
            ],500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\VehicleType;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Brand::addSelect(['id','name', 'vehicle_types_id' => VehicleType::select('type')
            ->whereColumn('id', 'vehicle_types_id')
        ])->get();
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
          'name' => 'required|max:100|string'
        ]);

        try{

            $oper = Brand::create(['name' => $request->name]);

            return response()->json(['message'=>'Brand Created Successfully!!']);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something goes wrong while creating a Brand!! '.$e->getMessage()
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function show(Brand $brand)
    {
        return response()->json([
            'brand'=>$brand
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Brand $brand)
    {
        $request->validate([
            'name' => 'required|max:100|string'
        ]);

        try{

            $brand->fill($request->post())->update();

            $brand->save();

            return response()->json(['message'=>'Brand Updated Successfully!!']);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something goes wrong while updating a Brand!! '.$e->getMessage()
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Brand  $brand
     * @return \Illuminate\Http\Response
     */
    public function destroy(Brand $brand)
    {
        try{

            $brand->delete();

            return response()->json(['message'=>'Brand Deleted Successfully!!']);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something goes wrong while deleting a Brand!! '.$e->getMessage()
            ],500);
        }
    }
}

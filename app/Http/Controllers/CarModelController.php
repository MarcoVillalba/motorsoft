<?php

namespace App\Http\Controllers;

use App\Models\CarModel;
use App\Models\Brand;
use Illuminate\Http\Request;

class CarModelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CarModel::addSelect(['id','name', 'color', 'year','brand_id' => Brand::select('name')
            ->whereColumn('id', 'brand_id')
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
            'brand_id' => 'required',
            'name' => 'required|max:100|string',
            'color' => 'required|max:100|string',
            'year' => 'required|integer'
        ]);

        try{

            $oper = CarModel::create([
                'brand_id' => $request->brand_id,
                'name' => $request->name,
                'color' => $request->color,
                'year' => $request->year
            ]);

            return response()->json(['message'=>'CarModel Created Successfully!!']);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something goes wrong while creating a CarModel!! '.$e->getMessage()
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CarModel  $carModel
     * @return \Illuminate\Http\Response
     */
    public function show(CarModel $carModel)
    {
        return CarModel::Select(['id','brand_id', 'name', 'color','year'
        ])->where('brand_id', $carModel->id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CarModel  $carModel
     * @return \Illuminate\Http\Response
     */
    public function edit(CarModel $carModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CarModel  $carModel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CarModel $carModel)
    {
        $request->validate([
            'brand_id' => 'required',
            'name' => 'required|max:100|string',
            'color' => 'required|max:100|string',
            'year' => 'required|integer'
        ]);

        try{

            $carModel->fill($request->post())->update();

            $carModel->save();

            return response()->json(['message'=>'CarModel Updated Successfully!!']);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something goes wrong while updating a CarModel!! '.$e->getMessage()
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CarModel  $carModel
     * @return \Illuminate\Http\Response
     */
    public function destroy(CarModel $carModel)
    {
        try{

            $carModel->delete();

            return response()->json(['message'=>'CarModel Deleted Successfully!!']);
        }catch(\Exception $e){
            return response()->json([
                'message'=>'Something goes wrong while deleting a CarModel!! '.$e->getMessage()
            ],500);
        }
    }
}

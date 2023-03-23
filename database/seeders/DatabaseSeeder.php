<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //TYPES
        DB::table('vehicle_types')->insert([
            'type' => "Automotores",
            'wheels' => 4,
        ]);
        DB::table('vehicle_types')->insert([
            'type' => "Motocicletas",
            'wheels' => 2,
        ]);
        DB::table('vehicle_types')->insert([
            'type' => "Camiones",
            'wheels' => 6,
        ]);

        //BRANDS
        DB::table('brands')->insert([
            'name' => "Chevrolet",
            'vehicle_types_id' => 1
        ]);
        DB::table('brands')->insert([
            'name' => "Renault",
            'vehicle_types_id' => 1
        ]);
        DB::table('brands')->insert([
            'name' => "Fiat",
            'vehicle_types_id' => 1
        ]);
        DB::table('brands')->insert([
            'name' => "Honda",
            'vehicle_types_id' => 2
        ]);
        DB::table('brands')->insert([
            'name' => "Scania",
            'vehicle_types_id' => 3
        ]);

        //CAR_MODELS
        DB::table('car_models')->insert([
            'brand_id' => 1,
            'name' => "ONIX LT",
            'color' => "RED",
            'year' => 2023
        ]);
        DB::table('car_models')->insert([
            'brand_id' => 1,
            'name' => "ONIX LTZ",
            'color' => "BLACK",
            'year' => 2022
        ]);
        DB::table('car_models')->insert([
            'brand_id' => 3,
            'name' => "CRONOS",
            'color' => "GRAY",
            'year' => 2023
        ]);

        //VEHICLES
        DB::table('vehicles')->insert([
            'car_models_id' => 1,
            'chassis' => "A1123DDSC2",
            'domain' => "AF123FD",
            'kilometres' => 0
        ]);
        DB::table('vehicles')->insert([
            'car_models_id' => 2,
            'chassis' => "CS22123SC2",
            'domain' => "AF444XS",
            'kilometres' => 1120
        ]);
        DB::table('vehicles')->insert([
            'car_models_id' => 3,
            'chassis' => "OOPDX22XXS",
            'domain' => "AG912RV",
            'kilometres' => 0
        ]);
    }
}

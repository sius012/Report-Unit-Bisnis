<?php

use App\Http\Controllers\ListProjekController;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\Projek;
use App\Http\Controllers\ProjekController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\Tugas;
use App\Http\Controllers\VersiController;
use App\Models\Direktori;
use App\Http\Controllers\Halaman\HalamanController;
use Database\Factories\SiswaMakerFactory;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TugasController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', [MasterController::class, "index"]);
Route::resource("/projek", ProjekController::class);


Route::get('/materi', [MasterController::class, "materi"])->name("animasia.materi");
Route::get('/materi/daftarmateri/{id}', [MasterController::class, "daftarmateri"]);

Route::get('/readhirearki', [MasterController::class, "readhirearki"]);
Route::post('/buatfolder', [MasterController::class, "buatfolder"]);
Route::put('/updateeverykeyup', [MasterController::class, "updateeverykeyup"]);

Route::get('/getpage', [MasterController::class, "getpage"]);
Route::get('/workspace', [MasterController::class, "workspace"]);

//cruddata
Route::resource('halaman', HalamanController::class);
Route::resource('versi', VersiController::class);

//
Route::resource('tugas', TugasController::class);
Route::get('/generateSiswa', function(){
    SiswaMakerFactory::factory()->count(20)->create();
});

Route::resource('/listprojek', ListProjekController::class);

Route::resource("siswa",SiswaController::class);
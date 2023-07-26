<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Versi;
use DB;
class VersiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req)
    {
        $versi = new Versi;
        if($req->has("id_tugas")){
            $versi = $versi->where("id_tugas",$req->id_tugas);
        }
        if($req->has("ajax")){
            return response()->json($versi->get());
        }
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
    public function store(Request $req)
    {
        DB::beginTransaction();
        try {
            $countVersi = Versi::where("id_tugas",$req->id_tugas)->get()->count();
            $versiTulisan = str_pad($countVersi+1, 3, 0, STR_PAD_LEFT);
            $versi = new Versi;
            $versi->id_tugas = $req->id_tugas;
            $versi->no_versi = $countVersi+1;
            $versi->judul = $req->judul."_v".$versiTulisan;
            $versi->deskripsi = $req->deskripsi;
            $versi->status = $req->status;
            $versi->file_content = "Example.png";
            $versi->save();
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json($th);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

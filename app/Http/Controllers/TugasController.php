<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tugas;
use DB;

class TugasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
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
    

        
            $tugas = new Tugas();
            $tugas->nama = $req->nama;
            $tugas->deskripsi = $req->deskripsi;
            $tugas->jenis = $req->jenis;
            $tugas->dari = $req->dari;
            $tugas->sampai = $req->sampai;
            $tugas->status = $req->status;
            $tugas->id_projek = $req->idProjek;

            if($req->has("idParent")){
                $tugas->id_parent = $req->idParent;
            }

            $tugas->save();
        
            return response()->json("success");
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $req,$id)
    {
        $tugas = new Tugas;
        $tugas = $tugas->getTugas($id); 

        $tugas = Tugas::all();
        return response()->json($tugas);
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
        Tugas::find($id)->delete();
        return response()->json(["data"=>"OKE"]);
    }
}

<?php

namespace App\Http\Controllers\Halaman;

use App\Http\Controllers\Controller;
use App\Models\Direktori as Halaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class HalamanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $halaman = new Halaman;
        $halaman = $halaman->buatFolder(['nama'=>"","deskripsi"=>""],$request->parentId);
        return response()->json(['id'=>$halaman->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $req,$id)
    {
        
        $show = Halaman::find($id);
        if($req->has("onlyContent")){
            if($show->file_content!=null){
                return response()->json(['data'=>file_get_contents(public_path('file_contents'."/".$show->file_content))]);
            }
          
        }
        $data = new Halaman();
        $data = $data->getChildren(null,$show);
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $req,$id)
    {
       
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $id)
    {
        $data = Halaman::find($id);
        $data->nama = $req->nama;
        $data->deskripsi = $req->desc;
        $namaFile = "";
        if($data->file_content==null){
            $namaFile = Str::random(40).".anp";
            $data->file_content = $namaFile;
            
        }else{
            $namaFile = $data->file_content;
        }
        file_put_contents(public_path("/file_contents"."/".$namaFile), $req->fileContent);

        $data->save(); 
        return json_encode($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Halaman::hapusHalaman($id);
    }
}

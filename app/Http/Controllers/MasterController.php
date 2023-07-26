<?php

namespace App\Http\Controllers;

use App\Models\Direktori;
use Illuminate\Http\Request;
use App\Models\Kelas;

class MasterController extends Controller
{
    public function index(){
        return view("layouts.master");
    }

    public function projek(){
        return view("pages.projek.index");
    }

    public function materi(){
        $kelas = Kelas::all();
        return view("pages.materi.index", ["kelas"=>$kelas]);
    }

    public function daftarmateri($id){
        $children = new Direktori();
        //dd($children->tampilkanMateri($id));
        return view("pages.materi.daftar_materi",["id_kelas"=>$id, 'hirearki'=>$children->tampilkanMateri($id)]);
    }

    public function readhirearki(Request $req){
        $children = new Direktori();
        //dd($children->tampilkanMateri($id));
        return json_encode($children->tampilkanMateri($req->kelas));
    }

    public function buatfolder(Request $req){
        $data = Direktori::buatFolder(["nama"=>$req->nama, "deskripsi"=>"Eksperimental"], $req->parent);
        return json_encode($data);
    }

    public function updateeverykeyup(Request $req){
        $data = Direktori::find($req->id_page);
        $data->nama = $req->nama;
        $data->deskripsi = $req->desc;
        $data->save(); 
        return json_encode($data);
    }

    public function getpage(Request $req){
        $data = Direktori::find($req->id);
        return json_encode($data);
    }

    public function workspace(Request $req){
        return view("workspace.page1");
    }
}

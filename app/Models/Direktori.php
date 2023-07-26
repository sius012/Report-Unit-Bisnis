<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;
use Directory;

class Direktori extends Model
{
    use HasFactory;
    protected $table = "direktoris";
    protected $fillable = ["nama", "tipe", "deskripsi","parent_id","file_content", "id_kelas"];

    public static function buatFolder($params,$parentId = null){
        $folder = new Direktori;
        $folder->nama = $params["nama"];
        $folder->deskripsi = $params["deskripsi"];
        $folder->tipe = "folder";
        if($parentId!=null){
            $folder->parent_id = $parentId;
        }
        if(isset($params["id_kelas"])){
            $folder->id_kelas = $params["id_kelas"];
        }
        $folder->save();
        return $folder;
    }

    public function tampilkanMateri($kelasId){
        
        $children = $this->getChildren($kelasId);

        return $children;
    }

    public function getChildren($id_kelas=null, $data = null){
        //getchildren
        $folder = new Direktori ;
        $children['data'] = $data;
        if($id_kelas != null){
            $folder = $folder->where("id_kelas",$id_kelas);
            $children['data'] = $folder->first();
        }
        if($data != null){
            $folder = $folder->where("parent_id",$data->id);
        }
        $folder = $folder->get();
      
        $children['children'] = [];
        
        if($folder->count() > 0){
            foreach ($folder as $f=> $fd) {
                $childrens = Direktori::where("parent_id",$fd->id)->get()->count();

                array_push($children["children"], $this->getChildren(null, $fd));
                //echo $fd." ".$folder->count()."<br>";
            }
        }
        
        return $children;
    }

    public function hapusHalaman($id){
        DB::beginTransaction();
        try {
            //hapushalamanutama
            $data = Direktori::find($id);
            $data->delete();

            //hapusChildren
            $data = Direktori::where("parent_id",$id);
            $data->delete();

            DB::commit();
            return "data berhasil";
        } catch (\Throwable $th) {
         
           DB::rollBack();
           return $th;
        }
    }
}

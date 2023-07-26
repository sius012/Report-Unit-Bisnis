<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tugas extends Model
{
    use HasFactory;
    protected $table = "tugas";
    protected $fillable = ['id', 'nama', 'deskripsi', 'jenis', 'file_path', 'dari', 'sampai', 'status', 'id_parent', 'id_projek'];
    public $timestamps = false;

    public function getTugas($id)
    {
        $task = $this->rekrusifGenerate(Tugas::find($id));
        return $task;
    }

    public function rekrusifGenerate($data)
    {
        $task = $data;
        $children = [];
        $childrens = Tugas::where("id_parent", $data->id)->get();
        if($childrens->count()>0){
            foreach ($childrens as $chd) {
                array_push($children, $this->rekrusifGenerate($chd));
             }
        }
        
        $task->children = $children;
        return $task->toArray();
    }

}
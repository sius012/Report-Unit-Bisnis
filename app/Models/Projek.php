<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projek extends Model
{
    use HasFactory;
    protected $table = "projeks";
    protected $fillable = ["nama","deskripsi","tanggal_mulai","tanggal_selesai","status","prioritas","penanggung_jawab"];

    public static function getListTask($id){
        $listTask = [];
        $task = Tugas::where("id_projek", $id)->get();
        foreach($task as $tx){
            $task = new Tugas;
            array_push($listTask,$task->getTugas($tx->id));
        }
        return $listTask;
    }
}

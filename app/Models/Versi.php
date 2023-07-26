<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Versi extends Model
{
    use HasFactory;

    protected $table = "versi";
    protected $fillable = ["id_tugas","no_versi","judul","deskripsi","file_content","id_pengisi","status"];
}

@extends('layouts.master')
@section('content')
@section('title', "Materi")

@php 

@endphp

<div class="container">
    <div class="row">
        @foreach ($kelas as $kls)
        <div class="col-md-4" >
            <div class="card" style="height: 200%">
                <div class="card-body">
                    <h3 >{{$kls['kelas']}}</h3>
                </div>
                <div class="card-footer">
                    <a href="{{url('/materi/daftarmateri/'.$kls->id)}}"><button class="btn btn-primary">Masuk</button></a>
                </div>
            </div>
        </div>
        @endforeach
    </div>
</div>
@endsection
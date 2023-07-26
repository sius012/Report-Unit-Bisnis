@extends("layouts.master")
@section("title","Daftar Materi kelas")
@section("content")
    <input type="hidden" class="id-kelas" value="{{$id_kelas}}">
    <div class="container-fluid container-materi">

    </div>


    <div class="modal fade" tabindex="-1" id="page-viewer">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Editor Halaman</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="container">
                    <input type="hidden" class="form-control mb-3 id-page" placeholder="">
                    <input type="text" class="form-control mb-3 title-input inp" placeholder="Judul">
                    <input class="form-control desc-input inp" name="" id="" placeholder="Deskripsi">
                    <div class="container workspace mt-3 p-3" contenteditable="true" style="height: 1000px" data-type="workspace" data-type="workspace">
                        
                    </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Simpan</button>
            </div>
          </div>
        </div>
      </div>


        

@endsection




@push("js")
<script>
    $(document).ready(function(){
        // var halaman = new Halaman();
        // halaman.dapatkan(2);
        var textoria = new AnimasiaMaster();
        var outlinerMateri = new OutlinerMateri(1);
        var viewer = new PageViewer($("#page-viewer"));

        textoria.menu = [outlinerMateri,viewer];
        textoria.initialize();

        console.log(textoria)
        var outlinerRender = new OutlinerRender($(".container-materi"));

        
        outlinerMateri.outlinerRender = outlinerRender;


        
      
        outlinerMateri.aktifkan()
    })
</script>
@endpush
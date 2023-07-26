@extends('layouts.master')
@section("title", "Projek")
@section("content")
<div class="content">
    <button class="btn btn-primary btn-open">Buat Projek</button>
    <div class="container-fluid py-4" id="projek-list-viewer"></div>
</div>




<div class="modal" tabindex="-1" id="modal-projek">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>
@endsection

@push("js")
<script src="{{asset('js/Component/ProjekListViewer.js')}}"></script>
<script>
    $(document).ready(function(){
        var projek = new Projek();
        var projekEditor = new ProjekEditor($("#modal-projek"));
        projekEditor.projekData = projek;
        projekEditor.generate();


        //Projek Viewer
        var projekListViewer = new ProjekListViewer($("#projek-list-viewer"));
        var listProjek = Projek.getList();
        
        projekListViewer.listProjek = listProjek;
        console.log(listProjek)
        projekListViewer.render();
        

        $(".btn-open").click(function(){
            projekEditor.show()
        })

    })
</script>
@endpush
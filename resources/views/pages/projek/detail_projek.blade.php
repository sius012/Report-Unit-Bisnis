@extends("layouts.master")
@section("content")


<div class="container-fluid" >
  <div class="row">
    <div class="col">
      <div class="container-fluid" id="container-projek">
        <div class="row">
          <div class="col label-nama-projek" ><h3></h3></div>
        </div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Informasi Projek</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Tugas</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Partisipan</button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <div class="container-info-projek">
    
                </div>
            </div>
            <div class="tab-pane fade p-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <button class="btn btn-primary btn-buat-tugas">Buat Tugas</button>
    
                <div class="container p-3 tugas-list-view">
                  
                </div>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
          </div>
    </div>
    </div>
    
    </div>
  </div>
</div>

<div class="side-modal tugas-detail-view" tabindex="-1" style="display: none">
  <div class="side-modal-dialog  modal-dialog-right">
    <div class="side-modal-content">
      <div class="side-modal-body p-3" >
        <div class="container">
          <div class="container">
             <table class="table">
              <tr>
                <th>Nama Tugas</th>
                <td class="tugas-name">Ikan Goreng</td>
              </tr>
              <tr>
                <th>Deskripsi</th>
                <td class="tugas-deskripsi">Lorem ipsum</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>Belum dimulai</td>
              </tr>
             </table>
          </div>
        </div>
      </div>
      <div class="container" id="container-tugas">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="konten" data-bs-toggle="tab" data-bs-target="#konten-tab" type="button" role="tab" aria-controls="home" aria-selected="true">Konten</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="versi" data-bs-toggle="tab" data-bs-target="#versi-tab" type="button" role="tab" aria-controls="profile" aria-selected="false">Versi</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="komentar" data-bs-toggle="tab" data-bs-target="#komen-tab" type="button" role="tab" aria-controls="contact" aria-selected="false">Komentar</button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent" style="overflow-y: scroll;height: 60vh">
            <div class="tab-pane fade show active" id="konten-tab" role="tabpanel" aria-labelledby="konten-tab">
                <div class="container-konten-tugas">
                  
                </div>
            </div>
            <div class="tab-pane fade p-3" id="versi-tab" role="tabpanel" aria-labelledby="versi-tab">
                <button class="btn btn-primary btn-buat-versi">Tambahkan Versi</button>
                <div class="container versi-list-viewer p-3"></div>
            </div>
            <div class="tab-pane fade" id="komentar-tab" role="tabpanel" aria-labelledby="komentar-tab">...</div>
          </div>
    </div>  
    </div>
     
  </div>
</div>
</div>


<div class="modal fade" tabindex="-1" id="tugas-view">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="container">
          <button class="tombol-alert">Tekan saya</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary btn-tugas-store">Buat tugas</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" tabindex="-1" id="modal-versi-viewer">
    <form action="{{url('/versi')}}" method="post">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" class="btn-buat-versi">Buat Versi</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container-input"></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Buat Versi</button>
        </div>
      </div>
    </div>
  </form>
  </div>
@endsection
@push("js")
<script src="{{asset('js/Model/Versi.js')}}"></script>
<script src="{{asset('js/Component/ProjekDetailViewer.js')}}"></script>
<script src="{{asset('js/Component/TugasListViewer.js')}}"></script>
<script src="{{asset('js/Component/TugasViewer.js')}}"></script>
<script src="{{asset('js/Component/TugasDetailViewer.js')}}"></script>
<script src="{{asset('js/Component/ModalVersiViewer.js')}}"></script>
<script src="{{asset('js/Component/VersiListViewer.js')}}"></script>
<script>
    $(document).ready(function(){
        var id = "{{$id}}";
        var fileProjek = Projek.dapatkan(id);
        var tugasData = Tugas.semuaTugas(id);

        //ViewerElement
        var projekDetailViewer = new ProjekDetailViewer($("#container-projek"));
        var tugasListViewer = new TugasListViewer($(".tugas-list-view"));
        var tugasViewer = new TugasModalViewer($("#tugas-view"));
        var tugasDetailViewer = new TugasDetailViewer($(".tugas-detail-view"))
        var modalVersiViewer = new ModalVersiViewer($("#modal-versi-viewer"))

        //Intergrated
        projekDetailViewer.projekData = fileProjek;
        projekDetailViewer.tugasViewer = tugasViewer;
        projekDetailViewer.tugasListViewer = tugasListViewer;
        projekDetailViewer.tugasDetailViewer  = tugasDetailViewer;
        projekDetailViewer.modalVersiViewer  = modalVersiViewer;
        //loadingData
        tugasListViewer.tugasData = tugasData;


        projekDetailViewer.mulai();
    })
</script>
@endpush
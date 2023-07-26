class TugasDetailViewer {
    constructor(container){
        this.container = container;
        this.modal = new bootstrap.Modal(this.container[0]);
        this.tugasData;
        this.masterCtx;
        this.versiData;
        this.versiListViewer;
        //this.#globalEventListener()
    }

    attach(tugas){
        this.tugasData = tugas;
        this.versiData  = Versi.getByTugasId(tugas.id);
        this.versiListViewer = new VersiListViewer(this.container.find(".versi-list-viewer"), this.versiData,this.tugasData);
    }

    show(){
        this.container.find(".tugas-name").html(this.tugasData.nama);
        this.container.find(".tugas-deskripsi").html(this.tugasData.deskripsi);
        this.container.show("slow")
    }

    reloadListener(){
        this.#globalEventListener()
    }

    #globalEventListener(){
        var ctx = this;
        this.container.delegate(".btn-buat-versi","click",function(){
            ctx.masterCtx.modalVersiViewer.generate(ctx.tugasData.id);
            ctx.masterCtx.modalVersiViewer.show()
        })
    }
    
}
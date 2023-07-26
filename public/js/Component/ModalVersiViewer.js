class ModalVersiViewer{
    constructor(container){
        this.container = container;
        this.masterCtx;
        this.modal = new bootstrap.Modal(container[0]);
        this.versiData;
        this.#globalEventListener();
    }

    #globalEventListener(){
        var ctx = this;
        this.container.delegate("form", "submit", function(e){
            e.preventDefault();
            var versi = Versi.fromContainer(ctx.container);
            versi.buat();
            ctx.hide();
            ctx.masterCtx.tugasDetailViewer.versiListViewer.reload()
        })
    }

    generate(idTugas){
        var field = [
            
            {
                tag: "hidden",
                name: "idTugas",
                value: idTugas,
            },
            {
                tag: "file",
                name: "fileContent",
                value: "",
            },
            {
                tag: "input",
                label: "Masukan Versi",
                name: "judul",
            },
            {
                tag: "checkbox",
                label: "Dari awal",
                name: "dariAwal",
            },
            {
                tag: "input",
                label: "Masukan keterangan",
                name: "deskripsi",
            },
        ]
        this.container.find(".container-input").html(Helperia.renderInput(field));
    }

    show(){
        this.modal.show();
    }

    hide(){
        this.modal.hide();
    }

    store(){

    }


}
class TugasModalViewer {
    constructor(container) {
        this.container = container;
        this.modal = new bootstrap.Modal(container[0]);
        this.projekData;
        this.masterCtx;
        this.idParent;
        //this.#globalEventListener();
        this.#globalEventListener();
    }

    generate(idProjek = null) {
        var container = this.container.find(".modal-body");
        var inputField = [
            {
                tag: "hidden",
                name: "idProjek",
                value: idProjek,
            },
            {
                tag: "hidden",
                name: "idParent",
                value: this.idParent,
            },
            {
                tag: "input",
                label: "Masukan Nama tugas",
                name: "nama",
            },
            {
                tag: "input",
                label: "Masukan deskripsi tugas",
                name: "deskripsi",
            },
            {
                tag: "date",
                label: "Dari",
                name: "dari",
                higher: "sampai",
            },
            {
                tag: "date",
                label: "Sampai",
                name: "sampai",
                lower: "dari"
            },
            {
                tag: "search",
                for: "siswa",
                label: "Sampai",
                name: "sampai",
                lower: "dari"
            },
        ]
        container.html(Helperia.renderInput(inputField))

    }

    show() {
        this.modal.show();
    }


    #globalEventListener(){
        var ctx = this;
        this.container.delegate(".btn-tugas-store","click",function(){
            ctx.projekStore();
            ctx.masterCtx.tugasListViewer.reload()
        })
        this.container.delegate(".tombol-alert", "click", function(){
            alert("Haloo")
        })
    }

    projekStore(){
        var tugas = new Tugas();
        tugas.getFromElement(this.container);
        tugas.buat();
    }

    assignIdParent(id){
        this.idParent = id
        this.generate();
    }







}

class ProjekDetailViewer {
    constructor(container) {
        this.projekData;
        this.container = container;

        this.containerInfo = this.container.find(".container-info-projek");
        this.tugasViewer;
        this.tugasListViewer; 
        this.tugasDetailViewer;
        this.modalVersiViewer;
    }

    renderInfo() {
        var cInfo = this.containerInfo;
        var field = this.projekData.field;
        var infoData = "<table class='table'>";
        var pengecualian = ["created_at", "updated_at", "id"];
        for (var key in field) {
            if (!pengecualian.includes(key)) {
                infoData += `<tr><td><b>${custs(key)}</b></td><td>${field[key].value}</td></tr>`
            }
        }
        infoData += "</table>"
        cInfo.html(infoData)
        this.container.find(".label-nama-projek").find("h3").text(this.projekData.field.nama.value)

        this.#globalEventListener();
    }

    #globalEventListener() {
        var ctx = this
        this.container.delegate(".btn-buat-tugas", "click", function () {
            ctx.tugasViewer.show()
        })
    }

    mulai(){
        this.tugasViewer.masterCtx = this;
        this.tugasListViewer.masterCtx = this;
        this.tugasDetailViewer.masterCtx = this;
        this.modalVersiViewer.masterCtx = this;
        this.tugasViewer.generate(this.projekData.field.id.value)
        this.renderInfo()
        this.tugasListViewer.show()
        this.tugasDetailViewer.reloadListener();
    }
}
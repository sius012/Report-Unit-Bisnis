class ProjekListViewer {
    constructor(container) {
        this.container = container;
        this.listProjek = [];
        this.listType = "list";
        this.filterKeyword = "";
    }

    render() {
        this.container.html("");
        this.container.append("<div class='row '></div>");
        var row = this.container.find(".row");
        this.listProjek.map(function (e) {
            row.append(`
            <div class='col-md-4 py-2'>
                <div class='card'>
                    <div class='card-body'><h4>${e.field.nama.value}</h4>
                    <p class='m-0'>tanggal mulai : ${e.field.tanggal_mulai.value}</p>
                    <p class='m-0'>tanggal selesai : ${e.field.tanggal_mulai.value}</p>
                    <p>status : ${e.field.status.value}</p>
                    </div>
                    <div class='card-footer'><a href='/projek/${e.field.id.value}'><button class='btn btn-primary'>Buka</button></a></div>
                </div>
            </div>
            `)
        })
    }
}
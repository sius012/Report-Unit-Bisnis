


class TugasListViewer {
    constructor(container) {
        this.container = container;
        this.tugasData = [];
        this.masterCtx;


        var ctx = this;
        this.contextMenu = new ContextMenu([
            new ContextMenuItem("Hapus", function (data_id) {
                Tugas.temukanDanHapus(data_id, ctx);
            }), new ContextMenuItem("Edit", function (data_id) {
                Tugas.temukanDanHapus(data_id, ctx);
            }), new ContextMenuItem("Tambah Subtask", function (data_id) {
                ctx.masterCtx.tugasViewer.assignIdParent(data_id)
                ctx.masterCtx.tugasViewer.show()
            })]);

        this.#globalEventListener();
    }


    #globalEventListener() {
        var ctx = this;
        $(document).click(function () {
            ctx.contextMenu.hide();
        })


        this.container.delegate(".task-row", "contextmenu", function (e) {
            e.preventDefault();
            ctx.contextMenu.show($(this))
        })

        this.container.delegate(".task-row", "click", function (e) {
            e.preventDefault()
            var id = $(this).closest("tr").data("id");
            var tugas = Tugas.find(id);
            ctx.masterCtx.tugasDetailViewer.attach(tugas)
            ctx.masterCtx.tugasDetailViewer.reloadListener()
            ctx.masterCtx.tugasDetailViewer.show()
        })
    }

    reload() {
        this.tugasData = Tugas.semuaTugas(this.masterCtx.projekData.field.id.value)
        this.show()
    }

    show() {
        if (this.tugasData.length > 0) {
            this.container.html(`<table class='table table-bordered'><thead><tr><th width="400">Nama</th><th>Tanggal mulai</th><th>Tanggal Selesai</th><th>Assesmen</th><th>Progress</th></tr></thead><tbody></tbody></table>`);
            let list = "";
            for (var i in this.tugasData) {
                list += this.rekursifShow(this.tugasData[i], 1);
            }
            this.container.find("table").find("tbody").html(list);
        } else {
            this.container.html("<h3>Tidak belum ada tugas</h3>")
        }

        // this.container.html(list)
    }

    rekursifShow(data, i) {
        let list = this.renderPerCard(data, i);
        if (data.children.length > 0) {
            for (var i in data.children) {
                list += this.rekursifShow(data.children[i], parseInt(i) + 1);
            }

        }
        return list;
    }


    renderPerCard(data, i) {
        var row = `
        <tr class='' data-id='${data.id}'>
            <td class='task-row'>
            <div class="d-flex flex-row-reverse bd-highlight">

                <div class=" bd-highlight m-0" style="width: ${100 - ((data.indexLevel - 1) * 10)}%">  <a href="#" class='' style='color: black;text-decoration: none;'><i class='fa fa-tasks m-1'></i>${data.nama}</a></div>
              
             </div>
            </td>
            <td>
                ${data.dari}
            </td>
            <td>
                ${data.sampai}
            </td>
            <td>

            </td>
            <td>
                <div class="progress">
                     <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </td>
        </tr>
        `;
        return row;
    }
}


class ContextMenu {
    constructor(data) {
        this.contextMenu = $("<div>").addClass("contextmenu-custom position-absolute").html(`<ul class="list-group">
        </ul>`);
        this.contextMenuItem = data;


        this.render()
    }

    render() {
        var ctx = this;
        var containerCtx = this.contextMenu.find("ul");
        containerCtx.html("");
        this.contextMenuItem.map(function (e, i) {
            var element = $("<li>").addClass('list-group-item').html(e.nama);
            ctx.contextMenuItem[i].element = element
            element.appendTo(containerCtx)
            ctx.contextMenuItem[i].load()
        })
    }

    restart() {
        //this.#globalEventListener();
    }

    show(element) {

        this.contextMenu.appendTo(element);
        this.render()
        this.contextMenu.show();
    }

    hide() {
        this.contextMenu.hide();
    }


}

class ContextMenuItem {
    constructor(nama, fungsi) {
        this.element;
        this.nama = nama;
        this.dataItem;
        this.fungsi = fungsi;
    }

    load() {
        this.#globalEventListener();
    }

    #globalEventListener() {
        var ctx = this;
        this.element.click(function () {
            ctx.fungsi($(this).closest("tr").data("id"))
        })
    }
}
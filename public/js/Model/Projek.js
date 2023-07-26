class Projek {
    constructor() {
        this.field = {
            nama: {
                placeHolder: "Isikan nama anda",
                nameAttr: "nama",
                class: "form-control",
                value: "",
                type: "text",
            },
            deskripsi: {
                placeHolder: "Isikan Deskripsi",
                nameAttr: "deskripsi",
                class: "form-control",
                value: "",
                type: "text"
            },
            tanggal_mulai: {
                placeHolder: "Tanggal mulai",
                nameAttr: "tanggal_mulai",
                class: "form-control",
                type: "date",
                value: "",
            },
            tanggal_selesai: {
                placeHolder: "Tanggal Selesai",
                nameAttr: "tanggal_selesai",
                class: "form-control",
                type: "date",
                value: "",
            },
            status: {
                placeHolder: "Status",
                nameAttr: "status",
                class: "form-control",
                type: "select",
                value: ["Berjalan", "Tertunda", "Selesai"],
            },
            prioritas: {
                placeHolder: "Prioritas",
                nameAttr: "prioritas",
                class: "form-control",
                type: "select",
                value: ["Rendah", "Tinggi", "Sedang"],
            },
        }
        this.task = [];
    }

    create() {
        var data = {};
        var ctx = this;
        for (var key in this.field) {
            if (this.field.hasOwnProperty(key)) {
                var field = this.field[key];
                data[field.nameAttr] = field.value;
            }
        }

        for (var key in data) {
            if (this.field.hasOwnProperty(key)) {
            }
        }
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $("meta[name=csrf-token").attr("content")
            },
            data: data,
            url: "projek",
            type: "post",
            success: function (response) {

            }, error: function (err) {
                alert(err.responseText)
            }
        })
        //console.log(data);


    }

    addTask(dataTask) {

    }


    static getList(params = {}) {
        var projek = [];
        $.ajax({
            url: "/projek",
            type: "get",
            data: {
                ajax: true
            },
            async: false,
            success: function (response) {
                projek = response.map(function (e) {
                    var obj = new Projek;
                    for (var key in e) {
                        obj.field[key] = { value: e[key] }
                    }
                    return obj;
                })

            }, error: function (err) {
                alert(err.responseText)
            }
        })

        return projek;
    }

    static dapatkan(id) {
        var projek = new Projek();
        $.ajax({
            url: "/projek/" + id,
            data: {
                ajax: true,
            },
            type: "get",
            async: false,
            success: function (response) {
                for (var key in response) {
                    projek.field[key] = { value: response[key] }
                }
            }
        })
        return projek;
    }
}



class ProjekEditor {
    constructor(modalElement) {
        this.projekData;
        this.modalElement = modalElement;
        this.modalViewer = new bootstrap.Modal(modalElement[0]);
        this.size = "large";



    }

    aturUkuranModal(besarnya = null) {
        if (besarnya == null) {
            var bootstrapModalClass = "";
            switch (this.size) {
                case "large":
                    bootstrapModalClass = "modal-xl"
                    break;

                case "small":
                    bootstrapModalClass = "modal-sm"
                    break;

                default:
                    break;
            }
            this.modalElement.find(".modal-dialog").attr("class", ".modal-dialog");
            this.modalElement.find(".modal-dialog").addClass("class", bootstrapModalClass);
        }
    }

    generate() {
        this.modalElement.find(".modal-body").html("");
        this.modalElement.find(".modal-body").append("<div class='container'></div>");
        var container = this.modalElement.find(".modal-body").find(".container");

        var field = this.projekData.field;
        for (var key in this.projekData.field) {
            if (this.projekData.field.hasOwnProperty(key)) {
                var value = "";
                if (field[key].type == "select") {
                    for (let index = 0; index < field[key].value.length; index++) {
                        if (index == 0) {
                            value += "<option value=''>" + field[key].placeHolder + "</option>"
                        }
                        value += `<option value="` + field[key].value[index] + `">${field[key].value[index]}</option>`;
                    }
                }
                container.append(`
              <div class='form-group mb-3'>
              <label class="form-label">${field[key].placeHolder}</label>
              <${field[key].type == "select" ? "select" : "input type=" + field[key].type}  class="${field[key].class + " " + key}" placeholder="${field[key].placeHolder}" name="${field[key].nameAttr}" value="${field[key].type != "select" ? field[key].value : ""}">${field[key].type == "select" ? value + "</select>" : ""}</div>
              `);
            }
        }

        //make create button
        this.modalElement.find(".modal-footer").html("");
        this.modalElement.find(".modal-footer").html("<button class='btn btn-primary btn-create'>Buat</button>")

        this.#GLobalEventListener()

    }

    show() {
        var modalViewer = this.modalViewer;
        this.aturUkuranModal();
        modalViewer.show();
    }

    reset() {
        this.modalViewer.hide();
        this.generate()
    }

    assignValueToProjek(byAttrName = false) {
        for (var key in this.projekData.field) {
            if (this.projekData.field.hasOwnProperty(key)) {
                var field = this.projekData.field[key];
                if (byAttrName == false) {
                    field.value = this.modalElement.find("." + field.nameAttr).val();
                }
            }
        }
    }

    #GLobalEventListener() {
        var ctx = this
        this.modalElement.delegate(".btn-create", "click", function () {
            ctx.assignValueToProjek();
            ctx.projekData.create()
            ctx.reset()
        })
    }
}








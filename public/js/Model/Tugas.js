//Tugas
class Tugas {
    constructor() {
        this.id;
        this.indexLevel;
        this.nama;
        this.deskripsi;
        this.jenis;
        this.filePath;
        this.dari;
        this.sampai;
        this.status;
        this.parent;
        this.children = [];
        this.idProjek;
        this.partisipan = [];
    }

    static find(id) {
        var tugas = new Tugas;
        $.ajax({
            url: "/tugas/"+id,
            type: "get",
            data: {
                ajax: true
            },
            async: false,
            success: function(data){
                tugas = Tugas.rekrusifFunc(data, 1);
            },error: function(err){
                alert(err.responseText)
            }
        })
        return tugas;
    }


    static temukanDanHapus(id, tugasListView = null) {
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $("meta[name=csrf-token]").attr("content")
            },
            url: "/tugas/" + id,
            type: "DELETE",
            success: function () {
                if (tugasListView != null) {
                    console.log(tugasListView)
                    tugasListView.reload();
                }
            }
        })
    }

    static semuaTugas(idProjek) {
        var task = [];
        $.ajax({
            url: "/projek/" + idProjek,
            type: "get",
            data: {
                task: true,
            },
            async: false,
            success: function (response) {
                task = Tugas.parse(response);
            }, error: function (err) {
                alert(err.responseText);
            }
        })

        return task;
    }

    getFromElement(container) {
        this.nama = container.find("input[name=nama]").val();
        this.deskripsi = container.find("input[name=deskripsi]").val();
        this.jenis = "Task";
        this.dari = container.find("input[name=dari]").val();
        this.sampai = container.find("input[name=sampai]").val();
        this.status = "Belum dimulai";
        this.idProjek = container.find("input[name=idProjek]").val();
        this.idParent = container.find("input[name=idParent]").val();
        var partisipan = [];
        container.find(".container-nis").children(".container-input").each(function () {
            partisipan.push($(this).find("input").val());
        })
        this.partisipan = partisipan;

    }

    static toAssosiative(task) {
        var arr = {
            nama: task.nama,
            deskripsi: task.deskripsi,
            jenis: task.jenis,
            filePath: task.filePath,
            dari: task.dari,
            sampai: task.sampai,
            status: task.status,
            idProjek: task.idProjek,
            partisipan: task.partisipan,
            idParent: task.idParent
        }
        return arr;
    }

    static parse(data) {
        let datas = [];
        for (let i = 0; i < data.length; i++) {
            datas.push(this.rekrusifFunc(data[i], 1));
        }
        return datas;
    }

    static rekrusifFunc(data, index) {
        let tugas = new Tugas;
        tugas.id = data.id;
        tugas.nama = data.nama;
        tugas.indexLevel = index;
        tugas.deskripsi = data.deskripsi;
        tugas.jenis = data.jenis;
        tugas.filePath = data.filePath;
        tugas.dari = data.dari;
        tugas.sampai = data.sampai;
        tugas.status = data.status;
        for (let i = 0; i < data.children.length; i++) {
            tugas.children.push(this.rekrusifFunc(data.children[i], index + 1));
        }
        tugas.projek;
        tugas.idProjek;
        tugas.partisipan = [];
        return tugas;
    }



    buat(tugasListView = null) {
        console.log(Tugas.toAssosiative(this))
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $("meta[name=csrf-token]").attr("content")
            },
            url: "/tugas",
            type: "post",
            data: Tugas.toAssosiative(this),
            success: function (response) {
                if (tugasListView != null) {
                    tugasListView.reload()
                }
            }, error: function (err) {
                alert(err.responseText);
            }
        })
    }



}

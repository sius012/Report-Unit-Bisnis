class Versi{
    constructor(){
        this.id;
        this.idTugas;
        this.noVersi = null;
        this.judul;
        this.deskripsi;
        this.fileContent;
        this.status;
        this.idPengisi;
        this.dariAwal=false;
    }

    static find(id){
        var versi = new Versi
        $.ajax({
            url: "/versi/"+id,
            type: "get",
            success: function(response){

            }
        })
    }

    static fromContainer(container){
        var versi = new Versi;
        versi.idTugas = container.find("input[name=idTugas]").val();
        versi.judul = container.find("input[name=judul]").val();
        versi.deskripsi = container.find("input[name=deskripsi]").val();
        versi.fileContent = container.find("input[name=fileContent]")[0].files[0];
        versi.dariAwal = container.find("input[name=dariAwal]").val()
        versi.status = "On Progress";
        return versi;
    }

    toAssosiative(){
        return {
            id_tugas: this.idTugas,
            no_versi: this.noVersi,
            judul: this.judul,
            deskripsi: this.deskripsi,
            file_content: this.fileContent,
            status: this.status
        }
    }

    static parse(data){
        var versi = new Versi;
        versi.id = data.id;
        versi.idTugas = data["id_tugas"];
        versi.noVersi = data["no_versi"];
        versi.judul = data["judul"];
        versi.deskripsi = data["deskripsi"];
        versi.fileContent = data["file_content"]
        versi.status = data["status"]
        versi.idPengisi = data["id_pengisi"]
        return versi;
    }

    toFormData(){
        var form = new FormData;
        form.append("id_tugas", this.idTugas)
        form.append("no_versi", this.noVersi)
        form.append("judul", this.judul)
        form.append("deskripsi", this.deskripsi)
        form.append("file_content", this.fileContent)
        form.append("status", this.status)
        return form;
    }

    buat(){
        var data = this.toFormData();
        //console.log(data);
        $.ajax({
            url: "/versi",
            headers: {
                "X-CSRF-TOKEN": $("meta[name=csrf-token]").attr("content")
            },
            type: "post",
            processData: false,
            contentType: false,
            data: data,
            success: function(response){
                console.log(response)
            },error: function(err){
                alert(err.responseText)
            }
        })
    }

    static getByTugasId(id){
        var tugas = [];
        $.ajax({
            url: "/versi",
            type: "get",
            data:{
                id_tugas: id,
                ajax: true
            },
            async: false,
            success: function(data){
                data.map(function(e){
                    tugas.push(Versi.parse(e))
                    
                })
                console.log(tugas)
            },
            error: function(err){
                alert(err.responseText)
            }

        })
        return tugas;
    }

    static renderElement(data){
        var datas = data.map(function(e){
            return Versi.renderPerRow(e);
        })
        var str = datas.join("");
        return str;
    }

    static renderPerRow(data){
        var str = `<div class='row card mb-2'>
        <div class='col-2'>
        
        </div><div class='col-10'>

        <div class="card-body">
          <h5 class="card-title">${data.judul}</h5>
          <p class="card-text">${data.deskripsi}</p>
        </div>
      </div></div>`;
      return str;
    }
        
}
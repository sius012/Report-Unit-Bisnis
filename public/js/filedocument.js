class AnimasiaMaster {
    constructor() {
        this.menu = [];
    }

    initialize() {
        for (let i = 0; i < this.menu.length; i++) {
            this.menu[i].masterCtx = this;
        }
    }
}



class OutlinerMateri {
    constructor(IdKelas) {
        this.masterCtx;

        this.IdKelas = IdKelas;
        this.konten = new Halaman;
        this.outlinerRender;

        this.listenerActived = false;
    }

    aktifkan() {
        this.konten.dapatkan(176)
        var variableFounded = false;

        this.outlinerRender.datacontent = this;
        console.log(this.konten);
        this.outlinerRender.render();

        variableFounded = true;

        if(this.listenerActived == false){
            this.#globalEventListener();
            this.listenerActived = true;
        }

        
    }
    //Mendapatkan Isi konten materi berdasarkan ID kelas
    dapatkanMateriKelas(withRender = false) {
        //lakukan perintah ajax untuk mengambil data didatabase
        $.ajax({
            url: "/readhirearki",
            type: "get",
            dataType: "json",
            data: {
                kelas: this.IdKelas
            },
            success: (data) =>
                this.ubahContent(data, withRender)
        })
    }

    //dikarenakan ajax tidak bisa merubah variable global, maka kita perlu memanggil callback
    ubahContent(data, withRender) {
        this.konten = data;
        // console.log(this.konten)
        if (withRender == true) {
            this.outlinerRender.datacontent = this
            this.#renderElementMateri()
        }
    }

    renderMateri() {
        this.dapatkanMateriKelas(true)
    }

    #renderElementMateri() {
        this.outlinerRender.render();
    }



    //CRUD HALAMAN
    buatHalaman(parentId) {
        var halaman = new Halaman;
        halaman.buat(parentId);

        console.log(this.masterCtx.menu[2])
        this.masterCtx.menu[1].load(halaman);
        this.masterCtx.menu[1].render()
        this.masterCtx.menu[0].aktifkan()
        
    }

    //HAPUS HALAMAN



    hapusHalaman(id) {
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $("meta[name=csrf-token]").attr('content')
            },
            url: "/halaman/" + id,
            type: 'DELETE',
            success: () => this.aktifkan(),
            error: function (err) {
                console.log(err.responseText);
            }
        })
    }

    //


    #globalEventListener() {
        var ctx = this;

        //hapus halaman
        this.outlinerRender.container.delegate(".hapus-halaman", "click", function () {
            let idPage = $(this).closest("li").attr("folder-id");
            ctx.hapusHalaman(idPage)
        })

        //buka halaman
        this.outlinerRender.container.delegate(".page-open", "click", function () {
            let idPage = $(this).closest("li").attr("folder-id");
            var halaman = new Halaman(idPage);
            ctx.masterCtx.menu[1].load(halaman);
            ctx.masterCtx.menu[1].render();
        })

        //buatHalaman
        this.outlinerRender.container.delegate(".add-page", "click", function () {
            let idPage = $(this).closest("li").attr("folder-id");
            ctx.buatHalaman(idPage)
        })
    }



}

class OutlinerRender {
    constructor(container = null) {
        this.datacontent;
        this.container = container
    }

    render() {
        if (this.container != null) {
            let list = this.#recrusifRender(this.datacontent.konten,true)
            console.log(this.datacontent.konten.id)
            this.container.html("<ul class='container-list'>" + list + "</ul>")
        } else {
            console.log('pastikan container list terisi')
        }
    }


    #recrusifRender(data, root = false) {
        let li = `<li class='' folder-id='${data.id}' class=""><div class='list-row'><a href="#" class="page-open">${data.nama}</a><a href="#" class="add-page button-list"><i class='fa fa-plus'></i></a>${root == false? `<a href="#" class="hapus-halaman button-list"><i class='fa fa-trash'></i></a>`:``}</div><ul>`;
        for (let i = 0; i < data.children.length; i++) {
            li += this.#recrusifRender(data.children[i])
            //   alert('tes');
        }

        let finalstring = li + '</ul></li>';
        return finalstring;
    }
}

class Halaman {
    constructor(id = null) {
        this.id;
        this.nama;
        this.deskripsi;
        this.tipe;
        this.parentId;
        this.idKelas;
        this.fileContent;
        this.children = [];
        this.contentHtml;

        if (id != null) {
            this.dapatkan(id)
        }

    }

    isiChildren(data) {
        var ctx = new Halaman();
        ctx.id = data['data']['id'];
        ctx.nama = data['data']['nama'];
        ctx.deskripsi = data['data']['deskripsi'];
        ctx.tipe = data['data']['tipe'];
        ctx.parentId = data['data']['parent_id'];
        ctx.idKelas = data['data']['id_kelas'];
        ctx.fileContent = data['data']['file_content'];
        // console.log(data['children']);
        for (let i = 0; i < data['children'].length; i++) {
            ctx.children.push(this.isiChildren(data['children'][i]))
        }
        return ctx;
    }

    dapatkan(id, params = {}) {
        var ctx = this;
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $("meta[name=csrf-token").attr('content')
            },
            url: "/halaman/" + id,
            type: "get",
            async: false,
            success: function (data) {
                // console.log(data);
                ctx.id = data['data']['id'];
                ctx.nama = data['data']['nama'];
                ctx.deskripsi = data['data']['deskripsi'];
                ctx.tipe = data['data']['tipe'];
                ctx.parentId = data['data']['parent_id'];
                ctx.idKelas = data['data']['id_kelas'];
                ctx.fileContent = data['data']['file_content'];

                var halaman = new Halaman;
                ctx.children = halaman.isiChildren(data).children;
                console.log(ctx)
                //console.log(halaman.isiChildren(data).children);
            }, error: function (err) {
                alert(err.responseText)
            }
        })
    }


    hapus() {
        var ctx = this;
        if (this.data != undefined) {
            $.ajax({
                headers: {
                    "X-CSRF-TOKEN": $("meta[name=csrf-token").attr('content')
                },
                url: "/halaman/" + ctx.id,
                type: "DELETE",
                success: function () {
                }
            })
        } else {
            console.log('pastikan data sudah terisi')
        }
    }

    buat(parentId) {
        var ctx = this
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $("meta[name=csrf-token]").attr("content")
            },
            url: "/halaman",
            type: "post",
            async: false,
            data: {
                parentId: parentId
            },
            success: function (data) {
                ctx.dapatkan(data["id"])
            }, error: function (err) {
                console.log(err)
                alert(err.responseText);
            }
        })
    }

    getFileContent() {
        var ctx = this;
        $.ajax({
            headers: {
                "X-CSRF-TOKEN": $("meta[name=csrf-token").attr('content')
            },
            url: "/halaman/" + ctx.id,
            type: "get",
            async: false,
            data: {
                onlyContent: true,
            }, success: function (content) {
                ctx.contentHtml = content['data'];
            }, error: function (err) {
                alert(err.responseText)
            }
        })
    }

}



class PageViewer {
    constructor(modal) {
        this.masterCtx;
        this.modalElement = modal;
        this.currentPage;
        this.container = new bootstrap.Modal(modal[0])
        this.halamanId;
        this.nama;
        this.deskripsi;
        this.fileContent;
        this.textoria = new Textoria(modal.find(".workspace"));

        this.#globalEventListener()

    }

    load(halaman) {
        this.currentPage = halaman
        this.halamanId = halaman.id
        this.nama = halaman.nama,
            this.deskripsi = halaman.deskripsi;
        if (halaman.fileContent != null) {
            halaman.getFileContent();
            this.fileContent = halaman.contentHtml;
        }
    }

    render() {
        this.modalElement.find(".title-input").val(this.nama);
        this.modalElement.find(".desc-input").val(this.deskripsi)
        if (this.fileContent != null) {
            this.textoria.container.html(this.fileContent)
            this.textoria.reload()
        }else{
            this.textoria.setUp()
        }
   
   
       
        this.container.show()
    }

    #globalEventListener() {
        var ctx = this
        this.modalElement.keydown(function (event) {
            var keyS = 83;

            // Check if the Ctrl key and the S key are pressed simultaneously
            if (event.ctrlKey && event.which === keyS) {
                event.preventDefault();
                // Combination detected, do something
                let inputTitle = ctx.modalElement.find(".title-input").val();
                let inputDescription = ctx.modalElement.find(".desc-input").val();
                let idPage = ctx.halamanId;

                // ctx.textoria.container.find(".dropdown-menu").removeClass("show")
                let fileContent = ctx.textoria.container.html()
                $.ajax({
                    headers: {
                        "X-CSRF-TOKEN": $("meta[name=csrf-token]").attr("content")
                    },
                    url: "/halaman/" + idPage,
                    data: {
                        nama: inputTitle,
                        desc: inputDescription,
                        fileContent: fileContent
                    },
                    type: "PUT",
                    dataType: "json",
                    success: function (data) {
                        console.log(ctx)
                        ctx.masterCtx.menu[0].aktifkan();

                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 300,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.addEventListener('mouseenter', Swal.stopTimer)
                              toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                          })
                          
                          Toast.fire({
                            icon: 'success',
                            title: 'halaman berhasil disimpan'
                          })
                    }, error: function (err) {
                        console.log(err.responseText)
                    }
                });


                console.log("Ctrl + S pressed!");
                // Prevent the default browser behavior (saving the page)

            }

        })


    }


}
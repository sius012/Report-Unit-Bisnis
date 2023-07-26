
class Helperia {
    constructor() {

    }

    static renderInput(data) {
        var form = "";
        for (let i = 0; i < data.length; i++) {
            form += Helperia.renderInputperRow(data[i], i);
        }
        return form;
    }
    static renderInputperRow(data, key = null) {
        var label = `<label class='form-label'>${data.label}</label>`
        var value = data.value == undefined ? "" : data.value
        switch (data.tag) {
            case "checkbox":
                return `<div class='form-group mb-3'><label class='form-label'>${data.label}</label><input type='checkbox' class='form-check' name='${data.name}'></div>`
                break;
            case "file":
                return `<div class='form-group mb-3'><input type='file' class='form-control' name='${data.name}'></div>`
                break;
            case "hidden":
                return `<input type='hidden' name='${data.name}' value="${value}">`;
                break;
            case "input":
                return `<div class='form-group mb-3'>${label}<input type='text' name='${data.name}' class='form-control'  value="${value}"></div>`;
                break;
            case "date":
                //eventlistener
                $(document).delegate(`input[name=${data.name}]`, "change", function (e) {
                    if (data.higher != undefined) {
                        var valueHigher = $(document).find("input[name=" + data.higher + "]");
                        if ($(this).val() >= valueHigher.val()) {
                            valueHigher.val($(this).val());
                        }
                        $(this).attr("max", valueHigher.val())
                    } else if (data.lower != undefined) {
                        var valueLower = $(document).find("input[name=" + data.lower + "]");
                        if ($(this).val() <= valueLower.val()) {
                            valueLower.val($(this).val())
                        }
                        $(this).attr("min", valueLower.val())
                    }
                })


                return `<div class='form-group mb-3'>${label}<input type='date' name='${data.name}' class='form-control'  value="${value}"></div>`;
                break
            case "select":

                let option = data.option.map(function (e) {
                    return `<option value="${e.value}">${e.text}</option>`;
                })
                let stringOption = option.join("");
                return `<div class='form-group mb-3'>${label}<select ' name='${data.name}' class='form-select'  value="${data.value}">${stringOption}</select></div>`;
                break
            case "search":

                $(document).delegate(`input[name=${data.name + "placer"}]`, "keyup", function (e) {

                    $(this).closest(".form-group").children(".container-siswa").remove();
                    var container = $(this).closest(".form-group");

                    $.ajax({
                        url: "/" + data.for,
                        type: "get",
                        data: {
                            kw: $(this).val(),
                            json: true
                        },
                        success: function (response) {
                            let ul = response.map(function (e) {
                                return `<li class='list-group-item siswa-val' value=${e['nis']}>${e["nama"]}</li>`
                            })
                            let stringUl = ul.join("")

                            container.append("<ul class='list-group container-siswa position-absolute'>" + stringUl + "</ul>")
                        }
                    })
                });

                $(document).delegate(".siswa-val", "click", function () {
                    var value = $(this).attr("value");
                    var container = $(this).closest(".form-group").find(".container-nis");
                    var listInputArr = [];
                    var listInput = container.children(".container-input").each(function () {
                        listInputArr.push($(this).find("input").attr("value"))
                    })

                    if (!listInputArr.includes(value)) {
                        container.append("<div class='p-2 container-input'><input type='hidden' name='" + data.name + "[]' value='" + $(this).attr("value") + "'><span class='badge bg-primary'>" + $(this).text() + "<a href='#' class='remove-usr pr-2' style='color: white'><i class='fa fa-times'></i></a></span></div>");
                        $(this).closest(".form-group").find(".container-siswa").hide();
                    }

                })

                $(document).delegate(".remove-usr", "click", function () {
                    var container = $(this).closest(".container-input");
                    container.remove()
                })

                return `<div class='form-group mb-3'>${label}<input type='text' name='${data.name + "placer"}' class='form-control'  value="${value}"><div class='container-nis d-flex'></div></div>`;
                break
            default:
                break;
        }
    }


    
}


function custs(text) {
    // Memisahkan kata dengan underscore menjadi array
    var words = text.split('_');

    // Mengubah huruf pertama setiap kata menjadi huruf kapital
    var capitalizedWords = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Menggabungkan kata-kata menjadi satu string dengan spasi
    var convertedText = capitalizedWords.join(' ');

    return convertedText;
}


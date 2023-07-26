class Textoria {
    constructor(container) {
        this.halaman;
        this.container = container;
        this.dropdown;

        //Other Component
        this.parentSelectedNode;
        this.rowSelectedNode;

        
        //eventListener
   
        //updateEveryKeyup
        




        this.setUp()
        var ctx = this;
        this.container.click(function(){
            
           // ctx.setUp()
            console.log(ctx.dropdown)
            ctx.dropdown.find(".dropdown-menu").removeClass("show")
        });


    }

    setUp() {
        //menambahkanClassContainer
        this.container.html("");
        this.container.addClass("container");
        this.container.attr("contenteditable", true)
        this.container.css("outline", "none")
        this.container.append("<div class='row'><p>Ketik Materi</p></div>")

        //menambahkanDropdownList
        var dropdown = $("<div>").attr("contenteditable", false).addClass('dropdown').html(`
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="#" data-type="header1">Header 1</a></li>
            <li><a class="dropdown-item" href="#" data-type="header2">Header 2</a></li>
            <li><a class="dropdown-item" href="#" data-type="header3">Header 3</a></li>
        </ul>`);
        this.container.append(dropdown)
        this.dropdown = dropdown;
        this.container.on('keydown',()=> this.workspaceListenerFunction(event));
        this.container.delegate(".dropdown-item", "click", ()=>this.selectDropdownItem(event)
        )
        
    }

    reload(){
        this.dropdown = this.container.find(".dropdown");
    }

    selectDropdownItem(event){
        let type = $(event.target).data('type');

        var theElement;
        switch (type) {
            case "header1":
                this.rowSelectedNode.html('')
                theElement = $("<h3>").text("Ini Judul")
                this.rowSelectedNode.append(theElement)
                break;

            case "header2":
                this.rowSelectedNode.html('')
                theElement = $("<h5>").text("Ini Judul")
                this.rowSelectedNode.append(theElement)
                break;

            case "header3":
                this.rowSelectedNode.html('')
                theElement = $("<h6>").text("Ini Judul")
                this.rowSelectedNode.append(theElement)
                break;

            case "detail":
                this.rowSelectedNode.html('')
                theElement = $("<details>").html(`
                    <summary>Detail</summary>
                    <p>isi disini</p>
                    `);
                this.rowSelectedNode.append(theElement)
                break;
        
            default:
                break;
        }

        // var jarak = document.createRange();
        // jarak.selectNodeContents(theElement[0]);

        // var selection = window.getSelection();

        // if (jarak.startOffset < jarak.endOffset) {
        //   jarak.collapse(false);
        // } else {
        //   jarak.collapse(true);
        // }

        // selection.removeAllRanges();
        // selection.addRange(jarak);
    }

    workspaceListenerFunction(event) {
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);

        this.parentSelectedNode = $(range.startContainer.parentNode)
        this.rowSelectedNode = $(range.startContainer.parentNode).closest(".row")
        
        if (event.key === 'Enter') {
            var caretPosition = range.startOffset;
            var textLength = range.startContainer.textContent.length
            if (this.rowSelectedNode.length > 0) {
                let caretAfter = range.startContainer.textContent.charAt(caretPosition)
                let whiteSpace = caretAfter.trim() === ""
                console.log(textLength+"&"+caretPosition)
                if ((textLength == caretPosition) || whiteSpace) {

                    event.preventDefault();
                    var newRow = $("<div>").addClass("row").attr("new", true)
                    var newText = $("<p>").html('&nbsp;');
                    newText.appendTo(newRow)
                    this.rowSelectedNode.after(newRow)
                    var range = document.createRange();
                    range.selectNodeContents(newText[0]);
                    range.collapse(true);

                    var selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);

                }
            
            } else {

            }

            // var newElement = $('<p>').text('Baris baru');
            // if (node.nodeType === 3) {
            // var text = node.textContent;
            // var textBeforeCaret = text.substring(0, caretPosition);
            // var textAfterCaret = text.substring(caretPosition);
            // node.textContent = textBeforeCaret;
            // var textNode = document.createTextNode(textAfterCaret);
            // node.parentNode.insertBefore(newElement[0], node.nextSibling);
            // node.parentNode.insertBefore(textNode, newElement[0].nextSibling);
            // } else {
            // $(this).append(newElement);
            // }
        } else if (event.key == "Backspace") {
            let workspaceLength = this.container.children(".row").length;
            console.log(this.parentSelectedNode)
            //alert(workspaceLength)
            if (this.parentSelectedNode.text().length < 1 && workspaceLength < 2) {
                event.preventDefault()
            }
            if (this.rowSelectedNode.attr("new") == "true") {
                console.log(this.parentSelectedNode.children("p"));
                console.log(this.parentSelectedNode.find("p"))
                this.rowSelectedNode.attr("new", false)
            }
        } else if (event.key == "/") {
            console.log(this.dropdown)

            this.dropdown.find(".dropdown-menu").addClass("show");
        }
    }


    save(){
        this.halaman.saveFileContent(this.container);
    }
}
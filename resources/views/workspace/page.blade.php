<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{asset('css/bootstrap.min.css')}}" rel="stylesheet"  crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="{{asset('js/app.js')}}"></script>
    <title>Document</title>
    <style>
        .workspace:focus{
            border: 0px;
            outline: none;
        }
    </style>
</head>
<body>
    <div class="container workspace m-3 p-3   " contenteditable="true">
        <div class="row"><h3>Workspace Penulisan Materi</h3></div>
        <div class="row">
            <details>
                <summary>Epcot Center</summary>
                <p class="pl-3">Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
              </details>
        </div>
        <div class="dropdown " contenteditable="false" >    
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#" data-type="header1">Header1</a></li>
              <li><a class="dropdown-item" href="#" data-type="header2">Header2</a></li>
              <li><a class="dropdown-item" href="#" data-type="header3">Header3</a></li>
              <li><a class="dropdown-item" href="#" data-type="detail">Detail</a></li>
            </ul>
          </div>

        
    </div>
    
</body>
<script>
    class Workspace {
        constructor(workspace){
            this.workpageElement = workspace
            this.selected;
        }

        attachSelection(){}

    
    }
</script>
<script>
    $(document).ready(function(){
        $(".workspace").keyup(function(){
            //document.getElementsByTagName("link"); for (var i = 0; i < links.length;i++) { var link = links[i]; if (link.rel === "stylesheet") {link.href += "?"; }}
        })
        var workspace = $(".workspace");
        var dropdown = $(".workspace").find(".dropdown").find(".dropdown-menu");

        workspace.click(function(){
            dropdown.removeClass("show");
        })
        var parentNode;
        var rowNode
        $('.workspace').on('keydown', function(event) {
        
            var selection = window.getSelection();
            var range = selection.getRangeAt(0);

            parentNode = $(range.startContainer.parentNode)
            rowNode = $(range.startContainer.parentNode).closest(".row")
            if (event.key === 'Enter') {
            

            
            var caretPosition = range.startOffset;
            var textLength = range.startContainer.textContent.length
            console.log(rowNode)
            console.log(textLength+"&"+caretPosition);

            if(rowNode.length > 0){
                
                if(textLength == caretPosition){
                
                event.preventDefault();
                var newRow = $("<div>").addClass("row").attr("new",true)
                var newText = $("<p>").html('&nbsp;');
                    newText.appendTo(newRow)
                rowNode.after(newRow)
                var range = document.createRange();
                range.selectNodeContents(newText[0]);
                range.collapse(true);

                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                
            }
            }else{

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
        }else if(event.key == "Backspace"){
            let workspaceLength = workspace.children(".row").length;
            console.log(parentNode)
            //alert(workspaceLength)
            if(parentNode.text().length < 1 && workspaceLength < 2){
                event.preventDefault()
            }
            if(rowNode.attr("new")=="true"){
                console.log( parentNode.children("p"));
                console.log(parentNode.find("p"))
                rowNode.attr("new",false)
            }
        }else if(event.key == "/"){
            dropdown.addClass("show");
        }
      });

    dropdown.find(".dropdown-item").click(function(){
        let type = $(this).data('type');
        var theElement;
        switch (type) {
            case "header1":
                rowNode.html('')
                theElement = $("<h3>").text("Ini Judul")
                rowNode.append(theElement)
                break;

            case "header2":
                rowNode.html('')
                theElement = $("<h5>").text("Ini Judul")
                rowNode.append(theElement)
                break;

            case "header3":
                rowNode.html('')
                theElement = $("<h6>").text("Ini Judul")
                rowNode.append(theElement)
                break;

            case "detail":
                rowNode.html('')
                theElement = $("<details>").html(`
                    <summary>Detail</summary>
                    <p>isi disini</p>
                    `);
                rowNode.append(theElement)
                break;
        
            default:
                break;
        }

        var jarak = document.createRange();
        jarak.selectNodeContents(theElement[0]);

        var selection = window.getSelection();

        if (jarak.startOffset < jarak.endOffset) {
          jarak.collapse(false);
        } else {
          jarak.collapse(true);
        }

        selection.removeAllRanges();
        selection.addRange(jarak);

    })
    

    })

    
</script>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link href="{{asset('css/bootstrap.min.css')}}" rel="stylesheet"  crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="{{asset('js/app.js')}}"></script>

    <meta name="csrf-token" content="{{csrf_token()}}">
    <style>
        .sidebar{
            background: rgb(45, 48, 96);
            height: 100vh;
            padding: 10px;
        }

        .sidebar ul{
            list-style-type: none;
            
        }

        .sidebar ul li{
            color: white;
           
        }

        .sidebar ul li a{
            display: block;
            color: white;
            text-decoration: none;
            padding: 10px;
            
        }

        .sidebar ul li a:hover{
            background: rgb(138, 138, 138);
        }

        .container-list{
            list-style-type: none;
        }

        .container-list li .page-open{
            text-decoration: none;
            color:black;
            padding: 10px;
            font-weight: medium;
            display: inline-block;
        }
        

        .container-list li{
            text-decoration: none;
            color:black;
            padding: 2px;
            width: 1000px;
            display: block;
        }

        .container-list li .page-open:hover{
            text-decoration: none;
            padding: 10px;
            background-color: rgb(179, 179, 179)
        }

        .button-list{
            padding: 10px
        }

        
        .animasia-title{
            color: white
        }

        .modal-dialog-right{
           position: fixed;
            top: 0;
            right: 0;
            transform: translateX(0);
            margin: 1;
            width: 50%;
            box-shadow: 0px 0px 3px -2px black
        }

        .side-modal-content{
            background: white;

        }

    </style>
</head>
<body>
    <div class="container-fluid p-0">
        <div class="row">
            <div class="col-2">
                <div class="sidebar">
                    <h4 class="animasia-title p-2">Animasia</h4>
                    <ul>
                        <li><a href="{{route('animasia.materi')}}">Materi</a></li>
                        <li><a href="{{url('projek')}}">Projek</a></li>
                        <li><a href="">Konfigurasi</a></li>
                    </ul>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="col  m-2"><h4>@yield("title")</h4></div>
                </div>
                <div class="content p-3">
                    @yield("content")
                </div>
            </div>
        </div>
    </div>
    <aside>
        
    </aside>

    <script src="{{asset('js/afterapp.js')}}"></script>
    <script src="{{asset('js/bootstrap.min.js')}}"></script>

    <script src="{{asset('js/filedocument.js')}}"></script>
    <script src="{{asset('js/textoria.js')}}"></script>
    <script src="{{asset('js/Model/Projek.js')}}"></script>
    <script src="{{asset('js/Model/Tugas.js')}}"></script>
    <script src="{{asset('js/Helper/Helperia.js')}}"></script>
    @stack('js')
</body>
</html>
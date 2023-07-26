<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="{{asset('js/app.js')}}"></script>
    <meta name="csrf-token" content="{{csrf_token()}}">
</head>
<body>
    <script src="{{asset('js/Model/Projek.js')}}"></script>
    <script src="{{asset('js/Model/Tugas.js')}}"></script>
    <script>

        $(document).ready(function(){
            var projek= Projek.getList();
            console.log(projek);

            var tugas = Tugas.semuaTugas(1);
            console.log(tugas);
        })
    </script>
</body>
</html>
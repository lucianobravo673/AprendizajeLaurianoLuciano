<?php 
    $archivoJSON = file_get_contents('php://input');

    // Decodificar el objeto JSON en un array asociativo, u objeto literal para php
    $data = json_decode($archivoJSON, true);

    // Acceder a los datos del objeto
    $solicitud = $data['solicitud'];

    //if ($data['solicitud'] === 'true') {
        //Creamos la consulta para que devuelva siempre en forma de tablas 
        $conex = mysqli_connect("localhost", "root", "", "laboratorio");
        $sqlLeerAlumnos = "SELECT * FROM alumnos";
        $queryLeerAlumno = mysqli_query($conex, $sqlLeerAlumnos);
        $listaAlumnos = []; // Crear un array para almacenar los alumnos

        while($respuestaLeerAlumno = mysqli_fetch_assoc($queryLeerAlumno)){
            $objetoAlumno = [
                'id' => $respuestaLeerAlumno['ID'],
                'nombre' => $respuestaLeerAlumno['Nombre'],
                'dni' => $respuestaLeerAlumno['DNI'],
                'direccion' => $respuestaLeerAlumno['Direccion']
            ];
            array_push($listaAlumnos, $objetoAlumno);        
        }
    // }
    // else{
    //     $listaAlumnos = ["No existe nada"];
    // }
    echo json_encode($listaAlumnos); // Imprimir el array completo como JSON
?>
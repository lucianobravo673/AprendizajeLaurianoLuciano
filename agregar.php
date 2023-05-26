<?php 
    // Obtener el objeto JSON enviado desde JavaScript
    $archivoJSON = file_get_contents('php://input');

    // Decodificar el objeto JSON en un array asociativo, u objeto literal para php
    $data = json_decode($archivoJSON, true);

    // Acceder a los datos del objeto
    $nombre = $data['nombre'];
    $dni = $data['dni'];
    $direccion = $data['direccion'];

    //Verificamos que lo que nos haya llegado tenga algún dato válido, y entonces...
    if (!empty($nombre) and !empty($dni) and !empty($direccion)) {
        $conex = mysqli_connect("localhost", "root", "", "laboratorio");
        $sqlNuevoAlumno = "INSERT INTO alumnos (ID, Nombre, DNI, Direccion) VALUES ('', '$nombre', '$dni', '$direccion')";
        $queryNuevoAlumno = mysqli_query($conex, $sqlNuevoAlumno);
        
        //
        $respuesta = [
            'status' => 'success',
        ];
    }
    else if(empty($nombre) and empty($dni) and empty($direccion)){
        $respuesta = [
            'status' => 'datoVacio',
        ];
    }
    else if(empty($nombre) or empty($dni) or empty($direccion)){
        $respuesta = [
            'status' => 'errorDato',
        ];
    }
    else{
        $respuesta = [
            'status' => 'error',
        ];        
    }
    echo json_encode($respuesta);
?>
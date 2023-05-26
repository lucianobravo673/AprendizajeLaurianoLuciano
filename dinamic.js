//Creamos la función que se va a encargar de cargar un nuevo alumno, y que va a mostrar la tabla
let objetoNuevoAlumno = function(){
    // Una vez llamada la función, recuperamos los valores y los asignamos a variables
    var nombre = document.getElementById("name").value;
    var dni = document.getElementById("dni").value;
    var direccion = document.getElementById("direc").value;
    var mensajeDiv = document.createElement("div");
    mensajeDiv.setAttribute("id", "mensaje");


    // Creamos un objeto con los valores que recuperamos del formulario html
    let objetoAlumnoNuevo = {
        nombre: nombre,
        dni: dni,
        direccion: direccion
    };

    // Convertimos a formato JSON nuestro objeto
    alumnoNuevoJSON = JSON.stringify(objetoAlumnoNuevo);

    //Realizamos petición AJAX para enviar al servidor 'server.php'
    fetch('agregar.php', {
        method: 'POST',
        body: alumnoNuevoJSON
      })

    //Creamos las funciones tipo callback que se ejecutarán con la respuesta del servidor, es decir que lo que devuelva
    //el servidor, será captado por estas funciones, la primera convierte a json la respuesta del servidor
    .then(function(respuesta){ 
        return respuesta.json();
    })

    //La segunda función sirve para trabajar los 3 posibles escenarios que existan, tomando como parámetro, o como 
    //argumento de la función, a data, que data, es el archivo json de respuesta.
    .then(function(data){
        if(data.status === 'success'){
            mensajeDiv.textContent = "Datos cargados correctamente";
            leerAlumnos();
        }
        else if(data.status === 'errorDato'){
            mensajeDiv.textContent = "Error, hay algún campo vacío";
        }
        else if(data.status === 'datoVacio'){
            mensajeDiv.textContent = "Error, no hay datos para enviar";
        }
        else if(data.status === 'error'){
            mensajeDiv.textContent = "Existe un error";
        }
    })
    //La tercera función nos sirve para poder manejar los errores, o posibles errores.
    .catch(function(error){
        document.write("Error ",error);
    })
    document.body.appendChild(mensajeDiv);
}

// Ejecutamos la función que realizará el proceso a la base de datos
formulario = document.getElementById("formularioNuevoAlumno");
formulario.onsubmit = function(e){
    e.preventDefault();
    objetoNuevoAlumno();
    formulario.reset();
}

let leerAlumnos = function(){
    let solicitar = {
        solicitud : "true",
    }
    solicitudjson = JSON.stringify(solicitar);

    fetch('leer.php', {
        method: 'POST',
        body: solicitudjson
      })
    .then(function(respuestaServidor){
        return respuestaServidor.json();
    })
    .then(function(datos) {
        var tabla = document.getElementById("tablaAlumnos");
    
        datos.forEach(function(alumno) {
            // Crear una nueva fila y celdas
            var fila = tabla.insertRow();
    
            // Agregar celdas a la fila
            var celdaNombre = fila.insertCell();
            var celdaDNI = fila.insertCell();
            var celdaDireccion = fila.insertCell();
    
            // Agregar contenido a las celdas
            celdaNombre.innerHTML = alumno.nombre;
            celdaDNI.innerHTML = alumno.dni;
            celdaDireccion.innerHTML = alumno.direccion;
        });
    })
}
botonLeer = document.getElementById("leer");
botonLeer.addEventListener("click", leerAlumnos);
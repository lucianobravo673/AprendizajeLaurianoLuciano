const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
    nombre : {type : String, require : true},
    apellido : {type : String, require : true},
    dni : {type : String, require : true},
    telefono : {type : String, require : true},
    fNacimiento : {type : String, require : true},
    direccion : {type : String, require : true},
    mail : {type : String, require : true},
});

let Alumno = mongoose.model('Alumno', alumnoSchema);
module.exports = Alumno;
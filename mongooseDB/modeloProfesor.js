const mongoose = require('mongoose');

const profesorSchema = new mongoose.Schema({
    nombre : {type : String, require : true},
    apellido : {type : String, require : true},
    dni : {type : String, require : true},
    telefono : {type : String, require : true},
});

let Profesor= mongoose.model('Profesor', profesorSchema);
module.exports = Profesor;
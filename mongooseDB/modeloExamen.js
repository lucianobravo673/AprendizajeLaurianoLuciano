const mongoose = require('mongoose');

const examenSchema = new mongoose.Schema({
    materia : {type : String, require : true},
    descripcion : {type : String, require : true},
});

let Examen= mongoose.model('Examen', examenSchema);
module.exports = Examen;
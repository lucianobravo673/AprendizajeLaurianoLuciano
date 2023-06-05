const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
    nombre : {type : String, require : true},
    duracion : {type : String, require : true},
    yearCarrera : {type : String, require : true},
});

let Materia= mongoose.model('Materia', materiaSchema);
module.exports = Materia;
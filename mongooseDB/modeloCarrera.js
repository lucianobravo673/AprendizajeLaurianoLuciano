const mongoose = require('mongoose');

const carreraSchema = new mongoose.Schema({
    nombre : {type : String, require : true},
    duracion : {type : String, require : true},
});

let Carrera= mongoose.model('Carrera', carreraSchema);
module.exports = Carrera;
var hbs = module.exports = require('hbs');

hbs.registerHelper('dateHelper', function(date){
  var month = date.substr(0,2);
  var day = date.substr(3,2);
  var year = date.substr(6,4);
  return year + "-" + month + "-" + day;
});
hbs.registerHelper('genderHelper', function(gender){
  var result;
  if (gender.substr(0,1)=='m') {
    result = "<option selected='selected'>Masculino</option><option>Femenino</option>";
  } else{
    result = "<option>Masculino</option><option selected='selected'>Femenino</option>";
  }
  return result;
});
hbs.registerHelper('destinoHelper', function(destino){
  var temp = "<option>Auto</option><option>Compras</option><option>Emprendimiento personal</option><option>Estudios</option><option>Remodelación del hogar</option><option>Viaje</option><option>Otros</option>";
  var result = temp.replace("<option>" + destino, "<option selected='selected'>" + destino); 
  return result;
});
hbs.registerHelper('fuenteHelper', function(fuente){
  var temp = "<option>Empleo</option><option>Independiente</option><option>Otros</option>";
  var result = temp.replace("<option>" + fuente, "<option selected='selected'>" + fuente); 
  return result;
});

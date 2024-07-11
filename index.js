const { DateTime } = require('luxon');

const fechaHoy = DateTime.now();
const fechaNac = DateTime.fromISO('1991-03-21');
if(fechaHoy.isValid && fechaNac.isValid){
    const days = fechaHoy.diff(fechaNac).as('days');
    const diasRedondeados = Math.floor(days);
    console.log(`Han pasado ${diasRedondeados} dias desde que nací!!`);
}
else{
    console.log('Fecha inválida!!');
}




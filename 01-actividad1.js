const generarNumeroAleatorio = (cantidad) => {
    const numeros = [];
    for(let i=0; i < cantidad; i++){
        const numeroAletorio = Math.floor(Math.random() * 20) + 1;
        numeros.push(numeroAletorio);
    }
    return numeros;
}

function contarFrecuenciaNumero(numeros) {
    return new Promise((resolve, reject) => {
        const frecuencia = {};
        for(const numero of numeros){
            if(frecuencia[numero]){
                frecuencia[numero]++;
            }
            else{
                frecuencia[numero] = 1;
            }
        }
        resolve(frecuencia);
    });
}

const cantidadNumerosAleatorios = 10000;

const numeros = generarNumeroAleatorio(cantidadNumerosAleatorios);

console.log('Los numeros aleatoreos se generaron');

contarFrecuenciaNumero(numeros).then(result => {
    console.log(result);
})

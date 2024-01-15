const cronometro = document.getElementById('cronometro')
const botonInicioPausa = document.getElementById("boton-inicio-pausa");
const botonReiniciar = document.getElementById("boton-reiniciar");

let [horas, minutos, segundos] = [0, 0, 0]; 

let intervaloDeTiempo;  //variable para el intervalo de tiempo que debe transcurrir antes de actualizar
                      //  el cronometro y su estado, si anda , si esta pausado  
                      
let  estadoCronometro = "pausado" //dos estados posibles, andando o pausado 

function actualizarCronometro(){
    segundos++; // cuando se llama a esa funcion como minimo trascurre un segundo
    
    if(segundos / 60 === 1){
        segundos = 0;
        minutos++; 
    }

    if(minutos / 60 === 1){
        minutos = 0;
        horas++;
    }

    const segundoConFormato = asignarFormato(segundos);
    const minutosConFormato = asignarFormato(minutos);
    const horasConFormato = asignarFormato(horas); 

    cronometro.innerText = `${horasConFormato}:${minutosConFormato}:${segundoConFormato}`;
}

function asignarFormato(unidadTiempo){
    return unidadTiempo < 10 ? '0' + unidadTiempo : unidadTiempo; 
}

botonInicioPausa.addEventListener('click', function(){
    if(estadoCronometro === 'pausado'){
        intervaloDeTiempo = window.setInterval(actualizarCronometro,1000) // son 1000 milisegundos
        botonInicioPausa.innerHTML = '<i class="bi bi-pause-fill"></i>' //modifica el html interno y se le asigna un icon de bootstrap que debe ir entre commillas por que asigna como una cadena de caracteres
        botonInicioPausa.classList.remove('iniciar'); // se elimina la clase inciar
        botonInicioPausa.classList.add('pausar');
        estadoCronometro = 'andando'
    } else{ // condicion si el cronometro no esta pausado, cuando esta en estado andando
        window.clearInterval(intervaloDeTiempo);
        botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
        botonInicioPausa.classList.remove('pausar');
        botonInicioPausa.classList.add('iniciar');
        estadoCronometro = 'pausado';
        }
}); 


botonReiniciar.addEventListener('click',function(){
    window.clearInterval(intervaloDeTiempo);

    horas = 0;
    minutos = 0;
    segundos = 0;

    // reiniciar
    cronometro.innerText ='00:00:00'

    // actualizar botones
    botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
    botonInicioPausa.classList.remove('pausar');
    botonInicioPausa.classList.add('iniciar');

    estadoCronometro = '´pausado';

});




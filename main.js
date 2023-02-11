//inicializar variables
let destapados=0;
let tarjeta1=null;
let tarjeta2=null;
let primerResultado=null;
let segundoResultado=null;
let Movimientos=0;
let Aciertos=0;
let Temporizador=false;
let Timer=30;
let timerInicial=Timer;
let TiempoRegresivo=null;
//apuntar a documento html
let mostrarMovimientos=document.getElementById('Movimientos');
let mostrarAciertos=document.getElementById('Aciertos');
let mostrarTiempo=document.getElementById('T-Restante');

//audio
let winAudio= new Audio('./sounds/win.wav');
let loseAudio= new Audio('./sounds/lose.wav');
let clickAudio= new Audio('./sounds/click.wav');
let rightAudio= new Audio('./sounds/right.wav');
let wrongAudio= new Audio('./sounds/wrong.wav');


let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros=numeros.sort(()=>{return Math.random()-0.5});

function contarTiempo(){
   TiempoRegresivo= setInterval(()=>{
        Timer--;
        mostrarTiempo.innerHTML=`Tiempo: ${Timer} segundos`;
        if(Timer==0){
            clearInterval(TiempoRegresivo);
            bloquearTarjetas();
            loseAudio.play();
        }
    },1000);
}


function bloquearTarjetas(){
    for(let i = 0 ; i <=15; i++){
        let tarjetaBloqueada=document.getElementById(i);
        tarjetaBloqueada.innerHTML=`<img src="./images/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled=true;

    }
    mostrarAciertos.innerHTML=`Aciertos: ${Aciertos} 👎 `;
    mostrarMovimientos.innerHTML=`Movimientos: ${Movimientos} 😔`;
}


function destapar(id){

    if(Temporizador==false){
        contarTiempo();
        Temporizador=true;
    }

    destapados++;

    if(destapados==1){
        //mostrar el primer numero
        tarjeta1=document.getElementById(id);
        primerResultado=numeros[id];
        tarjeta1.innerHTML=`<img src="./images/${primerResultado}.png" alt="">`;
        clickAudio.play();
        //desabilitar el boton 1
        tarjeta1.disabled=true;

    }
    else if (destapados==2){
         //mostrar el primer numero
         tarjeta2=document.getElementById(id);
         segundoResultado=numeros[id];
         tarjeta2.innerHTML=`<img src="./images/${segundoResultado}.png" alt="">`;
 
         //desabilitar el boton 1
         tarjeta2.disabled=true;

         //incrementar Movimientos
         Movimientos++;
        mostrarMovimientos.innerHTML=`Movimientos: ${Movimientos}`;
    

    if(primerResultado==segundoResultado){
        //reinicio de las tarjetas destapadas
        destapados=0;
        rightAudio.play();
        //aumento de aciertosd
        Aciertos++;
        mostrarAciertos.innerHTML=`Aciertos: ${Aciertos}`;

        if(Aciertos==8){
            //Mostrar mensajes Finales
            clearInterval(TiempoRegresivo);
            mostrarAciertos.innerHTML=`Aciertos: ${Aciertos} 👍`;
            mostrarTiempo.innerHTML=`¡Genial! 🎉 solo tardaste ${timerInicial-Timer} segundos`
            mostrarMovimientos.innerHTML=`Movimientos: ${Movimientos} 😎`;
            winAudio.play();
        }
    }else{
        wrongAudio.play();
        //mostrar momentaneamente y volver a ocultar
        setTimeout(()=>{
            tarjeta1.innerHTML=' ';
            tarjeta2.innerHTML=' ';
            tarjeta1.disabled=false;
            tarjeta2.disabled=false;
            destapados=0;
        },300);
    }
}
}
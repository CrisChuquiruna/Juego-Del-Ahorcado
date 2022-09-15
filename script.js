
var palabras = ["MANZANA", "FRUTILLA", "ALURA", "HTML", "ARGENTINA"];

const boton_iniciar = document.getElementById("start");
const menu = document.getElementById("menu");
const div_letras_erradas = document.getElementById("letras_erradas");
const cartel = document.getElementById("cartel");
const interfaz_juego = document.getElementById("intefaz_juego");
interfaz_juego.style.display = "none";
const imgagen_ahorcandose = document.getElementById("imagen")

var lista_h1 = [];
var palabra_aleatoria = crear_palabra_secreta();
var lista_letras_usadas = [];
var letras_falladas = [];
var contador_perder = 1;
var contador_ganar = 0;

function agregar_palabra(){
    menu.style.display = "none";  
    document.getElementById("agregar_palabra").style.display = "block";
    
}
function cancelar(){
    menu.style.display = "block";
    document.getElementById("agregar_palabra").style.display = "none";
}
function guardaryjugar(){
    console.log(document.getElementById("textarea").value.toUpperCase());
    palabras.push(document.getElementById("textarea").value.toUpperCase());
    document.getElementById("agregar_palabra").style.display = "none";
    iniciar_juego();
}
function crear_palabra_secreta(){    
    function getRandomInt(max){
        return Math.floor(Math.random() * max);
    }    
    return palabras[getRandomInt(palabras.length)]
}
function borrar_guiones(){ 
    for(i = 0; i<lista_h1.length; i++){
        var h1 = document.createElement("h1");
        letras_acertadas.removeChild(lista_h1[i]);
    }
    lista_h1 = [];
}
function generar_guiones(){ 
    for(i = 0; i<palabra_aleatoria.length; i++){
        var h1 = document.createElement("h1");
        letras_acertadas.appendChild(h1);
        lista_h1.push(h1);
    }
}
function iniciar_juego(){
    imgagen_ahorcandose.src = "imagenes/Ahorcado_1.png";
    palabra_aleatoria = crear_palabra_secreta();

    console.log(palabra_aleatoria);
    terminar_evento()
    borrar_guiones(); 
    generar_guiones();
    
    document.addEventListener('keydown', evento_teclado, false);
    

    menu.style.display = "none";    
    interfaz_juego.style.display = "block";
}

function rendirse(){
    interfaz_juego.style.display = "none";
    menu.style.display = "block"
}
function es_una_letra(caracter){
    let ascii = caracter.toUpperCase().charCodeAt(0);
	return (isNaN(caracter) && ascii > 64 && ascii < 91);
}

// Escuchar teclado
function terminar_evento(){
    document.removeEventListener('keydown', evento_teclado, false);
    lista_letras_usadas = [];
    letras_falladas = "";
    div_letras_erradas.innerHTML =letras_falladas;
    contador_ganar = 0;
    contador_perder = 1;
    cartel.innerHTML = "";
}
function cuantas_letras_tiene(palabra){
    lista = [];
    for (i=0; i<= palabra.length; i++){
        if (!lista.includes(palabra[i])){
            lista.push(palabra[i]);
        } 
    }
    return lista.length - 1;
}
function evento_teclado(event){
    var keyValue = (event.key.toUpperCase()); 
    if(es_una_letra(keyValue)){        
        if (palabra_aleatoria.includes(keyValue) && !lista_letras_usadas.includes(keyValue)){
            lista_letras_usadas.push(keyValue);        
            contador_ganar ++;
            console.log("Puntos para ganar: "+ cuantas_letras_tiene(palabra_aleatoria)+ " Puntos actuales: " + contador_ganar);
            for (i = 0; i<palabra_aleatoria.length; i++){
                if (palabra_aleatoria[i]== keyValue){                
                    lista_h1[i].innerHTML = palabra_aleatoria[i];
                }
            }
            if(contador_ganar==cuantas_letras_tiene(palabra_aleatoria)){
                cartel.innerHTML = "GANASTE";
            }
            
        }
        else{
            if (!lista_letras_usadas.includes(keyValue)){
                lista_letras_usadas.push(keyValue);
                letras_falladas += keyValue + " ";
                div_letras_erradas.innerHTML =letras_falladas; 
                contador_perder++;
                imgagen_ahorcandose.src = "imagenes/Ahorcado_"+ contador_perder +".png";
                if(contador_perder == 7){
                    terminar_evento();
                    cartel.innerHTML = "GAME OVER";
                }        
            }
        }
    }
}

boton_iniciar.onclick = iniciar_juego;
document.getElementById("add").onclick = agregar_palabra;
document.getElementById("cancelar").onclick = cancelar;
document.getElementById("guardar").onclick = guardaryjugar;
document.getElementById("rendirse").onclick = rendirse;
document.getElementById("nuevo_juego").onclick = iniciar_juego;
var piezas=[];
var dificultad=1;
var felicitar = 6;
var contenedorpiezas=document.getElementById('contenedorpiezas');
var completo=document.getElementById('completo');
var juega=document.getElementById('juega');
var tablero=document.getElementById('puzzle');
var score=document.getElementById('score');
var widthpe= "720px";
var heightpe= "825px";
var widthp= "720px";
var heightp= "825px";
var errores=0;
tablero.style.width = widthp;
tablero.style.height = heightp;
var principiante=document.getElementById('principiante');
var facil=document.getElementById('facil');
var intermedio=document.getElementById('intermedio');
var experto=document.getElementById('experto');


function jugar(){
    errores=0;
    dificultad===1 ? felicitar=6: dificultad===0 ? felicitar= 4 : dificultad===2 ? felicitar=8 : felicitar=16; //dificultades
    score.innerHTML='';
    piezas=[];
    completo.innerHTML=`<img src="piezas/completo.jpg"  alt="completo">`;
    eliminarnodos(tablero);
    eliminarnodos(contenedorpiezas);
    crearpiezas(felicitar);
    mostrarpiezas(piezas);
}//vuelve a presentar las piezas para que se juegue, antes llama a eliminar piezas y contenedores

function eliminarnodos(padre){
    while(padre.childNodes.length>0){
        padre.removeChild(padre.childNodes.item(0));
    }
}//elimina piezas y contenedores

function crearpiezas(felicitar=6){
    for (let i=0;i<felicitar;i++){
        piezas.push(i);}
    piezas=desordenar(piezas);
}//crea un array con 6 elementos y llama a la funcion para desordenar

function desordenar(piezas){
    var entreverado=[];
    while(piezas.length){
        var index=Math.floor(Math.random()*piezas.length);
        entreverado.push(piezas[index]);
        piezas.splice(index,1);
    }
    return entreverado;
}//le paso una lista y la desordena

function mostrarpiezas(piezas){
    piezas.forEach(element => {
        var pieza=document.createElement('div');
        pieza.style.backgroundImage=`url("piezas/${dificultad}/${element}.jpg")`;
        pieza.draggable=true;
        pieza.className='pieza'
        pieza.style.width = widthpe;
        pieza.style.height = heightpe;
        pieza.id=element;
        contenedorpiezas.appendChild(pieza)
        
    });
    completo.innerHTML=`<br><img src="piezas/${dificultad}/completo.jpg"  alt="completo">`;

    tablero.style.width = widthp;
    tablero.style.height = heightp;
    for(let i=0;i<piezas.length;i++){
        var espaciopieza=document.createElement('div');
        espaciopieza.className='espaciopieza';
        espaciopieza.style.width = widthpe;
        espaciopieza.style.height = heightpe;
        espaciopieza.dataset.id=i;
        tablero.appendChild(espaciopieza);
    }
}//muestra las piezas y a la izquierda crea sus contenedores

tablero.addEventListener('dragover', e=>{
    e.preventDefault();
    e.target.classList.add('hover');});
//controlo que hacer si esta arriba el drag

tablero.addEventListener('dragleave', e=>{
    e.target.classList.remove('hover');
})
//que hacer cuando ya no este arriba el drag 

contenedorpiezas.addEventListener('dragstart', e=>{
    e.dataTransfer.setData('id',e.target.id);
})
//que hacer una vez que se comenzo a arrastrar

tablero.addEventListener('drop', e=>{
    e.target.classList.remove('hover');
    var moviendo=e.dataTransfer.getData('id');
    if(e.target.dataset.id===moviendo){ 
        e.target.appendChild(document.getElementById(moviendo));
        e.target.classList.remove('espaciopieza');
        felicitar--;
        if(felicitar===0){
            var ganaste=document.createElement('div');
            ganaste.classList.add('ganaste');
            var texto=document.createElement('h1');
            texto.innerHTML='GANASTE!!';
            texto.classList.add('texto');
            juega.disabled=true;
            ganaste.appendChild(texto);
            contenedorpiezas.appendChild(ganaste);
            score.innerHTML=`<h1>Score:<br>${errores} errores</h1>`
            
            }
    }else{errores++;}

});
//que hago cuando lo suelto

function principiantef(){
    dificultad=0;widthpe= "350px";heightpe= "412px";widthp= "720px";heightp= "824px";
    juega.disabled=false;
    principiante.disabled=true;
    experto.disabled=false;
    intermedio.disabled=false;
    facil.disabled=false;

}// carpeta 0 4 piezas .  

function facilf(){
    dificultad=1; widthpe= "350px";heightpe= "275px";widthp= "720px";heightp= "825px";
    juega.disabled=false;
    facil.disabled=true;
    intermedio.disabled=false;
    experto.disabled=false;
    principiante.disabled=false;


}// carpeta 1 6 piezas .  tiburon

function intermediof(){dificultad=2;
    widthpe= "350px";heightpe= "206px";
    widthp= "720px";heightp= "825px";
    juega.disabled=false;
    intermedio.disabled=true;
    experto.disabled=false;
    principiante.disabled=false;
    facil.disabled=false;



}// carpeta 2 8 piezas .  

function expertof(){dificultad=3;
    experto.disabled=true;
    intermedio.disabled=false;
    facil.disabled=false;


    widthp= "720px";heightp= "826.3px";
    widthpe= "175px";heightpe= "206px";
    juega.disabled=false;
    principiante.disabled=false;

}// carpeta 3 16 piezas .  





//.style.width = "300px";
//.style.height = "300px"

//.setAttribute(“width”,640);
//.setAttribute(“height”, 300);
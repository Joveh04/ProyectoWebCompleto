comprobarLogin()
var historial = [];
Window.onload = cargarHistorial();
if(historial==null){
  historial=[];
  imprimirHistorial()
};

function limpiar() {
  document.getElementById("calculadora").reset();
};

function borrarHistorial(){
  window.localStorage.clear();
  location.reload();
};
 
function notificacion(){
  Swal.fire({
    position: 'center',
    background:'black',
    color:'purple',
    icon: 'success',
    title: 'El calculo se guardo en el historial',
    showConfirmButton: false,
    timer: 1500
  })

};

function imprimirHistorial(){
  for(objeto in historial){
    let contenedor = document.createElement("card");
    contenedor.innerHTML+= `<div class="card" style="background-image: url(sueldo.png);width:13rem;margin:2px;">
    <h2 class="tituloCard" style="color:violet;">Nombre:</h2><h4>${
      " " + historial[objeto].nombre + " " + historial[objeto].apellido
    }</h4>
    <p class="card-text" style="color:purple">sueldo nominal:$${historial[objeto].sueldoNominal}</p>
    <p class="card-text" style="color:purple">deducciones:$${historial[objeto].deducciones}</p>
    <p class="card-text" style="color:purple">sueldo Liquido:$${historial[objeto].sueldoACobrar}</p>
    </div>`
    cajaHistorial.appendChild(contenedor); 
  }
};

function ShowHistorial() {
    
    let contenedor = document.createElement("card");
    contenedor.innerHTML+= `<div class="card" style="background-image: url(sueldo.png);width:13rem;margin:2px;">
    <h2 class="tituloCard" style="color:violet;">Nombre:</h2><h4>${
      " " + historial[historial.length - 1].nombre + " " + historial[historial.length - 1].apellido
    }</h4>
    <p class="card-text" style="color:red">sueldo nominal:$${historial[historial.length - 1].sueldoNominal}</p>
    <p class="card-text" style="color:red">deducciones:$${historial[historial.length - 1].deducciones}</p>
    <p class="card-text" style="color:red">sueldo Liquido:$${historial[historial.length - 1].sueldoACobrar}</p>
    </div>`
    cajaHistorial.appendChild(contenedor); 

};

function calcular() {

  let impuestos = 20; 
  let nombre = document.getElementById(`nombre`).value;
  let apellido = document.getElementById(`apellido`).value;
  let valorHora = parseInt(document.getElementById(`valor1`).value);
  let horasTrabajadas = parseInt(document.getElementById(`valor2`).value);
  let extras = parseInt(document.getElementById(`valor3`).value);
  let montoHoras = valorHora * horasTrabajadas;
  let horaExtra = valorHora * 2;
  let horasExtras = extras * horaExtra;
  let totalNominal = montoHoras + horasExtras;
  let sueldoLiquido = totalNominal - (totalNominal * impuestos) / 100;
  let deducciones = (totalNominal * impuestos) / 100;
  if(nombre==""||apellido==""||valorHora==""||horasTrabajadas==""||extras==""){
    notificacionError()
  }else{
  const reciboDetalle = {
    nombre: nombre,
    apellido: apellido,
    sueldoNominal: totalNominal,
    deducciones: deducciones,
    sueldoACobrar: sueldoLiquido,
  };
  limpiar();
  historial.push(reciboDetalle);
  let historialActualizado=JSON.stringify(historial);
  localStorage.setItem('historialJSON', historialActualizado);
  document.getElementById(`resultado`).innerHTML = totalNominal;
  document.getElementById(`resultado2`).innerHTML = sueldoLiquido;
  ShowHistorial();
  notificacion();
 
}
};

function cargarHistorial(){
  historial = JSON.parse(localStorage.getItem("historialJSON"));
  imprimirHistorial()
};

function comprobarLogin(){
  var logeado= sessionStorage.getItem("login");
  if(logeado!= "LogOk"){
    window.location = "login.html"
    
  }else{
    imprimirNombre();
  }
};

function imprimirNombre(){
  fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
    .then((res)=>res.json())
    .then((data)=>{
      var identificador = sessionStorage.getItem("userID");
      document.getElementById("nombreUsuario").innerHTML= "Bienvenido: " + data[identificador].email
    })
}

function notificacionError(){
  Swal.fire({
    position: 'center',
    background:'black',
    color:'purple',
    icon: 'error',
    title: 'Complete todos los campos',
    showConfirmButton: false,
    timer: 1500
  })
};




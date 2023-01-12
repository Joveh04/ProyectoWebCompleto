function notificacionLogin(){
  
            Swal.fire({
              position: 'center',
              background:'black',
              color:'purple',
              icon: 'error',
              title: 'Usuario desconocido',
              showConfirmButton: false,
              timer: 1500
            })
          };

function verifyDB(user,pass){
  fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
  .then((res)=>res.json())
  .then((data)=>{  
    //let comprobar = false
    for(i=0;i<5;i++){
      let pass2 = (data[i].email).substring(0, 6);
        if(data[i].email == user && pass2 == pass){
            sessionStorage.setItem('login', "LogOk");
            sessionStorage.setItem('userID', i);
            //comprobar = true
            window.location = "index.html";
            break
        }
    }
    try {
      notificacionLogin();
    } 
    catch (error) {
      console.error(error);
      alert("la coneccion con 'sweet alert' no pudo establecerse")
    }
    

  })
};

function login(){
    let usuario= document.getElementById("usuario").value;
    let contraseña=document.getElementById("contraseña").value;
    verifyDB(usuario,contraseña);
};
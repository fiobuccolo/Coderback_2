const logout = document.getElementById("logOut")
logout.addEventListener("click", e =>{
    // Fetch para enviar los datos al backend
    console.log("hsaodhoas");
    fetch(
        "/api/sessions/logout",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
        }
        ).then(result => {
            if(result.status === 200){
                window.location.replace("/users/login")
            }
        })

})
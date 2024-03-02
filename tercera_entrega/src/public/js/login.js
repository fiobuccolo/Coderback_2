const form = document.getElementById("loginForm")
form.addEventListener("submit", e =>{
    e.preventDefault();
    const data = new FormData(form);
    const user = {}
    data.forEach((value,key)=>{
        user[key] = value
    })
    console.log(JSON.stringify(user));
    // Fetch para enviar los datos al backend
    fetch(
       // "/api/sessions/login",{
        "/api/jwt/login",{
            method: "POST",
            body: JSON.stringify(user),
            headers:{
                "Content-Type": "application/json"
            },
        }
        ).then(result => {
            if(result.status === 200){
                result.json()
                    .then(json=>{
                        console.log(json);
                        localStorage.setItem("authToken",json.accessToken)
                        console.log(document.cookie);
                        window.location.replace("/products")
                    })
               // window.location.replace("/products")
            }else if(result.status===401){
                console.log(result)
                alert("Login invalido");
            }
        })

})
const socket = io()

const form = document.querySelector("form");

form.addEventListener("submit", (e)=>{
    e.preventDefault()

    const formData = new FormData(form)
    console.log(formData.get("userId"));

    const post = {
        userId: Number(formData.get("userId")),
        id: Number(formData.get("id")),
        tittle: formData.get("title"),
        body: formData.get("post")
    }

    socket.emit("post_send",post)
    form.reset()
})

socket.on("posts",(data)=>{
    console.log(data);
    
    const posts = document.querySelector("#posts")
   posts.innerHTML= "";
    data.forEach((post) => {
        console.log(post);
        //const p = document.createElement("p")
        posts.innerHTML += `${post.id} - ${post.userId} - ${post.tittle} - ${post.body} <button class="eliminar>Eliminar</button> <br>` ;

        //posts.appendChild(p)
    });
})

const button = document.querySelectorAll(".eliminar")
button.addEventListener("click", (e) => {

})
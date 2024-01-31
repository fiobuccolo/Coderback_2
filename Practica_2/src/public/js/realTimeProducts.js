//instanciar socket del lado del cliente
const socket = io()

console.log(socket);
// emit 1:
socket.emit("message","mensaje desde real time products")

// recepción del emit 1 del server
socket.on("products_list",async (data)=>{
    console.log(data);
    if(!data) console.log("no hay data");
    const div = document.querySelector("#productsList")
    div.innerHTML = "";
    
    // data.forEach((product) => {console.log(product);
                        //     div.innerHTML += `
                        
                        //     <h1>${product.title}</h1>  
                        //     <p>${product.description}</p>
                        //     <p>${product.category}</p>
                        //     <p>${product.price}</p>
                        // < <br>` ;
                        // }
                        // )
                       
})


const form = document.querySelector("form");

form.addEventListener("submit", (e)=>{
    e.preventDefault()

    const formData = new FormData(form)
    console.log(formData.get("title"));

    const product = {
        title: formData.get("title"),
        stock: Number(formData.get("stock")),
        description: formData.get("description"),
        category: formData.get("category"),
        code: formData.get("code"),
        price: Number(formData.get("price")),
        
    }
    console.log(product);
    socket.emit("products_message",product)
    form.reset()
})




    




 
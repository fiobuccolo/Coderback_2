//instanciar socket del lado del cliente
const socket = io()
console.log(socket);
// emit 1:
socket.emit("message","mensaje desde real time products")

// recepción del emit 1 del server
socket.on("products_list",(data)=>{
    console.log(data);
    const div = document.querySelector(".productsList")
    div.innerHTML = `<div>
                        <h1>Products in real time:</h1>
                        ${data.map((product) => `
                        <div>
                            <h1>${product.title}</h1>  
                            <p>${product.description}</p>
                            <p>${product.category}</p>
                            <p>${product.price}</p>
                        </div>
                        `)}
                    </div>  `
})


const button =  document.querySelector("#button")
button.addEventListener("click",async (e)=>{
    e.preventDefault();
    const title= document.querySelector("#title")
    const description= document.querySelector("#description") 
    const category= document.querySelector("#category") 
    const stock= document.querySelector("#stock") 
    const code= document.querySelector("#code") 
    const price= document.querySelector("#price") 
    // const product = await fetch(`http://localhost:8080/api/products`,{
    //     method: "POST",
    //       body: (title,category,stock,code,price,description),
    //       headers:{
    //           "Content-Type": "application/json; charset=UTF-8",
    //       },
    //   })
    const product = {
        title: title.value,
        description: description.value,
        category: category.value,
        code: code.value,
        price: price.value,
        stock: stock.value
    }

    socket.emit("products_message",product)

})


    


// TO DO:
// emit 2- agregar producto: con websocket
/*
const button =  document.querySelector("#button")
button.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("holiiti");
    const title= document.querySelector("#title")
    console.log(title);
    const description= document.querySelector("#description") 
    const category= document.querySelector("#category") 
    const code= document.querySelector("#code") 
    const price= document.querySelector("#price") 
    const product = {
        title: title.value,
        description: description.value,
        category: category.value,
        code: code.value,
        price: price.value

    }
    console.log("holiiti 2");
    console.log(product);
    socket.emit("products_message",product)
})
*/

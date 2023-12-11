const getPressed = async (event) =>{
    try{
        event.preventDefault()
        const minPrice = document.getElementById('productPrice').value;
        console.log(minPrice)
        if(minPrice){
            const result = await fetch(`/api/products/price/${minPrice}`)
            const data = await result.json()
            if(data.length!==0){
                let output =""
                for(let i =0; i< data.length ; i++){
                    output+=`<div>
                        <img src=" ${data[i].thumbnail}">
                        <p> ${data[i].title} </p>
                        <p> ${data[i].price}</p>
                    </div>`
                }
                document.querySelector("#results").innerHTML = output
            }
            else{
                alert("no match found")
            }
        }
        else{
            alert("price is empty")
            return

        }
    }
    catch(err){
        console.log(err)
    }
}
document.querySelector("#btnGetProducts").addEventListener("click", (event)=> getPressed(event));


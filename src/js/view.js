import { editCart } from "./service";

let subTotal = 0;
let et = 0;
export let display = (cartItem) => {
 let tableBody = document.getElementById(`tableBody`);
 
 let p = cartItem.price*cartItem.qty;
 subTotal = subTotal+p;
 et = subTotal-7;
 console.log(et);
 
 let html = `<tr>
                <td data-th="Product">
                    <div class="row">
                        <div class="col-sm-2 hidden-xs"><img src="${cartItem.img}" alt="..." class="img-responsive" style="height:120px; width:100px;" /></div>
                    </div>
                </td>
                <td data-th="Desc">
                    <div class="row">
                        <div class="col-sm-8">
                            <h4 class="nomargin">${cartItem.title}</h4>
                            <h6>Style#:${cartItem.style}</h6>
                            <h6>Colour: ${cartItem.colour}</h6>
                            <button class="btn btn-link editButton" data-toggle="modal" data-target="#modalQuickView" >EDIT</button>
                            <button class="btn btn-link">DELETE</button>
                            <button class="btn btn-link">SAVE FOR LATER</button>
                        </div>
                    </div>
                </td>
                <td data-th="Size">${cartItem.size}</td>
                <td data-th="Qty">
                    <input type="number" class="form-control text-center" value="${cartItem.qty}">
                </td>
                <td data-th="Price" class="text-center">$${p}</td>
            </tr>`;

let tr = createHTMLElement(html);
tr.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.lastElementChild.previousElementSibling.onclick = () => {
  let deleteData = {
    method : "DELETE"
  }
  let delUrl = `http://localhost:3000/cartitems/${cartItem.id}`;
  fetch(delUrl, deleteData)
  .then((data) =>{
    displayData();
  });
}

  
tr.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.lastElementChild.previousElementSibling.previousElementSibling.onclick = () => {
    
    let modalTitle = document.getElementById(`modalTitle`);
    modalTitle.innerHTML = `${cartItem.title}`;
    let price = document.getElementById(`modalPrice`);
    
   
    price.innerHTML = `$${cartItem.price}`;
    document.getElementById('editItem').innerHTML="";
    let b = createHTMLElement(`  <button type="button" class="btn btn-primary" class="close" data-dismiss="modal">EDIT</button>`);
    b.onclick = () =>{

      let s = document.getElementsByName('size')[0];
      let size = s.options[s.selectedIndex].value;
      console.log(`size = ${size}`);
  
      let q = document.getElementsByName('qty')[0];
      let qty = q.options[q.selectedIndex].value;
      console.log(`qty = ${qty}`);
          editCart(cartItem.id,qty,size);
      }
    
    document.getElementById('editItem').appendChild(b);
  
    let mi = document.getElementById(`modalImage`);
    mi.innerHTML = "";
    let h = createHTMLElement( `<img class="d-block w-100" src="${cartItem.img}"
    alt="First slide">`);
    console.log(h);
    mi.appendChild(h);
    
    
}

console.log(tr);
tableBody.appendChild(tr);
document.getElementById(`cart-sub`).innerHTML= '$'+subTotal;
document.getElementById(`cart-subtotal`).innerHTML='$'+et; 
}


function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
    }   

export function displayData() {
    document.getElementById('tableBody').innerHTML="";
    let  getUrl  =  "http://localhost:3000/cartitems";
    fetch(getUrl)
        .then((resp)  =>  resp.json())
        .then(data  =>  {
            data.map(cartItem => {
                display(cartItem);
            })   
        }
        )
}









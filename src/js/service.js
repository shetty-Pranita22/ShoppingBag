import {display} from './view';
import {displayData} from './view';

export  default  ()  =>  {
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




export function editCart(id,quantity,size){
const editUrl = 'http://localhost:3000/cartitems/'+id;
fetch(editUrl)
.then(resp => resp.json())
.then((data) => {
let editedObject = Object.assign({},data,{
"qty" : quantity,
"size" : size
});
const sendData = {
method: 'PUT', 
mode: 'cors', 
cache: 'no-cache', 
credentials: 'same-origin',
headers: {
'Content-Type': 'application/json; charset=utf-8',
},
redirect: 'follow',
referrer: 'no-referrer',
body: JSON.stringify(editedObject), 
};
fetch(editUrl,sendData)
.then((data) => {
    displayData();
})

})
} 
 

function addlist(e){
    e.preventDefault();

    const item = e.target.item.value;
    const description = e.target.description.value;

    const obj = {
        id:generateId(),
        item:item,
        description:description
    }

    axios.post("https://crudcrud.com/api/0032f45b6dab4e53a77d57e2e52d6606/todoList" , obj)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
    console.log(obj);
    localStorage.setItem(obj.id, JSON.stringify(obj));
    showDetailsOnWeb(obj);
}

function generateId(){
    return Math.floor(Math.random()*1000000000);
}

window.addEventListener("DOMContentLoaded" , () => {
    
    axios.get("https://crudcrud.com/api/0032f45b6dab4e53a77d57e2e52d6606/todoList")
        .then((response) => {
            console.log(response.data);

            for(var i=0; i<response.data.length; i++){
                showDetailsOnWeb(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    // Object.keys(localStorage).forEach((keys) => {
    //     const items = JSON.parse(localStorage.getItem(keys));
    //     showDetailsOnWeb(items);
    // })
})

function showDetailsOnWeb(obj){
    const parent = document.getElementById('items');
   
    const child = `<li id='${obj._id}' class="list-group-item">${obj.item}-${obj.description}<button onclick=deleteItem('${obj._id}') class="btn btn-danger btn-sm float-end ">X</button><button onclick=moveItem('${obj._id}') class="btn btn-sm btn-primary float-end">&#x2713;</button></li>`

    parent.innerHTML += child;

}

function deleteItem(objid){
    axios.delete(`https://crudcrud.com/api/0032f45b6dab4e53a77d57e2e52d6606/todoList/${objid}`)
        .then((response) => {
            removeFromWeb(objid);
        })
        .catch((err) => {
            console.log(err);
        })
    // localStorage.removeItem(id);
    // removeFromWeb(id);
}

function removeFromWeb(objid){
    const parentNode = document.getElementById('items');
    const item = document.getElementById(objid);
    parentNode.removeChild(item);
}
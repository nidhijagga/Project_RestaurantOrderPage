let categotySelector = document.getElementsByClassName('dropdown-item');



for (let i = 0; i < categotySelector.length; i++) {
    categotySelector[i].addEventListener('click', function () {
        // Update the text of the dropdown button to the text of the selected item
        // console.log(this.textContent);
        document.querySelector('#categoryBtn').textContent = this.textContent;
    });
}

let table = document.getElementById('tbodyId');
let submit = document.getElementById('submitBtn');

submit.addEventListener('click', addItem);
table.addEventListener('click', deleteRow);


function addItem(e) {

    e.preventDefault();

    let categoryValue = document.getElementById('categoryBtn').textContent;
    let descriptionValue = document.getElementById('descriptionValue').value;
    let amountValue = document.getElementById('amountValue').value;


    //Alert for input requirement

    if (document.getElementById('categoryBtn').textContent === "Select Category" ||
        document.getElementById('descriptionValue').value === "" ||
        document.getElementById('amountValue').value === "") {
        alert('Input Required in All feilds.');
    }
    else {
        
        //Creating the new row.

        let tr = document.createElement('tr');
        tr.className = 'align-middle trStyle';

        let th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.appendChild(document.createTextNode("#"));

        let td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(categoryValue));

        let td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(descriptionValue));

        let td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(amountValue))

        let td4 = document.createElement('td');

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'editDelete btn btn-danger delete';
        deleteBtn.appendChild(document.createTextNode('Delete'));

        
        td4.appendChild(deleteBtn);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        table.appendChild(tr);


        //Adding the Values to crud crud

        let values = {
            table: categoryValue,
            desciption: descriptionValue,
            amount: amountValue
        }
      
        axios.post('https://crudcrud.com/api/2ec1e6e7bfdc4624a51162fb94f8d3a7/OrderData', values)
        .then(data => {
            console.log(data);
            tr.id = data.data._id;
        })
        .catch(err => console.error(err))

        


        //Emptying the input's after taking the value.

        document.getElementById('categoryBtn').textContent = "Select Table";
        document.getElementById('descriptionValue').value = "";
        document.getElementById('amountValue').value = "";

    }
}

function deleteRow(e) {
    if (e.target.classList.contains('delete')) {
        let tr = e.target.parentElement.parentElement;
        // console.log(tr.children[2].textContent);
        
        axios.delete(`https://crudcrud.com/api/2ec1e6e7bfdc4624a51162fb94f8d3a7/OrderData/${tr.id}`)
        .then(data => console.log(data))
        .catch(err => console.error(err))
        table.removeChild(tr);
    }
}

// submit.addEventListener('click', addItem);
// table.addEventListener('click', deleteRow);

window.addEventListener('DOMContentLoaded', function(e){
    axios.get(`https://crudcrud.com/api/2ec1e6e7bfdc4624a51162fb94f8d3a7/OrderData`)
    .then(data => {
        data.data.forEach(element => {
            // console.log(element);
            
        let tr = document.createElement('tr');
        tr.className = 'align-middle trStyle';
        tr.id = element._id;

        let th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.appendChild(document.createTextNode("#"));

        let td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(element.table));

        let td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(element.desciption));

        let td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(element.amount))

        let td4 = document.createElement('td');

        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'editDelete btn btn-danger delete';
        deleteBtn.appendChild(document.createTextNode('Delete'));

        
        td4.appendChild(deleteBtn);
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        table.appendChild(tr);

        });
    })
})

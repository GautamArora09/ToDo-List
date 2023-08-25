let isEdit = false;
let tasks = localStorage.getItem('tasks') || [];
document.addEventListener('DOMContentLoaded', () => {
    let tasks = getItemFromStorage();
    tasks.forEach((i) => displayItem(i))
});
function task(name, date, category) {
    this.name = name;
    this.date = date;
    this.category = category;
}
function addData() {
    // Get input values
    let tName =
        document.getElementById("nameInput").value;
    let tDate =
        document.getElementById("dateInput").value;
    let tCategory =
        document.getElementById("categoryInput").value;
    let timet = new Date().getTime();

    if (tName.trim() === "") {
        alert("Your Name input is empty");
        return;
    }
    if (tDate.trim() === "") {
        alert("Your Date input is empty");
        return;
    }
    let endtime=new Date(tDate).getTime();
    if (endtime < timet) {
        alert("Please Enter Valid Time");
        clearInputs();
        return;
    }

    if (isEdit) {
        let edit = document.querySelector(".edited");
        removeItemFromStorage(edit.cells[0].textContent);
        edit.remove();
        document.getElementById("btn").style.backgroundColor = "#333";
        document.getElementById("btn").textContent = "Add";
        isEdit = false;
    }

    // Get the table and insert a new row at the end
    let Ntask = new task(tName, tDate, tCategory);
    // Clear input fields
    addItemToStorage(Ntask);
    location.reload();
    // displayItem(Ntask);
    clearInputs();
}

function displayItem(task) {
    let table = document.getElementById("outputTable");
    let newRow = table.insertRow(table.rows.length);

    // Insert data into cells of the new row
    newRow.insertCell(0).innerHTML = task.name;
    newRow.insertCell(1).innerHTML = task.date;
    newRow.insertCell(2).innerHTML = task.category;
    newRow.insertCell(3).innerHTML =
        '<button onclick="editData(this)">Edit</button>' +
        '<button onclick="deleteData(this)">Delete</button>';

}

function editData(button) {
    isEdit = true;
    let row = button.parentNode.parentNode;
    row.classList.add('edited');
    let nameCell = row.cells[0];
    let dateCell = row.cells[1];
    let categoryCell = row.cells[2];

    document.getElementById("nameInput").value = nameCell.textContent;
    document.getElementById("dateInput").value = dateCell.textContent;
    document.getElementById("categoryInput").value = categoryCell.textContent;

    document.getElementById("btn").style.backgroundColor = "green";
    document.getElementById("btn").textContent = "Update";

}

function deleteData(button) {
    // Get the parent row of the clicked button
    let row = button.parentElement.parentElement;
    // Remove the row from the table
    row.parentNode.removeChild(row);
    removeItemFromStorage(row.firstChild.textContent);
    console.log(row.firstChild.textContent);
}

function clearInputs() {
    // Clear input fields
    document.getElementById("nameInput").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("categoryInput").value = "";
}

function getItemFromStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    console.log(tasks);
    return tasks;
}

function addItemToStorage(task) {
    let tasks = getItemFromStorage();

    tasks.unshift(task);
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeItemFromStorage(name) {
    let tasks = getItemFromStorage();
    tasks.forEach((i, index) => {
        if (i.name === name) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}



let filterInput = document.getElementById('filterInput');
filterInput.addEventListener('keyup', filterNames);

function filterNames(e) {
    let names = document.querySelectorAll('tr');
    console.log(names);
    let val = document.getElementById('filterInput').value.toLowerCase();
    names.forEach((i) => {
        let name = i.firstChild.textContent.toLowerCase();
        if (!i.classList.contains('tableHead') && name.indexOf(val) == -1) {
            i.style.display = 'none';
        } else {
            i.style.display = 'block';
        }
    })

}
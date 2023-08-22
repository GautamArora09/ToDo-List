function addData() {
    // Get input values
    let name =
     document.getElementById("nameInput").value;
    let date =
     document.getElementById("dateInput").value;
    let category =
     document.getElementById("categoryInput").value;
    
    // Get the table and insert a new row at the end
    let table = document.getElementById("outputTable");
    let newRow = table.insertRow(table.rows.length);
    
    // Insert data into cells of the new row
    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = date;
    newRow.insertCell(2).innerHTML = category;
    newRow.insertCell(3).innerHTML =
     '<button onclick="editData(this)">Edit</button>'+
     '<button onclick="deleteData(this)">Delete</button>';
    
    // Clear input fields
    clearInputs();
   }
 
   function editData(button) {
    
    // Get the parent row of the clicked button
    let row = button.parentNode.parentNode;
    
    // Get the cells within the row
    let nameCell = row.cells[0];
    let dateCell = row.cells[1];
    let categoryCell = row.cells[2];
    
    // Prompt the user to enter updated values
    let nameInput =
     prompt("Enter the updated name:",
      nameCell.innerHTML);
    let dateInput =
     prompt("Enter the updated date:",
      dateCell.innerHTML);
    let categoryInput =
     prompt("Enter the updated mobile details:",
     categoryCell.innerHTML
     );
 
    
    // Update the cell contents with the new values
    nameCell.innerHTML = nameInput;
    dateCell.innerHTML = dateInput;
    categoryCell.innerHTML = categoryInput;
   }

   function deleteData(button) {
    
    // Get the parent row of the clicked button
    let row = button.parentNode.parentNode;
    // Remove the row from the table
    row.parentNode.removeChild(row);
   }

   function clearInputs() {
    // Clear input fields
    document.getElementById("nameInput").value = "";
    document.getElementById("dateInput").value = "";
    document.getElementById("categoryInput").value = "";
   }



   
   function getItemFromStorage() {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
   }

   function addItemToStorage(item) {
    let items = getItemFromStorage();

    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));

   }

   function removeItemFromStorage(item) {
    let items = getItemFromStorage();

    items = items.filter((i)=> i!==item );

    localStorage.setItem('items',JSON.stringify(items));
   }

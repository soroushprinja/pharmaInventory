// document.getElementById('medicine-form').addEventListener('submit', function(e) {
//   e.preventDefault();
  
//   let name = document.getElementById('name').value;
//   let batch = document.getElementById('batch').value;
//   let expiry = document.getElementById('expiry').value;
//   let quantity = document.getElementById('quantity').value;
//   let price = document.getElementById('price').value;

//   let table = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
//   let newRow = table.insertRow();
//   newRow.innerHTML = `<td>${name}</td><td>${batch}</td><td>${expiry}</td><td>${quantity}</td><td>₹${price}</td>`;

//   // Clear the form
//   document.getElementById('medicine-form').reset();
// });
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

function saveInventory() {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}

function renderTable() {
  let tableBody = document.querySelector('#inventory-table tbody');
  tableBody.innerHTML = ''; // Clear table

  inventory.forEach((med, index) => {
    let row = document.createElement('tr');

    // Check for expiry warning
    let today = new Date();
    let expiry = new Date(med.expiry);
    let isExpiringSoon = (expiry - today) / (1000 * 60 * 60 * 24) <= 30;

    row.innerHTML = `
      <td>${med.name}</td>
      <td>${med.batch}</td>
      <td>${med.expiry}</td>
      <td>${med.quantity}</td>
      <td>₹${med.price}</td>
      <td><button onclick="deleteMedicine(${index})">🗑️</button></td>
    `;

    if (isExpiringSoon) row.style.backgroundColor = '#ffcccc';

    tableBody.appendChild(row);
  });
  function makeColumnsResizable(tableSelector) {
  const table = document.querySelector(tableSelector);
  const cols = table.querySelectorAll('th');
  let startX, startWidth, resizer;

  cols.forEach((col, i) => {
    const div = document.createElement('div');
    div.style.width = '5px';
    div.style.height = '100%';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.right = '0';
    div.style.cursor = 'col-resize';
    div.style.userSelect = 'none';
    
    col.style.position = 'relative';
    col.appendChild(div);

    div.addEventListener('mousedown', function(e) {
      startX = e.pageX;
      startWidth = col.offsetWidth;
      resizer = col;
      document.addEventListener('mousemove', resizeCol);
      document.addEventListener('mouseup', stopResize);
    });
  });

  function resizeCol(e) {
    if (resizer) {
      const newWidth = startWidth + (e.pageX - startX);
      resizer.style.width = newWidth + 'px';
    }
  }

  function stopResize() {
    document.removeEventListener('mousemove', resizeCol);
    document.removeEventListener('mouseup', stopResize);
    resizer = null;
  }
}

makeColumnsResizable('#inventory-table');

}

function deleteMedicine(index) {
  inventory.splice(index, 1);
  saveInventory();
  renderTable();
}

document.getElementById('medicine-form').addEventListener('submit', function(e) {
  e.preventDefault();

  let med = {
    name: document.getElementById('name').value,
    batch: document.getElementById('batch').value,
    expiry: document.getElementById('expiry').value,
    quantity: document.getElementById('quantity').value,
    price: document.getElementById('price').value
  };

  inventory.push(med);
  saveInventory();
  renderTable();
  this.reset();
});

renderTable(); // On page load
$(document).ready(function() {
  $('#inventory-table').DataTable();
});


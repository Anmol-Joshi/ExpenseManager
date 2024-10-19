// Selecting elements
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const addExpenseButton = document.getElementById('add-expense');
const updateExpenseButton = document.getElementById('update-expense');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let total = 0;
let expenses = [];
let editIndex = -1;

// Function to update total amount
function updateTotalAmount() {
  total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmount.textContent = total.toFixed(2);
}

// Function to render the expense list
function renderExpenses() {
  expenseList.innerHTML = '';

  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = expense.name;

    const amountCell = document.createElement('td');
    amountCell.textContent = `$${expense.amount.toFixed(2)}`;

    const actionsCell = document.createElement('td');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => editExpense(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteExpense(index));

    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);

    row.appendChild(nameCell);
    row.appendChild(amountCell);
    row.appendChild(actionsCell);

    expenseList.appendChild(row);
  });

  updateTotalAmount();
}

// Function to add a new expense
function addExpense() {
  const expenseName = expenseNameInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);

  if (expenseName === '' || isNaN(expenseAmount) || expenseAmount <= 0) {
    alert('Please enter a valid name and amount.');
    return;
  }

  expenses.push({ name: expenseName, amount: expenseAmount });
  renderExpenses();

  expenseNameInput.value = '';
  expenseAmountInput.value = '';
}

// Function to edit an expense
function editExpense(index) {
  const expense = expenses[index];
  expenseNameInput.value = expense.name;
  expenseAmountInput.value = expense.amount;

  addExpenseButton.style.display = 'none';
  updateExpenseButton.style.display = 'inline-block';
  editIndex = index;
}

// Function to update an existing expense
function updateExpense() {
  const updatedName = expenseNameInput.value;
  const updatedAmount = parseFloat(expenseAmountInput.value);

  if (updatedName === '' || isNaN(updatedAmount) || updatedAmount <= 0) {
    alert('Please enter a valid name and amount.');
    return;
  }

  expenses[editIndex] = { name: updatedName, amount: updatedAmount };
  renderExpenses();

  expenseNameInput.value = '';
  expenseAmountInput.value = '';
  addExpenseButton.style.display = 'inline-block';
  updateExpenseButton.style.display = 'none';
  editIndex = -1;
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// Event listeners
addExpenseButton.addEventListener('click', addExpense);
updateExpenseButton.addEventListener('click', updateExpense);

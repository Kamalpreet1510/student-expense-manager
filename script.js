let expenses = [];

let budget = 10000;


// Add Expense

function addExpense() {

    const name =
        document.getElementById("expenseName").value;

    const amount =
        Number(
            document.getElementById("expenseAmount").value
        );

    const category =
        document.getElementById("expenseCategory").value;

    const date =
        document.getElementById("expenseDate").value;


    if (
        name === "" ||
        amount <= 0 ||
        category === "" ||
        date === ""
    ) {

        alert("Please fill all expense details.");

        return;
    }


    const expense = {

        id: Date.now(),

        name: name,

        amount: amount,

        category: category,

        date: date

    };


    expenses.push(expense);


    document.getElementById("expenseName").value = "";

    document.getElementById("expenseAmount").value = "";

    document.getElementById("expenseCategory").value = "";

    document.getElementById("expenseDate").value = "";


    displayExpenses();

    updateDashboard();

}


// Display Expenses

function displayExpenses() {

    const list =
        document.getElementById("expenseList");


    if (expenses.length === 0) {

        list.innerHTML = `
            <p class="empty-message">
                No expenses added yet.
            </p>
        `;

        return;
    }


    list.innerHTML = "";


    expenses.forEach(function(expense) {

        const item =
            document.createElement("div");

        item.className = "expense-item";


        item.innerHTML = `

            <div>

                <h3>
                    ${expense.name}
                </h3>

                <p>
                    ${expense.category}
                    •
                    ${expense.date}
                </p>

            </div>


            <div>

                <p class="expense-amount">
                    ₹${expense.amount}
                </p>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})"
                >
                    Delete
                </button>

            </div>

        `;


        list.appendChild(item);

    });

}


// Delete Expense

function deleteExpense(id) {
    expenses = expenses.filter(
    expense => expense.id !== id
);

saveExpenses();

displayExpenses();
loadExpenses();
}




// Update Dashboard

function updateDashboard() {

    let total = 0;


    expenses.forEach(function(expense) {

        total += expense.amount;

    });


    const remaining =
        budget - total;


    document.getElementById("totalExpense")
        .textContent = `₹${total}`;


    document.getElementById("remaining")
        .textContent = `₹${remaining}`;


    document.getElementById("balance")
        .textContent = `₹${remaining}`;


    document.getElementById("budgetAmount")
        .textContent = `₹${budget}`;


    document.getElementById("expenseCount")
        .textContent = expenses.length;


    let average = 0;


    if (expenses.length > 0) {

        average =
            total / expenses.length;

    }


    document.getElementById("averageExpense")
        .textContent =
        `₹${average.toFixed(2)}`;

}


// Set Budget

function setBudget() {

    const newBudget =
        Number(
            document.getElementById("budgetInput").value
        );


    if (newBudget <= 0) {

        alert("Please enter a valid budget.");

        return;
    }


    budget = newBudget;


    document.getElementById("budgetInput").value = "";


    updateDashboard();

    alert("Budget updated successfully!");

}


// Scroll to Expenses

function scrollToExpenses() {

    document
        .getElementById("expenses")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// Initial Dashboard

updateDashboard();
// Save expenses in browser
function saveExpenses() {
    localStorage.setItem("studentExpenses", JSON.stringify(expenses));
}

// Load expenses from browser
function loadExpenses() {
    const savedExpenses = localStorage.getItem("studentExpenses");

    expenses.push(expense);

saveExpenses();

displayExpenses();
updateDashboard();
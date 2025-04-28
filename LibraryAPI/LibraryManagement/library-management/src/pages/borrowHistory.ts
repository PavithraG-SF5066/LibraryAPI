import { bookStatus } from '../models/model';
import * as APICALLS from '../api/apiCalls';

export async function renderBorrowedHistory(container: HTMLElement) {
  var user = await APICALLS.isAuthenticated();
  if (!user.success) {
    alert("Please login first");
    return;
  }
  var currentUser = await APICALLS.getIndividualUser(user.email);
  if (!currentUser) {
    alert("User not found");
    return;
  }

  container.innerHTML = `<h2>Your Borrowed Books</h2>`;
  const tableContainer = document.createElement("span");
  createTable();
  async function createTable() {
    var borrows = await APICALLS.fetchBorrow();
    tableContainer.innerHTML = "";
    const table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    var headerRow = document.createElement("tr") as HTMLTableRowElement;
    headerRow.innerHTML = `
       <th>Borrow Id</th>
          <th>User Id</th>
          <th>Book Id</th>
          <th>Book Name</th>
          <th>Borrow Date</th>
          <th>Borrow Status</th>
          <th>Fine Amount</th>
          <th>Action</th>`;
    table.appendChild(headerRow);

    borrows.forEach((borrow) => {
      if (borrow.userID == currentUser!.userID) {
        // alert(borrow.borrowDate);
        var row = document.createElement("tr") as HTMLTableRowElement;
        row.innerHTML = `
        <td>${borrow.borrowID}</td> 
        <td>${borrow.userID}</td> 
        <td>${borrow.bookID}</td> 
        <td>${borrow.bookName}</td> 
        <td>${new Date(borrow.borrowedDate).toLocaleDateString()}</td> 
        <td>${borrow.bookStatus}</td> 
        <td>${borrow.paidFineAmount}</td>
        <td><button onclick="returnOrder(${borrow.borrowID})">Return</button></td>`;
        table.appendChild(row);
      }
    })
    tableContainer.appendChild(table);
  }
  container.appendChild(tableContainer);

  async function returnOrder(borrowID: number) {
    var confirmation = confirm("Are you sure you want to Return this Book?");
    if (!confirmation) {
      return;
    }
    var borrow = await APICALLS.getIndividualBorrow(borrowID);
    if (borrow == null) {
      alert("Borrow Detail not found");
      return;
    }
    if (borrow!.bookStatus != bookStatus[0]) {
      alert("Book  already Returned");
      return;
    }
    var fineAmount = 0;
    var today = new Date();
    var days = Math.floor((today.getTime() - new Date(borrow!.borrowedDate).getTime()) / (1000 * 60 * 60 * 24));
    var isDamaged = confirm("Is Book is Damaged");
    if (isDamaged && days > 15) {
      fineAmount = 300 + (days - 15);
    }
    else if (!isDamaged && days > 15) {
      fineAmount = days - 15;
    }
    else if(isDamaged && days<15) {
      fineAmount = 300;
    }
    else
    {
      fineAmount=0;
    }

    if (currentUser!.amount < fineAmount) {
      alert("Insufficient Balance to pay Fine Amount");
    }
    else
    {
      await APICALLS.cancelBook(currentUser!.userID,borrowID,fineAmount,borrow.bookID);
      alert("Book returned successfully");
      createTable();
    }
  }
  (window as any).returnOrder = returnOrder;
}
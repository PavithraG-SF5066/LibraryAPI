import * as APICALLS from '../api/apiCalls';
import { availability, bookStatus } from '../models/model';
// import { Customer } from '../models/model';

export function renderBorrow(container: HTMLElement) {
    container.innerHTML = `<h2>Borrow Books</h2>`;
    const tableContainer = document.createElement("span");
    createTable();
    async function createTable() {
        var books = await APICALLS.fetchBooks();
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        var headerRow = document.createElement("tr") as HTMLTableRowElement;
        headerRow.innerHTML = `
          <th>Book Id</th>
          <th>Book Name</th>
          <th>Author Name</th>
          <th>Book Availability</th>
          <th>Action</th>`;
        table.appendChild(headerRow);

        books.forEach((book) => {
            const row = document.createElement("tr");
            row.innerHTML =
                `<td>${book.bookID}</td>
        <td>${book.bookName}</td>
        <td>${book.authorName}</td>
        <td>${book.bookAvailability}</td>
        <td><button id="borrowbtn" onclick="borrowBook(${book.bookID})">Borrow</button></td>`;
            table.appendChild(row);
        });
        tableContainer.appendChild(table);
    }
    container.appendChild(tableContainer);

    async function borrowBook(bookID: number) {
        var bookList = await APICALLS.getIndividualBook(bookID);
        var borrows = await APICALLS.fetchBorrow();
        // alert(borrows.length);

        if (bookList == null) {
            alert("Book not found");
            return;
        }
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
        var count = 0;
        if (bookList != null) {
            if (bookList.bookAvailability == availability[1]) {
                borrows.forEach(borrow => {
                    if (borrow.userID == currentUser?.userID && borrow.bookStatus == bookStatus[0]) {
                        count += 1;
                    }
                });
                // alert(count);
                if (count >= 3) {
                    alert('You already borrowed 3 books');
                }
                else {
                    var borrowID = await APICALLS.addNewBorrow(currentUser.userID, bookID);
                    bookList.bookAvailability=bookStatus[1];
                    createTable();
                    alert("Book Borrowd successfully with borrow id " + borrowID);
                    createTable();
                    alert("Book Borrowed successfully");
                }
            }
            else {
                alert("Book is not available now");
            }
           
        }
       
    }
    (window as any).borrowBook = borrowBook;
}




import { BookDetails } from '../models/model';
import * as APICALLS from '../api/apiCalls';

export function renderBooks(container: HTMLElement) {
    container.innerHTML = `<h2>Books</h2> <button id="addBookBtn">Add Books</button>`;
    const tableContainer = document.createElement("span");
    createTable();
    async function createTable() {
        var books = await APICALLS.fetchBooks();

        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>Book ID</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Book Availability</th>
            <th>Action</th>`;
        table.appendChild(headerRow);


        books.forEach((book) => {
            const row = document.createElement("tr");
            row.innerHTML = `
      <td>${book.bookID}</td>
      <td>${book.bookName}</td>
      <td>${book.authorName}</td>
      <td>${book.bookAvailability}</td>
      <td>
        <button onclick="editProduct('${book.bookID}')">Edit</button>
        <button onclick="deleteBook('${book.bookID}')">Delete</button>
      </td>`;
            table.appendChild(row);
        });

        tableContainer.appendChild(table);
        container.appendChild(tableContainer);
    }
    function addEditBooksForm() {
        const existingForm = document.getElementById("bookForm");
        if (existingForm) {
            existingForm.remove();
        }
        const form = document.createElement("form");
        form.id = "bookForm";
        form.innerHTML = `
        <label for="bookName">Book Name:</label>
        <input type="text" id="bookName" name="bookName"><br>
        <label for="authorName">Author Name:</label>
        <input type="text" id="authorName" name="authorName"><br>
        <label for="bookAvailable">Book Availability:</label>      
        <select id="bookAvailable">
            <option value="Select">Select</option>
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
            <option value="Damaged">Damaged</option>
        </select><br>
        <button class="btn" type="submit">Save</button>
        `;
        container.appendChild(form);
    }

    // Attach listeners AFTER table is in the DOM
    let editingID: number = 0;
    async function editProduct(id: string) {
        // alert("Editing " + id);
        addEditBooksForm();
        // Populate form with existing data for editing
        const form = document.getElementById("bookForm") as HTMLFormElement;
        const book = await APICALLS.getIndividualBook(parseInt(id));
        if (book) {
            editingID = Number(id);
            form.bookName.value = book.bookName;
            form.authorName.value = book.authorName;
            form.bookAvailable.value = book.bookAvailability;
        }
    }

    document.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        if (editingID > 0) {
            const book: BookDetails = {
                bookID: editingID,
                bookName: form.bookName.value,
                authorName: form.authorName.value,
                bookAvailability: form.bookAvailable.value,
            };
            await APICALLS.editBookDetail(book);
            alert("Updated Book successfully : " + book.bookID);
        } else {
            const book: BookDetails = {
                bookID: 0, bookName: form.bookName.value, authorName: form.authorName.value, bookAvailability: form.bookAvailable.value
            };
            await APICALLS.addNewBook(book);
            alert("Added Book successfully : " + book.bookID);
        }
        createTable();
        form.reset();
        editingID = 0;
        const existingForm = document.getElementById("bookForm");
        if (existingForm) {
            existingForm.remove();
        }
    });

    const addBtn = container.querySelector("#addBookBtn") as HTMLButtonElement;
    addBtn?.addEventListener("click", () => {
        alert("Add Book");
        addEditBooksForm(); // make sure this function exists and is imported
    });

    async function deleteBook(id: string) {
        await APICALLS.deleteBookDetail(parseInt(id));
        alert("Deleted " + id);
        createTable();
    }
    // Expose to window object
    (window as any).editProduct = editProduct;
    (window as any).deleteBook = deleteBook;
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LibraryAPI.Models;

namespace LibraryAPI.Controllers
{
        [ApiController]
        [Route("api/library/bookdetailscontroller")]
        public class BookDetailsController : ControllerBase
        {
            [HttpGet("books")]
            public IActionResult GetBooks()
            {
                return Ok(ApplicationDBContext.books);
            }

            //getting the book
            [HttpGet("get/book/{bookID}")]
            public IActionResult GetBookDetail(int bookID)
            {
                var book = ApplicationDBContext.books.FirstOrDefault(book => book.BookID == bookID);
                if (book == null)
                {
                    return NotFound();
                }
                return Ok(book);
            }

            //Adding new book
            [HttpPost("add/newBook")]
            public IActionResult AddNewBook([FromBody] BookDetails book)
            {
                book.BookID = ApplicationDBContext.books.Count + 1;
                ApplicationDBContext.books.Add(book);
                return Ok(book.BookID);
            }

            //checking if the product already exists
            [HttpGet("book/{bookName}")]
            public IActionResult GetBookExist(string bookName)
            {
                bool isBookValid = ApplicationDBContext.books.Any(book => book.BookName.ToLower() == bookName.ToLower());
                return Ok(isBookValid);
            }

            [HttpPut("new/book/edit")]
            public IActionResult EditBook(BookDetails bookData)
            {
                var book = ApplicationDBContext.books.FirstOrDefault(book => book.BookID == bookData.BookID);
                if (book == null)
                {
                    return NotFound();
                }
                book.BookName = bookData.BookName;
                book.AuthorName = bookData.AuthorName;
                book.BookAvailability = bookData.BookAvailability;
                return Ok();
            }

            [HttpDelete("delete/{bookID}")]
            public IActionResult DeleteBook(int bookID)
            {
                var book = ApplicationDBContext.books.Find(book => book.BookID == bookID);
                if (book == null)
                {
                    return NotFound();
                }
                ApplicationDBContext.books.Remove(book);
                return Ok();
            }
        }
}
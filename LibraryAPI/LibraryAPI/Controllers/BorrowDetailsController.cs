using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LibraryAPI.Models;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/library/borrowDetailsController/")]
    public class BorrowDetailsController : ControllerBase
    {
        [HttpGet("borrows")]
        public IActionResult GetBorrows()
        {
            return Ok(ApplicationDBContext.borrows);
        }

        //getting the order
        [HttpGet("get/borrow/{borrowID}")]
        public IActionResult GetBorrowDetail(int borrowID)
        {
            var borrow = ApplicationDBContext.borrows.FirstOrDefault(borrow => borrow.BorrowID == borrowID);
            if (borrow == null)
            {
                return NotFound();
            }
            return Ok(borrow);
        }

        //Adding new product
        [HttpPost("add/newBorrow/{userID}/{bookID}")]
        public IActionResult AddNewBorrow(int userID, int bookID)
        {
            var book = ApplicationDBContext.books.FirstOrDefault(book => book.BookID == bookID);
            if (book == null)
            {
                Console.WriteLine("Book not found");
                return NotFound();
            }

            var user = ApplicationDBContext.users.FirstOrDefault(user => user.UserID == userID);
            if (user == null)
            {
                Console.WriteLine("User not found");
                return BadRequest("User not found");
            }

            book.BookAvailability = ApplicationDBContext.Availability[0];
            BorrowDetails borrow = new BorrowDetails() { BorrowID = ApplicationDBContext.borrows.Count + 1, BookID = bookID, BookName = book.BookName, UserID = userID, BorrowedDate = DateTime.Now, BookStatus = ApplicationDBContext.BookStatus[0], PaidFineAmount = 0 };
            ApplicationDBContext.borrows.Add(borrow);
            return Ok(borrow.BorrowID);
        }

        [HttpPut("cancel/{userID}/{borrowID}/{fineAmount}/{bookID}")]
        public IActionResult Cancel(int userID, int borrowID, int fineAmount, int bookID)
        {
            var borrow = ApplicationDBContext.borrows.FirstOrDefault(borrow => borrow.BorrowID == borrowID && borrow.UserID == userID);

            var book = ApplicationDBContext.books.FirstOrDefault(book => book.BookID == bookID);
            if (borrow == null)
            {
                return NotFound();
            }
            if (borrow.BookStatus == ApplicationDBContext.BookStatus[1])
            {
                return BadRequest("Book is  already returned");
            }
            borrow.BookStatus = ApplicationDBContext.BookStatus[1];
            book.BookAvailability = ApplicationDBContext.Availability[1];
            borrow.PaidFineAmount = fineAmount;
            var user = ApplicationDBContext.users.FirstOrDefault(user => user.UserID == userID);
            user.Amount -= fineAmount;
            return Ok();
        }
    }
}

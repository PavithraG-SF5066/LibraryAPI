using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryAPI.Models;
using Microsoft.AspNetCore.Mvc;


namespace LibraryAPI.Controllers
{
    public class ApplicationDBContext
    {
         public static List<string> Gender = new List<string>() { "Male", "Female", "Others" };
        public static List<string> DepartmentName = new List<string>() { "ECE", "EEE", "CSE" };
        public static List<string> BookStatus = new List<string>() { "Borrowed", "Returned" };
        public static List<string> Availability = new List<string>() { "Issued", "Available", "Damaged" };
        public static List<Users> users = new List<Users>()
        {
            new Users() { UserID = 1, Name = "Ravi",Gender=Gender[0],Department=DepartmentName[1], Email = "ravi@gmail.com",  Password = "Ravi@1",  UserPhoneNumber = "9876543210",Amount = 1000 },
            new Users() { UserID = 2, Name = "Priya",Gender=Gender[1],Department=DepartmentName[2], Email = "priya@gmail.com",  Password = "Priya@1",  UserPhoneNumber = "987587646",Amount = 5000 }
        };
  
        public static List<BookDetails> books = new List<BookDetails>()
        {
            new BookDetails() { BookID = 1, BookName = "C#",  AuthorName ="Author1",  BookAvailability = Availability[0]},
            new BookDetails() { BookID = 2, BookName = "C#",  AuthorName ="Author1",  BookAvailability =Availability[0] },
            new BookDetails() { BookID = 3, BookName = "C#",  AuthorName ="Author2",  BookAvailability =Availability[0] },
            new BookDetails() { BookID = 4, BookName = "HTML",  AuthorName ="Author2",  BookAvailability =Availability[1]},
            new BookDetails() { BookID = 5, BookName = "HTML",  AuthorName ="Author1",  BookAvailability =Availability[1]},
            new BookDetails() { BookID = 6, BookName = "CSS",  AuthorName ="Author1",  BookAvailability = Availability[2]},
            new BookDetails() { BookID = 7, BookName = "CSS",  AuthorName ="Author2", BookAvailability = Availability[1]},
            new BookDetails() { BookID = 8, BookName = "Js",  AuthorName ="Author2", BookAvailability = Availability[1]},
            new BookDetails() { BookID = 9, BookName = "Js",  AuthorName ="Author2", BookAvailability = Availability[1]},
            new BookDetails() { BookID = 10, BookName = "Ts",  AuthorName ="Author1", BookAvailability = Availability[2]},

        };

        public static List<BorrowDetails> borrows = new List<BorrowDetails>(){
            new BorrowDetails() { BorrowID = 1, BookID = 1, BookName = "C#", UserID = 1,  BorrowedDate = new DateTime(2023, 10, 15),BookStatus=BookStatus[0],PaidFineAmount=0 },
            new BorrowDetails() { BorrowID = 2, BookID = 2, BookName = "C#", UserID = 2,  BorrowedDate = new DateTime(2023, 10, 16),BookStatus=BookStatus[1],PaidFineAmount=10 },

        };
    }
}
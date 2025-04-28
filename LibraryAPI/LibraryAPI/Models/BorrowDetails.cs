using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryAPI.Models
{
    public class BorrowDetails
    {
        public int BorrowID { get; set; }
        public int BookID { get; set; }
        public string BookName { get; set; }
        public int UserID { get; set; }
        public DateTime BorrowedDate { get; set; }
        public string BookStatus { get; set; }
        public double PaidFineAmount { get; set; }
    }
}
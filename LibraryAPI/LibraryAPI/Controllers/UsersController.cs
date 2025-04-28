using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LibraryAPI.Models;

namespace LibraryAPI.Controllers
{
    [ApiController]
    [Route("api/library/usersController")]
    public class UsersController : ControllerBase
    {
        //getting the sign in user
        [HttpGet("{email}")]
        public IActionResult GetUser(string email)
        {
            var user = ApplicationDBContext.users.FirstOrDefault(user => user.Email == email.ToLower());
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        //adding new user
        [HttpPost("newUser/{user}")]
        public IActionResult AddNewUser([FromBody] Users user)
        {
            // Generate a unique customer ID by incrementing an auto-incrementing ID
            user.UserID = ApplicationDBContext.users.Count + 1;
            ApplicationDBContext.users.Add(user);
            return Ok(user.UserID); // Return the added customer to confirm
        }

        [HttpPut("recharge/{userID}/{amount}")]
        public IActionResult RechargeWalletBalance(int userID, double amount)
        {
            var user = ApplicationDBContext.users.FirstOrDefault(user => user.UserID == userID);
            if (user == null)
            {
                return NotFound();
            }
            user.Amount += amount;
            return Ok();
        }
    }
}
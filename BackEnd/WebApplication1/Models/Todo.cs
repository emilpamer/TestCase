using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Todo
    {
        public string userEmail { get; set; } // Foreign key
        public int todoID { get; set; } // Key
        public string category { get; set; }
        public string text { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/todo/{userEmail}")]
    public class TodoController : ApiController
    {
        // Inserts a task into the MySQL database
        [HttpPost]
        [Route("insert")]
        public Todo insertTodo([FromBody]string json, [FromUri]string userEmail)
        {
            Todo todo = Newtonsoft.Json.JsonConvert.DeserializeObject<Todo>(json);
            todo.userEmail = userEmail;

            DBConnect db = new DBConnect();

            db.InsertTodo(userEmail, todo.category, todo.text);
            
            return todo;
        }

        [HttpGet]
        [Route("get")]
        public List<Todo> getAllUserTodos([FromUri]string userEmail)
        {
            DBConnect db = new DBConnect();
            List<string>[] todoList = db.getAllUserTodos(userEmail);

            List<Todo> outList = new List<Todo>();
            for (int i = 0; i < todoList[0].Count; i++)
            {
                Todo todo = new Todo();
                todo.userEmail = userEmail;
                todo.category = todoList[0][i];
                todo.text = todoList[1][i];
                todo.todoID = int.Parse(todoList[2][i]);
                outList.Add(todo);
            }
            return outList;
        }
    }
}
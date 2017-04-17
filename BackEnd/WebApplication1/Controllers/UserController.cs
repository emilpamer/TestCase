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
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        // Inserts a user into the MySQL database
        [HttpPost]
        [Route("insert")]
        public User insertUser([FromBody]string json)
        {
            User user = Newtonsoft.Json.JsonConvert.DeserializeObject<User>(json);
            DBConnect db = new DBConnect();
            db.InsertUser(user.name, user.email);
            User outUser = db.getUser(user.email);
            return outUser;
        }

        [HttpGet]
        [Route("get")]
        public List<User> getAllUsers()
        {
            DBConnect db = new DBConnect();
            List<string>[] userList = db.getAllUsers();

            List<User> outList = new List<User>();
            for (int i = 0; i < userList[0].Count; i++)
            {
                User user = new User();
                user.email = userList[0][i];
                user.name = userList[1][i];
                outList.Add(user);
            }
            return outList;
        }
    }
}

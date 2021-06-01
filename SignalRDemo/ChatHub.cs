using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;

namespace SignalRDemo
{
    public class UserCountMessage
    {
        public int Count { get; set; }
    }

    public class NewMessage
    {
        public string Message { get; set; }
    }

    public class ChatHub : Hub
    {
        
        private static int _totalUsers = 0;
        private static List<string> _messages = new List<string>();
        
        public ChatHub(IConfiguration configuration)
        {
            //configuration.GetConnectionString("ConStr");
        }
        
        public void NewUser()
        {
            _totalUsers++;
            var countMessage = new UserCountMessage { Count = _totalUsers };
            Clients.All.SendAsync("newUser", countMessage);
        }

        public void SendMessage(NewMessage newMessage)
        {
            //Context.User.Identity.Name
            
            _messages.Add(newMessage.Message);
            Clients.All.SendAsync("newMessage", _messages);
        }
    }
}

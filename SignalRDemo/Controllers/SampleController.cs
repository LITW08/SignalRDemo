using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SampleController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _context;

        public SampleController(IHubContext<ChatHub> context)
        {
            _context = context;
        }
        
        [HttpGet]
        [Route("getdata")]
        public object GetData()
        {
            _context.Clients.All.SendAsync("guidRequested");
            return new { value = Guid.NewGuid() };
        }
    }
}

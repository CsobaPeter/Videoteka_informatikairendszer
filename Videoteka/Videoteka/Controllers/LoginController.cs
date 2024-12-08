using Microsoft.AspNetCore.Mvc;
using Videoteka.Repositories;
using Videoteka.Shared.Models;

namespace Videoteka.Controllers
{
    [ApiController]
    [Route("auth/")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginRepository _loginRepo;

        public LoginController(ILoginRepository loginRepo)
        {
            _loginRepo = loginRepo;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var existingUser = await _loginRepo.GetByName(user.Username);


            if (existingUser is null)
            {
                return NotFound();
            }
            else if (existingUser.Password != user.Password)
            {
                return Unauthorized();
            }

            ActiveUserMiddleware.AddActiveUser(existingUser.Username);

            Console.WriteLine(existingUser.Username + " " + user.Password);
            var response = new
            {
                userid = existingUser.UserId,
                username = existingUser.Username,
                userrole = existingUser.RoleOfUser
            };
            Console.WriteLine(response);

            return Ok(response);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] User user)
        {
            if (string.IsNullOrEmpty(user?.Username))
            {
                return BadRequest("Invalid user data.");
            }

            var existingUser = await _loginRepo.GetByName(user.Username);

            if (existingUser is null)
            {
                return NotFound();
            }

            ActiveUserMiddleware.RemoveActiveUser(existingUser.Username);

            return Ok();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var existingLogin = await _loginRepo.GetByName(user.Username);

            if (existingLogin is not null)
            {
                return Conflict();
            }

            await _loginRepo.Add(user);
            var response = _loginRepo.GetByName(user.Username).Result;

            return Ok(response);
        }

        [HttpGet("get/{id:guid}")]
        public async Task<ActionResult<User>> Get(Guid id)
        {
            var user = await _loginRepo.Get(id);

            if (user is null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("getall")]
        public async Task<ActionResult<List<User>>> GetAll()
        {
            return Ok(await _loginRepo.GetAll());
        }

        [HttpPut("update/{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] User newUser)
        {
            var user = await _loginRepo.Get(id);
            user.Username = newUser.Username;
            user.Password = newUser.Password;

            await _loginRepo.Update(user);

            return Ok();
        }

        [HttpDelete("delete/{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var user = await _loginRepo.Get(id);

            if (user is null)
            {
                return NotFound();
            }

            await _loginRepo.Delete(id);

            return Ok();
        }
    }
}

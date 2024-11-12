using Microsoft.AspNetCore.Mvc;
using Videoteka.Repositories;
using Videoteka.Shared.Models;

namespace Videoteka.Controllers
{
    [ApiController]
    [Route("login/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ILoginRepository _loginRepo;

        public LoginController(ILoginRepository loginRepo)
        {
            _loginRepo = loginRepo;
        }

        [HttpPost("/login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var existingLogin = await _loginRepo.Get(user.UserId);

            if (existingLogin is null)
            {
                return NotFound();
            }
            LoginRepository.LoggedInUsers.Add(user);
            ActiveUserMiddleware.AddActiveUser(user.Username);

            return Ok();
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var existingLogin = await _loginRepo.Get(user.UserId);

            if (existingLogin is not null)
            {
                return Conflict();
            }

            await _loginRepo.Add(user);

            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] User newUser)
        {
            var user = await _loginRepo.Get(newUser.UserId);
            user.Username = newUser.Username;
            user.Password = newUser.Password;

            await _loginRepo.Update(user);

            return Ok();
        }

        [HttpDelete]
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

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<User>> Get(Guid id)
        {
            var user = await _loginRepo.Get(id);

            if (user is null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("/logout")]
        public async Task<IActionResult> Logout([FromBody] User user)
        {
            var existingUser = await _loginRepo.Get(user.UserId);

            if (existingUser is null)
            {
                return NotFound();
            }

            LoginRepository.LoggedInUsers.TryTake(out user);
            ActiveUserMiddleware.RemoveActiveUser(user.Username);

            return Ok();
        }
    }
}

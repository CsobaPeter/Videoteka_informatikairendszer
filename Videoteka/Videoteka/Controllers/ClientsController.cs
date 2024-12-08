using Videoteka.Shared.Models;
using Videoteka.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Videoteka.Controllers
{
    [ApiController]
    [Route("client/")]
    public class ClientsController : ControllerBase
    {
        private readonly IClientRepository _clientRepo;
        private readonly ILoginRepository _loginRepo;

        public ClientsController(IClientRepository clientRepo, ILoginRepository loginRepo)
        {
            _clientRepo = clientRepo;
            _loginRepo = loginRepo;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] Client client)
        {
            var existingClient = await _clientRepo.Get(client.ClientId);

            if (existingClient is not null)
            {
                return Conflict();
            }

            await _clientRepo.Add(client);

            return Ok();
        }

        [HttpDelete("delete/{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var client = await _clientRepo.Get(id);

            if (client is null)
            {
                return NotFound();
            }

            await _clientRepo.Delete(id);

            return Ok();
        }

        [HttpGet("get/{id:guid}")]
        public async Task<ActionResult<Media>> Get(Guid id)
        {
            var client = await _clientRepo.Get(id);

            if (client is null)
            {
                return NotFound();
            }

            return Ok(client);
        }

        [HttpGet("getall")]
        public async Task<ActionResult<List<Media>>> GetAll()
        {
            return Ok(await _clientRepo.GetAll());
        }

        [HttpPut("update/{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Client newClient)
        {
            if (id != newClient.ClientId)
            {
                return BadRequest();
            }

            await _clientRepo.Update(newClient);

            return Ok();
        }

        [HttpGet("getbyusername/{username}")]
        public async Task<ActionResult<Guid>> GetByUsername(string username)
        {
            var client = _clientRepo.GetByUserId(_loginRepo.GetByName(username).Result.UserId).Result.ClientId;

            return Ok(client);
        }
    }
}

using Videoteka.Models;
using Videoteka.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MechanicApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly IClientRepository _clientRepo;

        public ClientsController(IClientRepository clientRepo)
        {
            _clientRepo = clientRepo;
        }

        [HttpPost]
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

        [HttpDelete("{id:guid}")]
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

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Client>> Get(Guid id)
        {
            var client = await _clientRepo.Get(id);

            if (client is null)
            {
                return NotFound();
            }

            return Ok(client);
        }

        [HttpGet]
        public async Task<ActionResult<List<Client>>> GetAll()
        {
            return Ok(await _clientRepo.GetAll());
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Client newClient)
        {
            if (id != newClient.ClientId)
            {
                return BadRequest();
            }

            var existingClient = await _clientRepo.Get(id);

            if (existingClient is null)
            {
                return NotFound();
            }

            await _clientRepo.Update(newClient);

            return Ok();
        }

        [HttpGet("{id:guid}/borrows")]
        public async Task<ActionResult<List<Media>>> GetMediasOfClient(Guid id)
        {
            var client = await _clientRepo.Get(id);

            if (client is null)
            {
                return NotFound();
            }

            return Ok(await _clientRepo.GetMediasOfClient(id));
        }
    }
}

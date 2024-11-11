using Videoteka.Shared.Models;
using Videoteka.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Videoteka.Controllers
{
    [ApiController]
    [Route("borrow/[controller]")]
    public class BorrowsController : ControllerBase
    {
        private readonly IBorrowRepository _borrowRepo;

        public BorrowsController(IBorrowRepository borrowRepo)
        {
            _borrowRepo = borrowRepo;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Borrow borrow)
        {
            var existingBorrow = await _borrowRepo.Get(borrow.MediaId);

            if (existingBorrow is not null)
            {
                return Conflict();
            }

            await _borrowRepo.Add(borrow);

            return Ok();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var borrow = await _borrowRepo.Get(id);

            if (borrow is null)
            {
                return NotFound();
            }

            await _borrowRepo.Delete(id);

            return Ok();
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Borrow>> Get(Guid id)
        {
            var borrow = await _borrowRepo.Get(id);

            if (borrow is null)
            {
                return NotFound();
            }

            return Ok(borrow);
        }

        [HttpGet]
        public async Task<ActionResult<List<Borrow>>> GetAll()
        {
            return Ok(await _borrowRepo.GetAll());
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Borrow newBorrow)
        {
            if (id != newBorrow.BorrowId)
            {
                return BadRequest();
            }

            var existingClient = await _borrowRepo.Get(id);

            if (existingClient is null)
            {
                return NotFound();
            }

            await _borrowRepo.Update(newBorrow);

            return Ok();
        }

        [HttpGet("client/{clientId:guid}")]
        public async Task<ActionResult<List<Media>>> GetMediasOfClient(Guid clientId)
        {
            return Ok(await _borrowRepo.GetMediasOfClient(clientId));
        }
    }
}

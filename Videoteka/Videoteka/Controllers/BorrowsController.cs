using Videoteka.Shared.Models;
using Videoteka.Repositories;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;

namespace Videoteka.Controllers
{
    [ApiController]
    [Route("borrow/")]
    public class BorrowsController : ControllerBase
    {
        private readonly IBorrowRepository _borrowRepo;
        private readonly ILoginRepository _loginRepo;
        private readonly IClientRepository _clientRepo;
        private readonly IMediaRepository _mediaRepo;

        public BorrowsController(IBorrowRepository borrowRepo, ILoginRepository loginRepo, 
            IClientRepository clientRepo, IMediaRepository mediaRepo)
        {
            _borrowRepo = borrowRepo;
            _loginRepo = loginRepo;
            _clientRepo = clientRepo;
            _mediaRepo = mediaRepo;
        }

        [HttpPost("add")]
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

        [HttpDelete("delete/{id:guid}")]
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

        [HttpGet("get/{id:guid}")]
        public async Task<ActionResult<Borrow>> Get(Guid id)
        {
            var borrow = await _borrowRepo.Get(id);

            if (borrow is null)
            {
                return NotFound();
            }

            return Ok(borrow);
        }

        [HttpGet("getclosest/{mediaId:guid}")]
        public async Task<ActionResult<Borrow>> GetClosest(Guid mediaId)
        {
            var borrow = await _borrowRepo.GetClosestByMediaId(mediaId);

            if (borrow is null)
            {
                return NotFound();
            }

            return Ok(borrow);
        }

        [HttpGet("getall")]
        public async Task<ActionResult<List<Borrow>>> GetAll()
        {
            return Ok(await _borrowRepo.GetAll());
        }

        [HttpGet("user/getall/{username}")]
        public async Task<IActionResult> GetBorrowsForUser(string username)
        {
            var user = _loginRepo.GetByName(username).Result;

            if (user.RoleOfUser == Role.RegisteredUser)
            {
                var client = _clientRepo.GetByUserId(user.UserId).Result;
                if (client is null)
                {
                    return NotFound("user profile is not connected to any client");
                }

                var borrows = await _borrowRepo.GetBorrowsByClientId(client.ClientId);
                return Ok(borrows);
            }
            return NotFound();
        }

        [HttpGet("price/{id:guid}")]
        public async Task<IActionResult> GetPrice(Guid id)
        {
            var borrow = await _borrowRepo.Get(id);

            if (borrow is null)
            {
                return NotFound();
            }

            var media = await _mediaRepo.Get(borrow.MediaId);

            if (media is null)
            {
                return NotFound();
            }

            var price = borrow.CalculatePriceOfBorrow(media.Type);

            return Ok(price);
        }


        [HttpPut("update/{id:guid}")]
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

            return Ok(newBorrow);
        }
    }
}

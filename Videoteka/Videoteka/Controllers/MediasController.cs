using Videoteka.Shared.Models;
using Videoteka.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Videoteka.Controllers
{
    [ApiController]
    [Route("media/[controller]")]
    public class MediasController : ControllerBase
    {
        private readonly IMediaRepository _mediaRepo;

        public MediasController(IMediaRepository mediRepo)
        {
            _mediaRepo = mediRepo;
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Media media)
        {
            var existingMedia = await _mediaRepo.Get(media.MediaId);
            Console.WriteLine("Existing media: " + existingMedia);

            if (existingMedia is not null)
            {
                return Conflict();
            }

            await _mediaRepo.Add(media);

            return Ok();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var media = await _mediaRepo.Get(id);

            if (media is null)
            {
                return NotFound();
            }

            await _mediaRepo.Delete(id);

            return Ok();
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Media>> Get(Guid id)
        {
            var media = await _mediaRepo.Get(id);

            if (media is null)
            {
                return NotFound();
            }

            return Ok(media);
        }

        [HttpGet]
        public async Task<ActionResult<List<Media>>> GetAll()
        {
            return Ok(await _mediaRepo.GetAll());
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Media newMedia)
        {
            if (id != newMedia.MediaId)
            {
                return BadRequest();
            }

            var existingMedia = await _mediaRepo.Get(id);

            if (existingMedia is null)
            {
                return NotFound();
            }

            await _mediaRepo.Update(newMedia);

            return Ok();
        }
    }
}

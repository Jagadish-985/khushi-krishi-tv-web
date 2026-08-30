using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

[ApiController]
[Route("api/[controller]")]
public class VideosController : ControllerBase
{
    private readonly MongoDbService _mongo;
    public VideosController(MongoDbService mongo) { _mongo = mongo; }

    [HttpGet]
    public IActionResult GetAll([FromQuery] string? category)
    {
        var filter = string.IsNullOrEmpty(category)
            ? Builders<Video>.Filter.Empty
            : Builders<Video>.Filter.Eq(v => v.Category, category);
        return Ok(_mongo.Videos.Find(filter).ToList());
    }

    [HttpGet("{slug}")]
    public IActionResult GetBySlug(string slug)
    {
        var item = _mongo.Videos.Find(v => v.Slug == slug).FirstOrDefault();
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public IActionResult Create(Video video)
    {
        _mongo.Videos.InsertOne(video);
        return CreatedAtAction(nameof(GetBySlug), new { slug = video.Slug }, video);
    }

    [HttpPut("{id}")]
    public IActionResult Update(string id, Video updated)
    {
        var result = _mongo.Videos.ReplaceOne(v => v.Id == id, updated);
        if (result.MatchedCount == 0) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        var result = _mongo.Videos.DeleteOne(v => v.Id == id);
        if (result.DeletedCount == 0) return NotFound();
        return NoContent();
    }
}
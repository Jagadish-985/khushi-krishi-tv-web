using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

[ApiController]
[Route("api/[controller]")]
public class ProgramsController : ControllerBase
{
    private readonly MongoDbService _mongo;
    public ProgramsController(MongoDbService mongo) { _mongo = mongo; }

    [HttpGet]
    public IActionResult GetAll() => Ok(_mongo.Programs.Find(_ => true).ToList());

    [HttpGet("{slug}")]
    public IActionResult GetBySlug(string slug)
    {
        var item = _mongo.Programs.Find(p => p.Slug == slug).FirstOrDefault();
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public IActionResult Create(ShowProgram program)
    {
        _mongo.Programs.InsertOne(program);
        return CreatedAtAction(nameof(GetBySlug), new { slug = program.Slug }, program);
    }

    [HttpPut("{id}")]
    public IActionResult Update(string id, ShowProgram updated)
    {
        var result = _mongo.Programs.ReplaceOne(p => p.Id == id, updated);
        if (result.MatchedCount == 0) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        var result = _mongo.Programs.DeleteOne(p => p.Id == id);
        if (result.DeletedCount == 0) return NotFound();
        return NoContent();
    }
}

using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

[ApiController]
[Route("api/[controller]")]
public class SchemesController : ControllerBase
{
    private readonly MongoDbService _mongo;
    public SchemesController(MongoDbService mongo) { _mongo = mongo; }

    [HttpGet]
    public IActionResult GetAll() => Ok(_mongo.Schemes.Find(_ => true).ToList());

    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        var item = _mongo.Schemes.Find(s => s.Id == id).FirstOrDefault();
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public IActionResult Create(Scheme scheme)
    {
        _mongo.Schemes.InsertOne(scheme);
        return CreatedAtAction(nameof(GetById), new { id = scheme.Id }, scheme);
    }

    [HttpPut("{id}")]
    public IActionResult Update(string id, Scheme updated)
    {
        var result = _mongo.Schemes.ReplaceOne(s => s.Id == id, updated);
        if (result.MatchedCount == 0) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        var result = _mongo.Schemes.DeleteOne(s => s.Id == id);
        if (result.DeletedCount == 0) return NotFound();
        return NoContent();
    }
}
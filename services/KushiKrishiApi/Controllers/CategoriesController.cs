using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly MongoDbService _mongo;

    public CategoriesController(MongoDbService mongo)
    {
        _mongo = mongo;
    }

    // GET: api/categories
    [HttpGet]
    public IActionResult GetAll()
    {
        var categories = _mongo.Categories.Find(_ => true).ToList();
        return Ok(categories);
    }

    // GET: api/categories/{id}
    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        var category = _mongo.Categories.Find(c => c.Id == id).FirstOrDefault();
        if (category == null) return NotFound();
        return Ok(category);
    }

    // GET: api/categories/slug/{slug}
    [HttpGet("slug/{slug}")]
    public IActionResult GetBySlug(string slug)
    {
        var category = _mongo.Categories.Find(c => c.Slug == slug).FirstOrDefault();
        if (category == null) return NotFound();
        return Ok(category);
    }

    // POST: api/categories
    [HttpPost]
    public IActionResult Create(Category category)
    {
        _mongo.Categories.InsertOne(category);
        return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
    }

    // PUT: api/categories/{id}
    [HttpPut("{id}")]
    public IActionResult Update(string id, Category updatedCategory)
    {
        var result = _mongo.Categories.ReplaceOne(c => c.Id == id, updatedCategory);
        if (result.MatchedCount == 0) return NotFound();
        return NoContent();
    }

    // DELETE: api/categories/{id}
    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        var result = _mongo.Categories.DeleteOne(c => c.Id == id);
        if (result.DeletedCount == 0) return NotFound();
        return NoContent();
    }
}

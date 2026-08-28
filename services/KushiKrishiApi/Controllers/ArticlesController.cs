using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

[ApiController]
[Route("api/[controller]")]
public class ArticlesController : ControllerBase
{
    private readonly MongoDbService _mongo;

    public ArticlesController(MongoDbService mongo)
    {
        _mongo = mongo;
    }

    // GET: api/articles
    [HttpGet]
    public IActionResult GetAll()
    {
        var articles = _mongo.Articles.Find(_ => true).ToList();
        return Ok(articles);
    }

    // GET: api/articles/{id}
    [HttpGet("{id}")]
    public IActionResult GetById(string id)
    {
        var article = _mongo.Articles.Find(a => a.Id == id).FirstOrDefault();
        if (article == null) return NotFound();
        return Ok(article);
    }

    // GET: api/articles/slug/{slug}
    [HttpGet("slug/{slug}")]
    public IActionResult GetBySlug(string slug)
    {
        var article = _mongo.Articles.Find(a => a.Slug == slug).FirstOrDefault();
        if (article == null) return NotFound();
        return Ok(article);
    }

    // POST: api/articles
    [HttpPost]
    public IActionResult Create(Article article)
    {
        _mongo.Articles.InsertOne(article);
        return CreatedAtAction(nameof(GetById), new { id = article.Id }, article);
    }

    // PUT: api/articles/{id}
    [HttpPut("{id}")]
    public IActionResult Update(string id, Article updatedArticle)
    {
        var result = _mongo.Articles.ReplaceOne(a => a.Id == id, updatedArticle);
        if (result.MatchedCount == 0) return NotFound();
        return NoContent();
    }

    // DELETE: api/articles/{id}
    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        var result = _mongo.Articles.DeleteOne(a => a.Id == id);
        if (result.DeletedCount == 0) return NotFound();
        return NoContent();
    }
}
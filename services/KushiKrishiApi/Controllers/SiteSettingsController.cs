using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

[ApiController]
[Route("api/[controller]")]
public class SiteSettingsController : ControllerBase
{
    private readonly MongoDbService _mongo;
    public SiteSettingsController(MongoDbService mongo) { _mongo = mongo; }

    [HttpGet]
    public IActionResult Get()
    {
        var settings = _mongo.Settings.Find(_ => true).FirstOrDefault();
        if (settings == null)
        {
            settings = new SiteSettings();
            _mongo.Settings.InsertOne(settings);
        }
        return Ok(settings);
    }

    [HttpPut]
    public IActionResult Update(SiteSettings updated)
    {
        var existing = _mongo.Settings.Find(_ => true).FirstOrDefault();
        if (existing == null)
        {
            _mongo.Settings.InsertOne(updated);
            return Ok(updated);
        }
        updated.Id = existing.Id;
        _mongo.Settings.ReplaceOne(s => s.Id == existing.Id, updated);
        return Ok(updated);
    }
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Article
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public bool IsBreakingNews { get; set; }
    public DateTime PublishedAt { get; set; }

    // New fields for article detail page
    public string Author { get; set; } = "Kushi Krishi Desk";
    public int ReadTimeMinutes { get; set; } = 5;
    public string Excerpt { get; set; } = string.Empty;
    public List<string> Tags { get; set; } = new List<string>();

    // RSS provision fields (not used yet, reserved for later)
    public string? SourceFeedUrl { get; set; }
    public string? SourceGuid { get; set; }
}
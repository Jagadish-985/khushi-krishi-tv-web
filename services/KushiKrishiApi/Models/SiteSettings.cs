using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

public class SiteSettings
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    public string SiteName { get; set; } = "Kushi Krishi TV";
    public string Tagline { get; set; } = "ಕೃಷಿ, ನುಡಿ ನುಡಿತ";
    public string FooterText { get; set; } = "Your trusted source for agriculture news, market updates, expert advice and inspiring stories.";
    public string HeroImageUrl { get; set; } = "";
    public List<string> FeaturedArticleIds { get; set; } = new();
}

using MongoDB.Driver;

public class MongoDbService
{
    private readonly IMongoDatabase _database;

    public MongoDbService(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDB:ConnectionString"]);
        _database = client.GetDatabase(config["MongoDB:DatabaseName"]);
    }

    public IMongoCollection<Article> Articles => _database.GetCollection<Article>("Articles");
    public IMongoCollection<Category> Categories => _database.GetCollection<Category>("Categories");
    public IMongoCollection<Scheme> Schemes => _database.GetCollection<Scheme>("Schemes");
    public IMongoCollection<Video> Videos => _database.GetCollection<Video>("Videos");
    public IMongoCollection<ShowProgram> Programs => _database.GetCollection<ShowProgram>("Programs");
}
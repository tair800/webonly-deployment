var builder = WebApplication.CreateBuilder(args);

// Minimal services
builder.Services.AddControllers();

var app = builder.Build();

// Define health check first - completely minimal
app.MapGet("/health", () => Results.Ok(new { Status = "Healthy" }));

// Root endpoint
app.MapGet("/", () => Results.Ok(new { Message = "WebOnlyAPI is running" }));

// Configure port and host for Railway
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
var host = "0.0.0.0";

Console.WriteLine($"Starting on {host}:{port}");

await app.RunAsync($"http://{host}:{port}");
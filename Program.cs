using Microsoft.EntityFrameworkCore;
using WebOnlyAPI.Data;
using WebOnlyAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.WithOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:3000")
                   .AllowAnyMethod()
                   .AllowAnyHeader()
                   .AllowCredentials();
        });
    
    // Allow Railway health checks
    options.AddPolicy("AllowHealthCheck",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IEquipmentService, EquipmentService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<IReferenceService, ReferenceService>();
builder.Services.AddScoped<DataSeederService>();
builder.Services.AddScoped<IVisitorAnalyticsService, VisitorAnalyticsService>();

var app = builder.Build();

// Ensure database is created
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    try
    {
        Console.WriteLine("Attempting to connect to database...");
        context.Database.EnsureCreated();
        Console.WriteLine("Database created/verified successfully.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error creating database: {ex.Message}");
        Console.WriteLine($"Stack trace: {ex.StackTrace}");
        // Don't fail the startup if database connection fails
    }
}

// Configure the HTTP request pipeline.
// Enable Swagger in both Development and Production for easier testing
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "WebOnlyAPI v1");
    options.RoutePrefix = ""; // This will serve Swagger UI at the root
});

// Disable HTTPS redirection for Railway
// app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseStaticFiles();

// Allow health checks from Railway
app.MapGet("/api/health", () => 
{
    return Results.Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow });
})
   .WithName("HealthCheck")
   .RequireCors("AllowHealthCheck");

// Simple health check without CORS
app.MapGet("/health", () => 
{
    // Reduced logging to prevent rate limits
    return Results.Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow });
});

// Root endpoint
app.MapGet("/", () => Results.Ok(new { Message = "WebOnlyAPI is running", Timestamp = DateTime.UtcNow }));

app.MapControllers();

// Seed data (non-blocking)
_ = Task.Run(async () =>
{
    try
    {
        using var scope = app.Services.CreateScope();
        var dataSeeder = scope.ServiceProvider.GetRequiredService<DataSeederService>();
        await dataSeeder.SeedAllDataAsync();
        Console.WriteLine("Data seeding completed successfully.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error seeding data: {ex.Message}");
    }
});

// Configure port and host for Railway
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
var host = "0.0.0.0"; // Listen on all interfaces for Railway

Console.WriteLine($"Starting application on {host}:{port}");
Console.WriteLine($"Environment: {app.Environment.EnvironmentName}");

await app.RunAsync($"http://{host}:{port}");

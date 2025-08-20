using Microsoft.OpenApi.Models;
using ServiceLayer.Companies;

var builder = WebApplication.CreateBuilder(args);
var appName = "Web.API";
// Add services to the container.
const string ALLOW_ORIGINS_POLICY = "_allowOriginsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(ALLOW_ORIGINS_POLICY,
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});
builder.Services.AddControllers();
builder.Services.AddApiVersioning();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = appName, Version = "v1" });
});
builder.Services.AddScoped<ICompaniesService, CompaniesService>();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", appName);
    });
}
// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.UseCors(ALLOW_ORIGINS_POLICY);

app.UseAuthorization();

app.MapControllers();

app.Run();
using Hospital.Data;
using Hospital.Models;
using Hospital.Repository.Interface;
using Hospital.Repository.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IBaseRepo<string, User>, UserRepo>();
builder.Services.AddScoped<ITokenGenerate, TokenService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<IUser, UsersService>();
builder.Services.AddScoped<IApprove, ApproveService>();
builder.Services.AddScoped<IPatient, PatientServices>();

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("AngularCORS", options =>
    {
        options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});
builder.Services.AddDbContext<HsptlContext>(optionsAction: options => options.UseSqlServer(builder.Configuration.GetConnectionString(name: "SQLConnection")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors("AngularCORS");

app.UseAuthorization();

app.MapControllers();

app.Run();

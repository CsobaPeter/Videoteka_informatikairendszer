using Serilog;
using Microsoft.EntityFrameworkCore;
using Videoteka.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Videoteka
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSerilog(
                    config =>
                        config
                            .MinimumLevel.Information()
                            .WriteTo.Console()
                            .WriteTo.File("log.txt"));

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            builder.Services.AddDbContext<AppContext>(options =>
            {
                options.UseSqlite(builder.Configuration.GetConnectionString("Sqlite"));
                options.UseLazyLoadingProxies();
            }, ServiceLifetime.Scoped);

            builder.Services.AddScoped<IMediaRepository, MediaRepository>();
            builder.Services.AddScoped<IBorrowRepository, BorrowRepository>();
            builder.Services.AddScoped<IClientRepository, ClientRepository>();
            builder.Services.AddScoped<ILoginRepository, LoginRepository>();

            var app = builder.Build();


            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(o => o.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseMiddleware<ActiveUserMiddleware>();
            app.UseMiddleware<RoleBasedAuthorizationMiddleware>();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }

    }
}
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using VideotekaClient;
using VideotekaClient.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri("https://localhost:8080/api/") });
builder.Services.AddScoped<IClientService, ClientService>();
builder.Services.AddScoped<IMediaService, MediaService>();
builder.Services.AddScoped<IBorrowService, BorrowService>();




await builder.Build().RunAsync();

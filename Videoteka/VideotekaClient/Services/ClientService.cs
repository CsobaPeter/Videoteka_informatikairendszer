using Videoteka.Shared.Models;
using System.Net.Http.Json;
using VideotekaClient.Services;

public class ClientService : IClientService
{
    private readonly HttpClient _httpClient;

    public ClientService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<Client>> GetAllClients() =>
        await _httpClient.GetFromJsonAsync<List<Client>>("api/clients");

    public async Task<Client> GetClient(Guid clientId) =>
        await _httpClient.GetFromJsonAsync<Client>($"api/clients/{clientId}");

    public async Task AddClient(Client client) =>
        await _httpClient.PostAsJsonAsync("api/clients", client);

    public async Task UpdateClient(Client client) =>
        await _httpClient.PutAsJsonAsync($"api/clients/{client.ClientId}", client);

    public async Task DeleteClient(Guid clientId) =>
        await _httpClient.DeleteAsync($"api/clients/{clientId}");
}

using System.Net.Http.Json;
using Videoteka.Shared.Models;
using VideotekaClient.Services;

public class BorrowService : IBorrowService
{
    private readonly HttpClient _httpClient;

    public BorrowService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<Borrow>> GetAllBorrows() =>
        await _httpClient.GetFromJsonAsync<List<Borrow>>("api/borrows");

    public async Task<Borrow> GetBorrow(Guid borrowId) =>
        await _httpClient.GetFromJsonAsync<Borrow>($"api/borrows/{borrowId}");

    public async Task AddBorrow(Borrow borrow) =>
        await _httpClient.PostAsJsonAsync("api/borrows", borrow);

    public async Task UpdateBorrow(Borrow borrow) =>
        await _httpClient.PutAsJsonAsync($"api/borrows/{borrow.BorrowId}", borrow);

    public async Task DeleteBorrow(Guid borrowId) =>
        await _httpClient.DeleteAsync($"api/borrows/{borrowId}");

    public async Task<List<Media>> GetMediasOfClient(Guid clientId) =>
        await _httpClient.GetFromJsonAsync<List<Media>>($"api/clients/{clientId}/medias");
}

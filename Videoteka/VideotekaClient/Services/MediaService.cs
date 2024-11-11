using System.Net.Http.Json;
using Videoteka.Shared.Models;
using VideotekaClient.Services;

public class MediaService : IMediaService
{
    private readonly HttpClient _httpClient;

    public MediaService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<Media>> GetAllMedia() =>
        await _httpClient.GetFromJsonAsync<List<Media>>("api/medias");

    public async Task<Media> GetMedia(Guid mediaId) =>
        await _httpClient.GetFromJsonAsync<Media>($"api/medias/{mediaId}");

    public async Task AddMedia(Media media) =>
        await _httpClient.PostAsJsonAsync("api/medias", media);

    public async Task UpdateMedia(Media media) =>
        await _httpClient.PutAsJsonAsync($"api/medias/{media.MediaId}", media);

    public async Task DeleteMedia(Guid mediaId) =>
        await _httpClient.DeleteAsync($"api/medias/{mediaId}");
}

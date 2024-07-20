using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using brawlApp.Models;
using Newtonsoft.Json;

namespace brawlApp.Controllers{

[ApiController]
[Route("api/brawlers")]

    public class BrawlController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        public BrawlController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet("{tag}")]
        public async Task<IActionResult> GetPlayer(string tag)
        {
            var apiUrl = $"https://api.brawlstars.com/v1/players/{System.Net.WebUtility.UrlEncode(tag)}";
            var apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImMxYTQ2ZDhlLTUwMWEtNDhmYS04YzkyLTFmNDM4OWQ0OTNlNyIsImlhdCI6MTcyMTA5NDM1Miwic3ViIjoiZGV2ZWxvcGVyL2ZlMDBiZDBmLTU2MmQtMDIwMi1kOGY0LTFjMzZhZWE2ZjU3MSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiOTguMzUuMTQ5LjY4Il0sInR5cGUiOiJjbGllbnQifV19.MP1U_m35JJDng5j-k_lZhILEkdDUFx94asSONohVwm1gXyIhtYfKic0e-PVVcmOSmvNLKvT88svWuHWpZoBJYA";

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var response = await _httpClient.GetAsync(apiUrl);
            if (!response.IsSuccessStatusCode)
            {
                var errorMessage = $"Error fetching player data: {(int)response.StatusCode} - {response.ReasonPhrase} {apiUrl}";
                return StatusCode((int)response.StatusCode, errorMessage);
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            return Content(jsonResponse, "application/json"); ;
        }
    }
}

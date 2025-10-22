import { HttpClient } from "../utils/http-client";
import { LocationAutocompleteResponse } from "../types";

export class LocationApi {
  constructor(private httpClient: HttpClient) {}

  /**
   * Tự động hoàn thành địa chỉ từ Google Places
   */
  async autocomplete(input: string): Promise<LocationAutocompleteResponse> {
    if (!input || !input.trim()) {
      return { predictions: [], status: "ZERO_RESULTS" };
    }

    const response = await this.httpClient.get(
      "/api/v1/location/autocomplete",
      {
        params: { input },
      }
    );
    return response.data;
  }
}

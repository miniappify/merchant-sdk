export interface LocationPrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  types: string[];
}

export interface LocationAutocompleteResponse {
  predictions: LocationPrediction[];
  status: string;
}

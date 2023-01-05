export function validateWeather(response) {
  const {
    temp_c,
    temp_f,
    feelslike_c,
    feelslike_f,
    condition,
    wind_mph,
    wind_kph,
    wind_degree,
    wind_dir,
    pressure_mb,
    pressure_in,
    precip_mm,
    precip_in,
    humidity,
    cloud,
    is_day,
    uv,
    gust_mph,
    gust_kph 
  } = response?.data?.current;


  if (temp_c === undefined) return false;
  if (temp_f === undefined) return false;
  if (feelslike_c === undefined) return false;
  if (feelslike_f === undefined) return false;
  if (condition === undefined) return false;
  if (wind_mph === undefined) return false;
  if (wind_kph === undefined) return false;
  if (wind_degree === undefined) return false;
  if (wind_dir === undefined) return false;
  if (pressure_mb === undefined) return false;
  if (pressure_in === undefined) return false;
  if (precip_mm === undefined) return false;
  if (precip_in === undefined) return false;
  if (humidity === undefined) return false;
  if (cloud === undefined) return false;
  if (is_day === undefined) return false;
  if (uv === undefined) return false;
  if (gust_mph === undefined) return false;
  if (gust_kph === undefined) return false;
  
  return true;
}

export function validateWeatherError(response) {
  const { error } = response?.data;
  if (error === undefined) return false;
  return true;
}

export function validateWeatherResponse(response) {
  const { data } = response;
  if (data === undefined) return false;
  return true;
}
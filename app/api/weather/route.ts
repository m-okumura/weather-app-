import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 })
  }

  try {
    // Open-Meteo API（無料、APIキー不要）を使用して天気情報を取得
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`
    const response = await fetch(weatherUrl)

    if (!response.ok) {
      throw new Error('Weather API failed')
    }

    const data = await response.json()

    // Weather code to description mapping
    const getWeatherDescription = (code: number): string => {
      const weatherCodes: Record<number, string> = {
        0: '快晴',
        1: '晴れ',
        2: '一部曇り',
        3: '曇り',
        45: '霧',
        48: '霧氷',
        51: '小雨',
        53: '雨',
        55: '大雨',
        61: '弱い雨',
        63: '雨',
        65: '強い雨',
        71: '弱い雪',
        73: '雪',
        75: '大雪',
        77: '霰',
        80: '弱いにわか雨',
        81: 'にわか雨',
        82: '強いにわか雨',
        85: '弱いにわか雪',
        86: 'にわか雪',
        95: '雷雨',
        96: '雹を伴う雷雨',
        99: '大粒の雹を伴う雷雨'
      }
      return weatherCodes[code] || '不明'
    }

    const current = data.current
    return NextResponse.json({
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      description: getWeatherDescription(current.weather_code),
      weatherCode: current.weather_code
    })
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 })
  }
}

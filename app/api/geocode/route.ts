import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get('city')

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 })
  }

  try {
    // Nominatim API（OpenStreetMap）を使用して座標を取得
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`
    const response = await fetch(geocodeUrl, {
      headers: {
        'User-Agent': 'WeatherApp/1.0'
      }
    })

    if (!response.ok) {
      throw new Error('Geocoding failed')
    }

    const data = await response.json()

    if (data.length === 0) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 })
    }

    const location = data[0]
    return NextResponse.json({
      lat: parseFloat(location.lat),
      lon: parseFloat(location.lon),
      displayName: location.display_name
    })
  } catch (error) {
    console.error('Geocoding error:', error)
    return NextResponse.json({ error: 'Failed to fetch location data' }, { status: 500 })
  }
}

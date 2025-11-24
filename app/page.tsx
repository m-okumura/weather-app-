'use client'

import { useState } from 'react'
import WeatherCard from '@/components/WeatherCard'

export default function Home() {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [weatherData, setWeatherData] = useState<any>(null)
  const [locationName, setLocationName] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError('')
    setWeatherData(null)

    try {
      // 地理情報を取得
      const geocodeResponse = await fetch(`/api/geocode?city=${encodeURIComponent(city)}`)
      if (!geocodeResponse.ok) {
        throw new Error('都市が見つかりませんでした')
      }
      const geocodeData = await geocodeResponse.json()
      setLocationName(geocodeData.displayName)

      // 天気情報を取得
      const weatherResponse = await fetch(`/api/weather?lat=${geocodeData.lat}&lon=${geocodeData.lon}`)
      if (!weatherResponse.ok) {
        throw new Error('天気情報の取得に失敗しました')
      }
      const weather = await weatherResponse.json()
      setWeatherData(weather)
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期しないエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          天気アプリ
        </h1>

        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="都市名を入力 (例: Tokyo, Berlin, Dubai)"
              className="flex-1 px-4 py-3 rounded-lg border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/50 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? '検索中...' : '検索'}
            </button>
          </div>
        </form>

        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-300 text-white px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {weatherData && (
          <WeatherCard
            data={weatherData}
            locationName={locationName}
          />
        )}

        <div className="mt-8 text-center text-white/80 text-sm">
          <p>試してみる都市: Tokyo, Berlin, Dubai, New York, Paris</p>
        </div>
      </div>
    </main>
  )
}

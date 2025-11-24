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
    <main className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-12 animate-float">
          <div className="inline-block">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-3 tracking-tight">
              天気アプリ
            </h1>
            <p className="text-white/60 text-sm font-light tracking-wide">
              世界中の天気情報をリアルタイムで確認
            </p>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="glass rounded-2xl p-6 shadow-glow">
            <div className="flex gap-3">
              <div className="flex-1 relative group">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="都市名を入力 (例: Tokyo, Berlin, Dubai)"
                  className="w-full px-5 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:border-purple-400/60 focus:bg-white/15 transition-all duration-300 font-medium"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-glow hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    検索中
                  </span>
                ) : (
                  '検索'
                )}
              </button>
            </div>

            {/* Suggested Cities */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['Tokyo', 'Berlin', 'Dubai', 'New York', 'Paris'].map((suggestedCity) => (
                <button
                  key={suggestedCity}
                  type="button"
                  onClick={() => setCity(suggestedCity)}
                  className="px-3 py-1.5 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-200 hover:scale-105"
                >
                  {suggestedCity}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="glass-dark rounded-xl border-red-400/50 text-white px-5 py-4 mb-6 shadow-lg animate-pulse">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Weather Card */}
        {weatherData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <WeatherCard
              data={weatherData}
              locationName={locationName}
            />
          </div>
        )}
      </div>
    </main>
  )
}

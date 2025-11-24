interface WeatherCardProps {
  data: {
    temperature: number
    feelsLike: number
    humidity: number
    windSpeed: number
    description: string
    weatherCode: number
  }
  locationName: string
}

export default function WeatherCard({ data, locationName }: WeatherCardProps) {
  // 天気コードに応じた絵文字を返す
  const getWeatherEmoji = (code: number): string => {
    if (code === 0) return '☀️'
    if (code <= 3) return '⛅'
    if (code <= 48) return '🌫️'
    if (code <= 67) return '🌧️'
    if (code <= 77) return '🌨️'
    if (code <= 82) return '🌦️'
    if (code <= 86) return '🌨️'
    return '⛈️'
  }

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
      <div className="text-center mb-4">
        <h2 className="text-white/80 text-sm mb-1">現在地</h2>
        <p className="text-white font-semibold truncate" title={locationName}>
          {locationName.split(',')[0]}
        </p>
      </div>

      <div className="flex items-center justify-center mb-6">
        <span className="text-6xl mr-4">{getWeatherEmoji(data.weatherCode)}</span>
        <div>
          <div className="text-5xl font-bold text-white">
            {Math.round(data.temperature)}°
          </div>
          <div className="text-white/80 text-sm">
            {data.description}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-3">
          <div className="text-white/70 text-xs mb-1">体感温度</div>
          <div className="text-white text-lg font-semibold">
            {Math.round(data.feelsLike)}°
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-3">
          <div className="text-white/70 text-xs mb-1">湿度</div>
          <div className="text-white text-lg font-semibold">
            {data.humidity}%
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-3 col-span-2">
          <div className="text-white/70 text-xs mb-1">風速</div>
          <div className="text-white text-lg font-semibold">
            {data.windSpeed} km/h
          </div>
        </div>
      </div>
    </div>
  )
}

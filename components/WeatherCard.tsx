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

  // 天気コードに応じた背景グラデーションを返す
  const getWeatherGradient = (code: number): string => {
    if (code === 0) return 'from-amber-500/20 via-orange-500/20 to-yellow-500/20'
    if (code <= 3) return 'from-blue-500/20 via-cyan-500/20 to-sky-500/20'
    if (code <= 48) return 'from-gray-500/20 via-slate-500/20 to-zinc-500/20'
    if (code <= 67) return 'from-blue-600/20 via-indigo-600/20 to-blue-700/20'
    if (code <= 77) return 'from-blue-300/20 via-cyan-300/20 to-blue-400/20'
    if (code <= 82) return 'from-blue-400/20 via-sky-400/20 to-cyan-400/20'
    if (code <= 86) return 'from-blue-300/20 via-cyan-300/20 to-blue-400/20'
    return 'from-purple-600/20 via-indigo-600/20 to-purple-700/20'
  }

  return (
    <div className="relative group">
      {/* Background gradient based on weather */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${getWeatherGradient(data.weatherCode)} opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-70`}></div>

      {/* Main card */}
      <div className="relative glass rounded-3xl p-8 shadow-glow-lg border-white/30 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl"></div>

        {/* Location header */}
        <div className="relative text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-3">
            <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-white/70 text-xs font-medium uppercase tracking-wider">現在地</span>
          </div>
          <h2 className="text-white font-bold text-2xl truncate" title={locationName}>
            {locationName.split(',')[0]}
          </h2>
          <p className="text-white/50 text-sm mt-1">{locationName.split(',').slice(1).join(',')}</p>
        </div>

        {/* Main weather display */}
        <div className="relative flex items-center justify-center mb-8 py-6">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="animate-float">
            <span className="text-8xl drop-shadow-2xl">{getWeatherEmoji(data.weatherCode)}</span>
          </div>
          <div className="ml-8">
            <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">
              {Math.round(data.temperature)}°
            </div>
            <div className="text-white/70 text-lg font-medium mt-2 capitalize">
              {data.description}
            </div>
          </div>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-dark rounded-2xl p-4 hover:bg-white/15 transition-all duration-300 group/card">
            <div className="flex flex-col items-center text-center">
              <svg className="w-8 h-8 text-orange-400 mb-2 group-hover/card:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
              </svg>
              <div className="text-white/60 text-xs font-medium uppercase tracking-wide mb-1">体感温度</div>
              <div className="text-white text-2xl font-bold">
                {Math.round(data.feelsLike)}°
              </div>
            </div>
          </div>

          <div className="glass-dark rounded-2xl p-4 hover:bg-white/15 transition-all duration-300 group/card">
            <div className="flex flex-col items-center text-center">
              <svg className="w-8 h-8 text-blue-400 mb-2 group-hover/card:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586 8.58 7.165A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                <path d="M12.828 11.414a1 1 0 00-1.414 1.414l3.879 3.88a1 1 0 001.414-1.415l-3.879-3.879z" />
              </svg>
              <div className="text-white/60 text-xs font-medium uppercase tracking-wide mb-1">湿度</div>
              <div className="text-white text-2xl font-bold">
                {data.humidity}%
              </div>
            </div>
          </div>

          <div className="glass-dark rounded-2xl p-4 hover:bg-white/15 transition-all duration-300 group/card">
            <div className="flex flex-col items-center text-center">
              <svg className="w-8 h-8 text-cyan-400 mb-2 group-hover/card:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" clipRule="evenodd" />
              </svg>
              <div className="text-white/60 text-xs font-medium uppercase tracking-wide mb-1">風速</div>
              <div className="text-white text-2xl font-bold">
                {data.windSpeed}
              </div>
              <div className="text-white/50 text-xs mt-0.5">km/h</div>
            </div>
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div className="mt-6 h-1 w-full rounded-full overflow-hidden">
          <div className={`h-full bg-gradient-to-r ${getWeatherGradient(data.weatherCode)} opacity-60`}></div>
        </div>
      </div>
    </div>
  )
}

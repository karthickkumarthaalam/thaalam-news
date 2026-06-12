import { useEffect, useState } from "react";
import { Search, User, Languages, X, MapPin, CloudSun } from "lucide-react";
const Header = ({ onSearch }) => {
  const [time, setTime] = useState(new Date());
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  // const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Fetch user location + weather
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;

            // Reverse Geocode
            const geoRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
            );

            const geoData = await geoRes.json();

            setLocation(
              geoData.city ||
                geoData.locality ||
                geoData.principalSubdivision ||
                "Unknown",
            );

            // Weather API
            // const weatherRes = await fetch(
            //   `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=YOUR_OPENWEATHER_API_KEY`,
            // );

            // const weatherData = await weatherRes.json();

            // setWeather({
            //   temp: Math.round(weatherData.main.temp),
            //   condition: weatherData.weather[0].main,
            //   icon: weatherData.weather[0].icon,
            // });
          } catch (err) {
            console.error(err);
          }
        },
        (error) => {
          console.error(error);
        },
      );
    }

    return () => clearInterval(interval);
  }, []);
  // 🇨🇭 Switzerland Date
  const formattedDate = time.toLocaleDateString("en-CH", {
    timeZone: "Europe/Zurich",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = time.toLocaleTimeString("en-CH", {
    timeZone: "Europe/Zurich",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const handleSearchSubmit = () => {
    if (search.trim()) {
      onSearch?.(search);
      setShowSearch(false);
    }
  };

  const handleSearchClear = () => {
    setSearch("");
    onSearch?.("");
    setShowSearch(false);
  };

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between gap-3 mb-3">
            {/* Logo */}
            <img
              src="/news-page/thaalam.png"
              alt="logo"
              className="w-16 h-auto shrink-0"
            />

            {/* Right Actions */}
            <div className="flex items-center gap-2 flex-1 justify-end">
              {!showSearch ? (
                <>
                  {/* Search */}
                  <button
                    onClick={() => setShowSearch(true)}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition"
                  >
                    <Search className="w-4 h-4 text-gray-700" />
                  </button>

                  {/* Language */}
                  <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition">
                    <Languages className="w-4 h-4 text-gray-700" />
                  </button>

                  {/* Login */}
                  <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition">
                    <User className="w-4 h-4 text-gray-700" />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearchSubmit();
                        }
                      }}
                      placeholder="Search news..."
                      autoFocus
                      className="w-full h-10 rounded-full border border-red-200 bg-red-50/40 pl-10 pr-4 text-[13px] outline-none focus:border-red-500 transition"
                    />

                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <button
                    onClick={handleSearchClear}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition shrink-0"
                  >
                    <X className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-center justify-between">
            <div className="text-left">
              <div className="text-xs text-gray-600">{formattedDate}</div>
              <div className="text-sm font-medium text-gray-800">
                {formattedTime} CET
              </div>
            </div>
            <p className="text-gray-700 font-medium">{location}</p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-3 items-center gap-4">
          {/* Left */}
          <div className="flex items-start  gap-2 text-sm text-gray-600 text-left">
            <div className="font-medium text-gray-700 border-r-2  pr-2">
              <p>{formattedDate}</p>
              <p>{formattedTime}</p>
            </div>
            <p className="text-gray-700 font-medium">{location}</p>
            {/* 
            {weather && (
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-1 text-[12px] text-gray-700">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>{location}</span>
                </div>

                <div className="w-1 h-1 rounded-full bg-gray-300" />

                <div className="flex items-center gap-1 text-[12px] font-medium text-gray-800">
                  <CloudSun className="w-3.5 h-3.5 text-orange-500" />
                  <span>{weather.temp}°C</span>
                  <span className="text-gray-500 font-normal">
                    {weather.condition}
                  </span>
                </div>
              </div>
            )} */}
          </div>

          {/* Center */}
          <div className="flex justify-center">
            <img
              src="/news-page/thaalam.png"
              alt="logo"
              className="w-24 h-auto"
            />
          </div>

          {/* Right */}
          <div className="flex items-center justify-end gap-3">
            {!showSearch ? (
              <>
                <button
                  onClick={() => setShowSearch(true)}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition"
                >
                  <Search className="w-4 h-4 text-gray-700" />
                </button>

                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition">
                  <Languages className="w-4 h-4 text-gray-700" />
                </button>

                <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition">
                  <User className="w-4 h-4 text-gray-700" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 w-full max-w-[320px]">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchSubmit();
                      }
                    }}
                    placeholder="Search news..."
                    autoFocus
                    className="w-full h-11 rounded-full border border-red-200 bg-red-50/40 pl-11 pr-4 text-[13px] outline-none focus:border-red-500 transition"
                  />

                  <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                <button
                  onClick={handleSearchClear}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition shrink-0"
                >
                  <X className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

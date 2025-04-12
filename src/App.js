import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CountryDetails from './components/CountryDetails';
import CountrySearch from './components/CountrySearch';
import Footer from './components/Footer';
import Header from './components/Header';
import './index.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [populationSize, setPopulationSize] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch countries:', err);
        setLoading(false);
      });
  }, []);

  const filterByPopulation = (country) => {
    if (!populationSize) return true;
    if (populationSize === 'small') return country.population < 1000000;
    if (populationSize === 'medium') return country.population >= 1000000 && country.population <= 50000000;
    if (populationSize === 'large') return country.population > 50000000;
    return true;
  };

  const filteredCountries = countries.filter((country) => {
    return (
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRegion ? country.region === selectedRegion : true) &&
      filterByPopulation(country)
    );
  });

  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        {/* Live Animated Gradient Background */}
        <div className="absolute inset-0 z-0 live-gradient-bg"></div>

        {/* Foreground Content */}
        <div className="relative z-10 text-gray-800 p-4">
          <Header />

          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold mb-4">Country Explorer</h1>

            <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded w-full md:w-1/3 text-black"
              />

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="p-2 border rounded text-black"
              >
                <option value="">All Regions</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </select>

              <select
                value={populationSize}
                onChange={(e) => setPopulationSize(e.target.value)}
                className="p-2 border rounded text-black"
              >
                <option value="">All Sizes</option>
                <option value="small">Less than 1M</option>
                <option value="medium">1M – 50M</option>
                <option value="large">More than 50M</option>
              </select>
            </div>

            <Link
              to="/search"
              className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Search Country Info
            </Link>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {loading ? (
                    <p>Loading...</p>
                  ) : filteredCountries.length ? (
                    filteredCountries.map((country) => (
                      <div
                        key={country.alpha3Code}
                        className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
                      >
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-blue-900">{country.name}</h3>
                          <p className="text-sm text-gray-600">Region: {country.region}</p>
                          <p className="text-sm text-gray-600">Capital: {country.capital}</p>
                          <p className="text-sm text-gray-600">Population: {country.population.toLocaleString()}</p>
                          <Link
                            to={`/country/${country.alpha3Code}`}
                            className="mt-2 inline-block text-blue-700 hover:underline"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No countries found.</p>
                  )}
                </div>
              }
            />
            <Route path="/country/:code" element={<CountryDetails countries={countries} />} />
            <Route path="/search" element={<CountrySearch />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;

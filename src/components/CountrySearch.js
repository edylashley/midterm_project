import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CountrySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    setFiltered(
      countries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, countries]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-xl text-black">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Search Country Information</h2>
          <Link
            to="/"
            className="text-sm text-blue-600 hover:underline border px-3 py-1 rounded"
          >
            ⬅ Back
          </Link>
        </div>

        <input
          type="text"
          placeholder="Type country name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
        />

        {filtered.length ? (
          <ul className="space-y-4">
            {filtered.map((country) => (
              <li key={country.alpha3Code} className="p-4 border rounded-lg shadow-sm bg-gray-50 text-black">
                <div className="flex items-center gap-4">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-12 h-8 object-cover border"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-black">{country.name}</h3>
                    <p className="text-sm text-gray-700">Capital: {country.capital}</p>
                    <p className="text-sm text-gray-700">Region: {country.region}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No countries found.</p>
        )}
      </div>
    </div>
  );
};

export default CountrySearch;

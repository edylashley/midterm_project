import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CountryDetails = ({ countries }) => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const found = countries.find((c) => c.alpha3Code === code);
    setCountry(found);
  }, [code, countries]);

  if (!country) return <div className="text-center mt-10 text-white">Loading...</div>;

  const {
    name,
    flag,
    capital,
    region,
    subregion,
    population,
    area,
    latlng,
    timezones,
    currencies,
    languages,
    borders = [],
  } = country;

  const getBorderName = (code) =>
    countries.find((c) => c.alpha3Code === code)?.name || code;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-[#0c1a2b] text-white">
      <div className="bg-[#1a2a40] w-full max-w-4xl p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <img src={flag} alt={`Flag of ${name}`} className="mx-auto w-64 h-auto rounded mb-4 shadow-md" />
          <h2 className="text-4xl font-bold mb-6">{name}</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <p><strong>Capital:</strong> {capital || 'N/A'}</p>
          <p><strong>Region:</strong> {region} / {subregion}</p>
          <p><strong>Population:</strong> {population?.toLocaleString()}</p>
          <p><strong>Area:</strong> {area?.toLocaleString()} km²</p>
          <p><strong>Coordinates:</strong> {latlng?.join(', ') || 'N/A'}</p>
          <p><strong>Timezones:</strong> {timezones?.join(', ') || 'N/A'}</p>
          <p><strong>Currency:</strong> {currencies?.map(c => `${c.name} (${c.code})`).join(', ') || 'N/A'}</p>
          <p><strong>Languages:</strong> {languages?.map(l => l.name).join(', ') || 'N/A'}</p>
        </div>

        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-3">Border Countries:</h4>
          {borders.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {borders.map((borderCode, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition"
                  onClick={() => navigate(`/country/${borderCode}`)}
                >
                  {getBorderName(borderCode)}
                </button>
              ))}
            </div>
          ) : (
            <p>No bordering countries.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;

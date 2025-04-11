import { useEffect, useState } from 'react';
import { fetchCountries } from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(search.toLowerCase()) &&
    (!region || c.region === region)
  );

  return (
    <div className="home">
      <input
        type="text"
        placeholder="Search country..."
        onChange={e => setSearch(e.target.value)}
      />
      <select onChange={e => setRegion(e.target.value)}>
        <option value="">All Regions</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        {/* Add more regions */}
      </select>

      <ul>
        {filtered.map(c => (
          <li key={c.cca3}>
            <Link to={`/country/${c.name.common}`}>{c.name.common}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
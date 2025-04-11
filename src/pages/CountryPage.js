import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCountryByName } from '../services/api';
import CountryDetails from '../components/CountryDetails';

const CountryPage = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetchCountryByName(name).then(data => setCountry(data[0]));
  }, [name]);

  return (
    <div>
      {country ? <CountryDetails country={country} /> : <p>Loading...</p>}
    </div>
  );
};

export default CountryPage;
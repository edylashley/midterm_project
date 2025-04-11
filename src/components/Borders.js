import { useNavigate } from 'react-router-dom';

const Borders = ({ borders }) => {
  const navigate = useNavigate();  // Hook to navigate between routes

  const handleClick = (code) => {
    navigate(`/country/${code}`);  // Navigate to the new country details page using the border country code
  };

  return (
    <div className="borders">
      <h4>Border Countries:</h4>
      {borders?.length ? (
        <ul>
          {borders.map((border, i) => (
            <li key={i}>
              <button
                onClick={() => handleClick(border)}  // Trigger navigation when clicked
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {border}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No borders</p>
      )}
    </div>
  );
};

export default Borders;

import { useState, useEffect } from 'react';

const url = 'https://course-api.com/react-tours-project';
import Tours from './components/Tours';
import Loader from './components/Loading';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setIsLoading(false);
      setTours(tours);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };
  if (isLoading) return <Loader />;

  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>No tours left</h2>
          <button className='btn' onClick={fetchTours} removeTour={removeTour}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <div>
      <Tours tours={tours} removeTour={removeTour} />
    </div>
  );
};
export default App;

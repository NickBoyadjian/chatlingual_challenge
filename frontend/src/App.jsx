import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import 'bulma/css/bulma.min.css';
import Directory from './components/directory';

function App() {
  const [data, setData] = useState({});

  const fetchData = () => {
    axios.get('http://localhost:8000').then((result) => {
      setData(result.data);
    });
  }
  const createFile = (path) => {
    axios.post('http://localhost:8000/create', {
      path
    }).then(() => {
      fetchData(); // Ideally this should update the current cached data instead of re-fetching
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App container">
      <Directory directory={data} createFile={createFile} />
    </div>
  )
}

export default App;

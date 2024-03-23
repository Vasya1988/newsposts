
import { useEffect, useState } from 'react';
import './App.sass';
import Framepost from './components/Framepost/Framepost'

function App() {

  const [posts, setPosts] = useState([])
  const [pageCounter, setPageCounter] = useState(2)
  const responseApi = (page=1) => {
  
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)
      .then(response => response.json())
      .then(res => setPosts([...posts, ...res]))
  }

  useEffect(()=>{
    responseApi()
  }, [])
  
  console.log('--> ', posts)
  return (
    <div className="App">

      <Framepost posts={posts} />
      <button 
        onClick={()=> {
          setPageCounter(pageCounter + 1)
          console.log(pageCounter)
          responseApi(pageCounter)
        }}
      >
        Загрузить еще
      </button>
    </div>
  );
}

export default App;

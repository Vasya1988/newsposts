
import { useEffect, useState } from 'react';
import './App.sass';
import Framepost from './components/Framepost/Framepost'

function App() {

  const [posts, setPosts] = useState([])
  const [pageCounter, setPageCounter] = useState(1)
  const responseApi = (page=1) => {
  
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)
      .then(response => response.json())
      .then(res => setPosts([...posts, ...res]))
      // .then(res => setPosts(res))
  }

  const newsUpdate = (scrollChange) => {
    // Common page height
    const height = scrollChange.target.documentElement.scrollHeight

    // Current scroll position
    const scrollCurrent = scrollChange.target.documentElement.scrollTop

    // Visible of page height
    const visiblePageHeight = window.innerHeight

    if (pageCounter < 5) {
      if (scrollCurrent + visiblePageHeight === height) {
        setPageCounter(pageCounter + 1)
      }
    }

    
  }

  useEffect(() => {
    console.log(pageCounter)
    console.log(posts)
    responseApi(pageCounter)
    window.addEventListener('scroll', newsUpdate)

    return () => {
      window.removeEventListener('scroll', newsUpdate)
    }
  }, [pageCounter])

  return (
    <div className="App">

      <Framepost posts={posts} />
      {
        pageCounter >= 5 
          ? <button
            onClick={() => {
              setPageCounter(pageCounter + 1)
              console.log(pageCounter)
            }}
          >
            Загрузить еще
          </button>
          : false
      }
      
    </div>
  );
}

export default App;

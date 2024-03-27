
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
  }

  useEffect(()=>{
    responseApi()
  }, [])

  useEffect(() => {
    const newsUpdate = (scrollChange) => {
      // Common page height
      const height = scrollChange.target.documentElement.scrollHeight

      // Current scroll position
      const scrollCurrent = scrollChange.target.documentElement.scrollTop

      // Visible of page height
      const visiblePageHeight = window.innerHeight
      
      scrollCurrent + visiblePageHeight === height && pageCounter <= 5
        ? setPageCounter(pageCounter + 1)
        : console.log('Not')
    }

    window.addEventListener('scroll', (e) => newsUpdate(e))

    return () => document.removeEventListener('scroll', newsUpdate)
  }, [pageCounter])
  
  useEffect(() => {
    responseApi(pageCounter)
  }, [pageCounter])

  console.log(posts)
  console.log(pageCounter)
  return (
    <div className="App">

      <Framepost posts={posts} />
      {
        pageCounter >= 6 
          ? <button
            onClick={() => {
              setPageCounter(pageCounter + 1)
              console.log(pageCounter)
              // responseApi(pageCounter)
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

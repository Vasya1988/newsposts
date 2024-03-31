
import { useEffect, useState } from 'react';
import './App.sass';
import Framepost from './components/Framepost/Framepost'

function App() {

  // Массив в который добавляются новости
  const [posts, setPosts] = useState([])

  // Счетчик подгружаемых новостей
  const [pageCounter, setPageCounter] = useState(1)

  // Функция запрос API
  const responseApi = (page=1) => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)
      .then(response => response.json())
      .then(res => setPosts([...posts, ...res]))
      // .then(res => setPosts(res))
  }

  // Функция отслеживания положение скролла
  const scrollPosition = (scroll) => {
    
    const height = scroll.target.documentElement.scrollHeight

    const scrollCurrent = scroll.target.documentElement.scrollTop

    const visiblePageHeight = window.innerHeight

    // Остановка добавления новостей по скроллу, после 5 подгрузок
    if (pageCounter < 5) {
      if (scrollCurrent + visiblePageHeight === height) {
        setPageCounter(pageCounter + 1)
      }
    }
  }

  useEffect(() => {
    // Запрос новостей к api
    responseApi(pageCounter)

    // Добавление события сролл
    window.addEventListener('scroll', scrollPosition)

    return () => {
      window.removeEventListener('scroll', scrollPosition)
    }
  }, [pageCounter]) // Запускаем useEffect каждый раз после обновления pageCounter

  return (
    <div className="App">

      <Framepost posts={posts} />
      {
        // Добавляем кнопку на страницу
        pageCounter >= 5 
          ? <button onClick={() => {
                setPageCounter(pageCounter + 1)}}
            >
              Загрузить еще
            </button>
          : false
      }
    </div>
  );
}

export default App;

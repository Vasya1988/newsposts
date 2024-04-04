
import { useEffect, useState, useCallback } from 'react';
import './App.sass';
import Framepost from './components/Framepost/Framepost';
import { Route, Routes, useParams } from 'react-router-dom';
import {InnerPost} from './components/InnerPost/InnerPost';

function App() {

  // Массив с подгружаемыми новостями
  const [posts, setPosts] = useState([])

  // Счетчик для событий скролла
  const [pageCounter, setPageCounter] = useState(1)

  // Состояние загрузки новых новостей с API
  const [check, setCheck] = useState(false)

  // Обращаемся к API  сновостями, добавляем их в массив posts
  const responseApi = useCallback((page=1) => {

    // Ставим состояние загрузки в true
    setCheck(true)
    
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)
      .then(response => response.json())
      .then(res => {
        setPosts(prev => [...prev, ...res]);
        // Когда новости добавили в массив posts, возвращаем false
        setCheck(false)
      })
  }, [])

  // Функция для отслеживание положени скролла
  const scrollPosition = useCallback((scrollChange) => {
    
    const innerHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;
    const heightOffset = document.documentElement.offsetHeight;
    
    // Если состояние загрузки false и было меньше 5 прокруток скролла
    // обновляем счетчик pageCounter
    if (!check && pageCounter < 5 && innerHeight + scrollTop >= heightOffset - 200) {
      setPageCounter(prev => prev + 1)
    }
  }, [check])

  // Запускаем каждый раз, когда обвноляется pageCounter, 
  // для отрисовки новых новостей
  useEffect(() => {responseApi(pageCounter); console.log(posts)}, [pageCounter, responseApi])

  // Запускаем событие scroll
  useEffect(() => {
    window.addEventListener('scroll', scrollPosition)
    return () => {
      window.removeEventListener('scroll', scrollPosition)
    }
  }, [scrollPosition])

  return (
    <div className="App">
      {/* <Framepost posts={posts} /> */}
      <Routes>
        <Route path='/' element={<Framepost counter={{pageCounter: pageCounter, setPageCounter: setPageCounter}} posts={posts} />} />
        <Route path="/post/:postId" element={<InnerPost />} />
      </Routes>
    </div>
  );
}
export default App;
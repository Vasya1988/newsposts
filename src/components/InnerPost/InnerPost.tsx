import { useEffect, useState } from 'react';
import  {Link, useParams} from 'react-router-dom';
import { ButtonBack } from '../buttons/ButtonBack/ButtonBack';

const InnerPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({title: '', body: ''})

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(result => result.json())
        .then(data => setPost(data))
    }, [postId])

    return (
        <div>
            {
                post && (
                    <>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </>
                )
            }
            <Link to="/">
                <ButtonBack />
            </Link>
            
        </div>
    )
}

export { InnerPost };
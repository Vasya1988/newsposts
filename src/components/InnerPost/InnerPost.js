import { useEffect, useState } from 'react';
import  {useParams} from 'react-router-dom';

const InnerPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null)

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
        </div>
    )
}

export { InnerPost };
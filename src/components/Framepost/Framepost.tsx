import { Link } from "react-router-dom";
import Post from "../Post/Post";
import Styles from './Framepost.module.sass';
import { ButtonLoad } from "../buttons/ButtonLoad/ButtonLoad";

interface PostProps {
    posts: {id?: number, userId?: number, title?: string, body?: string}[],
    counter: {
        pageCounter: number,
        setPageCounter: (pageCounter:number) => void
    }
}
const Framepost = (props: PostProps) => {

    return (
        <>
            <div className={Styles.Framepost}>
                {
                    props.posts.map(post => {
                        return (
                            <Link to={`/post/${post.id}`} key={post.id}>
                                <Post  name={post.title} post={post.body} userId={post.userId} postId={post.id} />
                            </Link>
                        )
                    })
                }
            </div>
            {
                props.counter.pageCounter >= 5 && props.counter.pageCounter < 10 && <ButtonLoad
                    eventClick={() => {
                        props.counter.setPageCounter(props.counter.pageCounter + 1)
                        console.log(props.counter.pageCounter)
                    }}
                />
            }
        </>
    )
} 
export default Framepost
import Post from "../Post/Post";
import Styles from './Framepost.module.sass'

const Framepost = (props) => {

    return (
        <div className={Styles.Framepost}>
            {
                props.posts.map(post => <Post key={post.id} name={post.title} post={post.body} userId={post.userId} />)
            }
        </div>
    )
} 
export default Framepost
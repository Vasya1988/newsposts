import Post from "../Post/Post";
import Styles from './Framepost.module.sass'

const Framepost = (props) => {

    return (
        <div className={Styles.Framepost}>
            {
                props.posts.map(post => <Post key={post.id} name={post.title} post={post.body} />)
            }
        </div>
    )
} 
export default Framepost
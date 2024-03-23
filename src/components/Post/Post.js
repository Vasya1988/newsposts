import Styles from './Post.module.sass'

const Post = (props) => {


    return (
        <div className={Styles.Post}>
            <h2>
                {props.name}
            </h2>

            <span>{props.post}</span>
        </div>
    )
}
export default Post
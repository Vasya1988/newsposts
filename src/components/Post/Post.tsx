import Styles from './Post.module.sass'

interface PostProps {
    name?: string,
    userId?: number,
    post?: string,
    postId?: number
}
const Post = (props: PostProps ) => {

    return (
        <>
            <div className={Styles.Post}>
                <h2>
                    {`${props.userId} - ${props.name}`}
                </h2>
                <span>{props.post}</span>
            </div>
        </>
    )
}
export default Post
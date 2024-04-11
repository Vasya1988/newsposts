
interface EventProps {
    eventClick: () => void
}
const ButtonLoad = ({eventClick}: EventProps) => {


    return (
        <button onClick={eventClick}>Load more</button>
    )
}
export { ButtonLoad }

import './Rating.css';
const Rating = (props: {
    rating: number,
    numReviews?: number,
    caption?: string
}) => {
    const { rating, caption, numReviews } = props;
    return (
        <div className="rating">
            <span>
                <i className={
                    rating >= 1 ? "fa-solid fa-star" : rating >= 0.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"
                }></i>
            </span>
            <span>
            <i className={
                    rating >= 2 ? "fa-solid fa-star" : rating >= 1.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"
                }></i>
            </span>
            <span>
            <i className={
                    rating >= 3 ? "fa-solid fa-star" : rating >= 2.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"
                }></i>
            </span>
            <span>
            <i className={
                    rating >= 4 ? "fa-solid fa-star" : rating >= 3.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"
                }></i>
            </span>
            <span>
            <i className={
                    rating >= 5 ? "fa-solid fa-star" : rating >= 4.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"
                }></i>
            </span>
            
                {
                    caption ? (
                        <span>
                            {caption}
                        </span>
                    ) : numReviews != 0 ? (
                        <span>{`  ${numReviews} reviews`}</span>
                    ):(
                        <span> {`   0 review`}</span>
                    )
                }
            
        </div>
    )
}

export default Rating
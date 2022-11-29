import React from 'react'
import '../global.css'

import logo2 from '../components/logo2.png'

const NewsItem = (props) => {
        let { title, description, imgUrl, newsUrl, author, date,source } = props;
        return (
            <div>

                <div className="card mx-5 my-2" style={{ width: "20rem" }}>
                    <img placeholder={logo2} src={!imgUrl ? "https://previews.123rf.com/images/alhovik/alhovik1709/alhovik170900028/86470277-breaking-news-background-world-global-tv-news-banner-design.jpg" : imgUrl} className="card-img-top " alt="..." />
                    <div className="card-body">
                        <h5 className="card-title ">{title}... <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">{source}
                        </span></h5>
                        <p className="card-text ">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toLocaleDateString("en-GB")} at {new Date(date).toLocaleTimeString()}</small></p>
                        <a href={newsUrl} target={'_blank'} className="btn btn-sm btn-primary" rel="noreferrer">Read more</a>
                    </div>

                </div>
            </div>
        )
    }


export default NewsItem

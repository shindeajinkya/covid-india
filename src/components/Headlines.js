import React from 'react';
import { getHeadlines } from '../utils/api';
import Loading from './Loading';

class Headlines extends React.Component {
    state = {
        newsArray: [],
        loading: true,
    }

    componentDidMount() {
        getHeadlines()
        .then(res => res.json())
        .then(({ headlines, headlines_summary, image_link, source }) => {
            const newsArray = []

            headlines.forEach((head, index) => {
                newsArray[index] = {headline: head}
            });

            headlines_summary.forEach((summary, index) => {
                newsArray[index].summary = summary
            })

            image_link.forEach((image, index) => {
                newsArray[index].image = image
            })
            
            this.setState({ newsArray, loading: false })
        })
        .catch(err => console.log(err))
    }

    render() {
        const { newsArray, loading } = this.state
        if(!loading){
            return (
                <div>
                    <ul className="news-list">
                        {
                            newsArray.map(({headline, summary, image}) => {
                                return (
                                    <li className="news-card">
                                        <img src={`${image}`} alt="News" />
                                        <h4>{headline}</h4>
                                        <p>{summary}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        }
        return (
            <Loading />
        )
        
    }
}

export default Headlines;
import React,{useState,useEffect} from 'react'
import '../global.css'
import NewsItem from './NewsItem'
import { PulseLoader } from 'react-spinners'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'




const News = (props) =>{
    const [articles,setArticles] = useState([])
    const [page,setPage] = useState(1)
    const [loading,setLoading] = useState(true)
    const [totalResults,setTotalResults] = useState(0)
    // const [progress,setProgress] = useState(0)


   
    // articles = [
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "WTVD-TV"
    //         },
    //         "author": null,
    //         "title": "Raleigh Christmas Parade young performer dies after being hit by out-of-control truck; driver charged | Deadly parade accident - WTVD-TV",
    //         "description": "\"We are devastated. Our dance family is a close-knit group and today our hearts are broken.\"",
    //         "url": "https://abc11.com/raleigh-christmas-parade-person-hit-injuries-what-happened-to-the/12471816/",
    //         "urlToImage": "https://cdn.abcotvs.com/dip/images/12473619_111922-wtvd-raleigh-parade-crash-update-cindy-11p-vid.jpg?w=1600",
    //         "publishedAt": "2022-11-20T14:37:34Z",
    //         "content": "RALEIGH, N.C. (WTVD) -- Raleigh police officers confirm the girl accidentally hit by a truck towing a float during the Raleigh Christmas Parade has died.\r\nPolice said the accident happened around 10:… [+2756 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "reuters",
    //             "name": "Reuters"
    //         },
    //         "author": null,
    //         "title": "Ukraine nuclear plant shelled, U.N. warns: 'You're playing with fire!' - Reuters",
    //         "description": "Ukraine's Zaporizhzhia nuclear power plant, which is under Russian control, was rocked by shelling on Sunday, drawing condemnation from the U.N. nuclear watchdog which said such attacks risked a major nuclear disaster.",
    //         "url": "https://www.reuters.com/world/europe/russia-says-ukraine-shells-zaporizhzhia-nuclear-power-plant-tass-2022-11-20/",
    //         "urlToImage": "https://www.reuters.com/resizer/r3xhEYAcda7pioOKNrBJPTkZ6SE=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/L23PFNXPSNOKTOO5L3FLFN6GZ4.jpg",
    //         "publishedAt": "2022-11-20T14:34:00Z",
    //         "content": "LONDON, Nov 20 (Reuters) - Ukraine's Zaporizhzhia nuclear power plant, which is under Russian control, was rocked by shelling on Sunday, drawing condemnation from the U.N. nuclear watchdog which said… [+2968 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "the-washington-post",
    //             "name": "The Washington Post"
    //         },
    //         "author": "Sarah Kaplan, Timothy Puko, Evan Halper",
    //         "title": "COP27 deal does little to avert future climate change disasters - The Washington Post",
    //         "description": "The final decision of the U.N. Climate Conference in Egypt made little progress on emissions-cutting measures that could avert worse disasters to come.",
    //         "url": "https://www.washingtonpost.com/climate-environment/2022/11/20/cop27-climate-conference-deal-fund/",
    //         "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/I3IJMCUUJQB43MYAJABOEQOKOE.JPG&w=1440",
    //         "publishedAt": "2022-11-20T14:28:12Z",
    //         "content": "Comment on this story\r\nSHARM EL-SHEIKH, Egypt The final decision of the U.N. Climate Conference on Sunday yielded a breakthrough in addressing the hazards already ravaging the planet but made little … [+6460 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "cnn",
    //             "name": "CNN"
    //         },
    //         "author": "Ivana Kottasová, Ella Nilsen, Rachel Ramirez",
    //         "title": "COP27 summit agrees to help climate victims. But it does nothing to stop fossil fuels - CNN",
    //         "description": "Negotiators at the UN's COP27 climate summit have reached a tentative agreement to establish a loss and damage fund for nations vulnerable to climate disasters, according to officials and observers.",
    //         "url": "https://www.cnn.com/2022/11/19/world/cop27-egypt-agreement-climate-intl/index.html",
    //         "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/221120064646-02-paktistan-flooding-file-0830.jpg?c=16x9&q=w_800,c_fill",
    //         "publishedAt": "2022-11-20T12:43:00Z",
    //         "content": "Sharm el-Sheikh, EgyptCNN\r\n  — \r\nThe world has failed to reach an agreement to phase out fossil fuels after marathon UN climate talks were stonewalled by a number of oil-producingnations.\r\nNegotiator… [+9223 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "the-washington-post",
    //             "name": "The Washington Post"
    //         },
    //         "author": "Marlene Cimons",
    //         "title": "How to cope with Dupuytren's, a crippling hand condition - The Washington Post",
    //         "description": "Often, people with this condition mistakenly assume they have arthritis or tendinitis, or don’t notice a problem until their fingers start to bend.",
    //         "url": "https://www.washingtonpost.com/wellness/2022/11/20/dupuytrens-crippling-hand-disease-treatments/",
    //         "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/O7QF523D2MOZRZRJC7VMAVIT7M.jpg&w=1440",
    //         "publishedAt": "2022-11-20T12:33:13Z",
    //         "content": "Comment on this story\r\nFifteen years ago, Jack Schultz first noticed several of his fingers curling inward toward his palm. Schultz, 75, of Columbia Station, Ohio, a retired manager of a plastics com… [+6246 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "cnn",
    //             "name": "CNN"
    //         },
    //         "author": "Andy Rose",
    //         "title": "At least 5 people killed, 18 injured in a shooting at a gay nightclub in Colorado Springs - CNN",
    //         "description": "At least five people were killed and 18 others injured in a mass shooting at a gay nightclub on Saturday in Colorado Springs, Colorado, according to police.",
    //         "url": "https://www.cnn.com/2022/11/20/us/colorado-springs-shooting-gay-nightclub/index.html",
    //         "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/221120054151-01-colorado-springs-shooting-112022.jpg?c=16x9&q=w_800,c_fill",
    //         "publishedAt": "2022-11-20T12:13:00Z",
    //         "content": "At least five people were killed and 18 others injured in a mass shooting at a gay nightclub on Saturday in Colorado Springs, Colorado, according to police.\r\nAuthorities received numerous 911 calls s… [+1122 chars]"
    //     },

    //     {
    //         "source": {
    //             "id": null,
    //             "name": "WABC-TV"
    //         },
    //         "author": null,
    //         "title": "Man linked to antisemitic threats to NYC Jewish community set to be arraigned; friend released on bail - WABC-TV",
    //         "description": "The two men who police say are linked to recent antisemitic behavior are set to appear in front of a judge on Sunday. The two face multiple charges.",
    //         "url": "https://abc7ny.com/antisemitism-threat-nyc-hate-crime/12474432/",
    //         "urlToImage": "https://cdn.abcotvs.com/dip/images/12474481_112022-wabc-threats-jewish-img.jpg?w=1600",
    //         "publishedAt": "2022-11-20T11:58:24Z",
    //         "content": "MIDTOWN, Manhattan (WABC) -- The man accused of making online threats toward the local Jewish community is set to face a judge on Sunday.\r\nPolice arrested Christopher Brown on Saturday at Penn Statio… [+1772 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "NDTV News"
    //         },
    //         "author": null,
    //         "title": "Elon Musk Considers More Layoffs In Twitter, Weeks After Firing 50% Staff - NDTV",
    //         "description": "Elon Musk, Twitter's new owner, is considering laying off more employees, just weeks after he laid off half the company's workforce, reports Bloomberg.",
    //         "url": "https://www.ndtv.com/world-news/elon-musk-may-fire-more-after-twitter-employees-next-week-days-after-1200-resign-report-3537649",
    //         "urlToImage": "https://c.ndtvimg.com/2022-11/n0l7tn1s_elon-musk_625x300_02_November_22.jpg",
    //         "publishedAt": "2022-11-20T11:48:24Z",
    //         "content": "Elon Musk had fired half of Twitter's workforce days after taking over the company.\r\nNew Delhi: Elon Musk, Twitter's new owner, is considering laying off more employees, just weeks after he laid off … [+1507 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "fox-news",
    //             "name": "Fox News"
    //         },
    //         "author": "Ryan Gaydos",
    //         "title": "NFL Week 11 preview: Chiefs look to separate from AFC West rivals, New York teams look to take control - Fox News",
    //         "description": "Week 11 of the NFL season will mean more to a handful of teams vying for playoff spots with only a few games left. Here's what is cooking in the NFL on Sunday",
    //         "url": "https://www.foxnews.com/sports/nfl-week-11-preview-chiefs-look-separate-afc-west-rivals-new-york-teams-look-take-control",
    //         "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2022/11/Patrick-Mahomes7.jpg",
    //         "publishedAt": "2022-11-20T11:00:50Z",
    //         "content": "Week 11 of the 2022 NFL season features a massive slate of games for many teams looking to stay in contention for the NFL playoffs, and things are as tight as ever.\r\nAfter the Tennessee Titans defeat… [+5367 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "cnn",
    //             "name": "CNN"
    //         },
    //         "author": "Maegan Vazquez",
    //         "title": "Joe Biden celebrates his 80th birthday - CNN",
    //         "description": "President Joe Biden turns 80 years old on Sunday, becoming the first octogenarian to ever serve in the highest office of the United States.",
    //         "url": "https://www.cnn.com/2022/11/20/politics/joe-biden-80th-birthday/index.html",
    //         "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/220921140116-01-biden-092022.jpg?c=16x9&q=w_800,c_fill",
    //         "publishedAt": "2022-11-20T11:00:00Z",
    //         "content": "President Joe Biden turns 80 years old on Sunday, becoming the first octogenarian to ever serve in the highest office of the United States. \r\nThe unique milestone of Bidens birthday comes as the pres… [+2740 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "SciTechDaily"
    //         },
    //         "author": null,
    //         "title": "New Map of the Universe Displays Span of Entire Cosmos With Pinpoint Accuracy and Sweeping Beauty - SciTechDaily",
    //         "description": "The map charts a broad expanse of the universe, from the Milky Way to 'the edge of what can be seen.' A new map of the universe displays the span of the entire known cosmos for the first time with pinpoint accuracy and sweeping beauty. Compiled from data mine…",
    //         "url": "https://scitechdaily.com/new-map-of-the-universe-displays-span-of-entire-cosmos-with-pinpoint-accuracy-and-sweeping-beauty/",
    //         "urlToImage": "https://scitechdaily.com/images/New-Interactive-Map-Offers-Scroll-Through-Universe-scaled.jpg",
    //         "publishedAt": "2022-11-20T10:23:28Z",
    //         "content": "ByJohns Hopkins UniversityNovember 20, 2022\r\nBrice Ménard (left) and Nikita Shtarkman examine the map of the observable universe. Credit: Will Kirk / Johns Hopkins University\r\nThe map charts a broad … [+3433 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "independent",
    //             "name": "Independent"
    //         },
    //         "author": "Miguel Delaney",
    //         "title": "Everything wrong with the Qatar World Cup - The Independent",
    //         "description": "From the deaths of migrant workers and discriminative LGBTQ laws to exploitation and corruption, Miguel Delaney reports on the true cost of the World Cup",
    //         "url": "https://www.independent.co.uk/sport/football/world-cup/qatar-world-cup-deaths-bribery-b2228984.html",
    //         "urlToImage": "https://static.independent.co.uk/2022/08/11/17/Qatar%20100%20days%20sport%20comp%202.jpg?quality=75&width=1200&auto=webp",
    //         "publishedAt": "2022-11-20T10:23:11Z",
    //         "content": "Sign up to Miguel Delaneys Reading the Game newsletter sent straight to your inbox for free\r\nSign up to Miguels Delaneys free weekly newsletter \r\nOut of the many facts and figures circulated about Qa… [+33889 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "usa-today",
    //             "name": "USA Today"
    //         },
    //         "author": "Bryan Alexander, USA TODAY",
    //         "title": "Michael J. Fox vows 'no surrender' over Parkinson's disease; Cher gives Diane Warren first Oscar - USA TODAY",
    //         "description": "Michael J. Fox, directors Peter Weir and Euzhan Palcy, take honors at Governors Awards. Songwriter Diane Warren earns first Oscar after 13 nominations.",
    //         "url": "https://www.usatoday.com/story/entertainment/movies/2022/11/20/michael-j-fox-diane-warren-governors-awards-oscars/10743859002/",
    //         "urlToImage": "https://www.gannett-cdn.com/presto/2022/11/20/USAT/5e65958e-8843-41c9-9b06-88210028d6c0-GTY_1442888450_1.jpg?auto=webp&crop=2276,1281,x0,y131&format=pjpg&width=1200",
    //         "publishedAt": "2022-11-20T09:56:57Z",
    //         "content": "LOS ANGELES —  Michael J. Fox was praised for his work seeking a Parkinson's disease cure and Cher presented songwriter Diane Warren with a long overdue Oscar at the Governors Awards Saturday night.\r… [+4695 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "New York Post"
    //         },
    //         "author": "Paul Schwartz",
    //         "title": "Giants bracing for shootout vs. high-octane Lions - New York Post ",
    //         "description": "The Lions will enter MetLife Stadium to face the Giants with one of the league’s most explosive offenses and one of the league’s shoddiest defenses.",
    //         "url": "https://nypost.com/2022/11/20/giants-bracing-for-shootout-vs-high-octane-lions/",
    //         "urlToImage": "https://nypost.com/wp-content/uploads/sites/2/2022/11/newspress-collage-24724606-1668934906867.jpg?quality=75&strip=all&1668917100&w=1024",
    //         "publishedAt": "2022-11-20T09:12:00Z",
    //         "content": "The answer is: Thrice.\r\nThree times in his 47 starts at quarterback for the Giants Daniel Jones. That is how infrequently he has stepped foot on the field and engaged in what can realistically be con… [+3763 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "YouTube"
    //         },
    //         "author": null,
    //         "title": "Aaron Carter's Dog Zelda Rehomed, Living with Fiancée's Sister | TMZ - TMZ",
    //         "description": "Aaron Carter's dog has made it safe and sound to a new home ... and we're told she's staying somewhat within the fam -- going to a relative of his fiancée.SU...",
    //         "url": "https://www.youtube.com/watch?v=RHPhxhMep9g",
    //         "urlToImage": "https://i.ytimg.com/vi/RHPhxhMep9g/maxresdefault.jpg",
    //         "publishedAt": "2022-11-20T09:00:23Z",
    //         "content": null
    //     },
    //     {
    //         "source": {
    //             "id": "reuters",
    //             "name": "Reuters"
    //         },
    //         "author": null,
    //         "title": "Trump snubs Twitter after Musk announces reactivation of ex-president's account - Reuters",
    //         "description": "Donald Trump on Saturday said he had no interest in returning to Twitter even as a slim majority voted in favor of reinstating the former U.S. President, who was banned from the social media service for inciting violence, in a poll organized by new owner Elon…",
    //         "url": "https://www.reuters.com/technology/musks-twitter-poll-showing-narrow-majority-want-trump-reinstated-2022-11-20/",
    //         "urlToImage": "https://www.reuters.com/resizer/gQ1ZGgujwrJAZSSPeVk_dTRrAIk=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/U2AN5QVZZFNTJDMDXJTCYTHPP4.jpg",
    //         "publishedAt": "2022-11-20T08:27:00Z",
    //         "content": "Nov 19 (Reuters) - Donald Trump on Saturday said he had no interest in returning to Twitter even as a slim majority voted in favor of reinstating the former U.S. President, who was banned from the so… [+4106 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "YourTango"
    //         },
    //         "author": "Ruby Miranda",
    //         "title": "The 3 Zodiac Signs With Great Weekly Horoscopes For November 20 - 26, 2022 - YourTango",
    //         "description": "Libra, Scorpio, and Sagittarius are the three zodiac signs with great weekly horoscopes for November 20 - 26, 2022.",
    //         "url": "https://www.yourtango.com/2022355826/zodiac-signs-great-weekly-horoscopes-november-20-26-2022",
    //         "urlToImage": "https://www.yourtango.com/sites/default/files/styles/listing_big/public/image_blog/zodiac-signs-great-weekly-horoscopes-november-20-26-2022.png?itok=cGJ6Wj03",
    //         "publishedAt": "2022-11-20T08:05:08Z",
    //         "content": "There's a refreshing hint of change that happens this week and we're all about to pick up on it, and that of course, refers to the transiting of Scorpio sun to Sagittarius Sun...and it's major.\r\nWhet… [+4596 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "CBS Sports"
    //         },
    //         "author": "",
    //         "title": "Tomorrow's Top 25 Today: USC, Clemson playoff profiles improve amid jumps in college football rankings - CBS Sports",
    //         "description": "Projecting the new AP Top 25 college football rankings after Week 12 of the 2022 season",
    //         "url": "https://www.cbssports.com/college-football/news/tomorrows-top-25-today-usc-clemson-playoff-profiles-improve-amid-jumps-in-college-football-rankings/",
    //         "urlToImage": "https://sportshub.cbsistatic.com/i/r/2022/11/20/ae1fffe0-07a7-43ed-bac4-aa15738b9a83/thumbnail/1200x675/83936f6d72e3299f13d6d999e34fd61e/graphic-tt25tusc12.png",
    //         "publishedAt": "2022-11-20T05:12:49Z",
    //         "content": "The razor-thin margin for error in college football was on display throughout the scores and results from Week 12. It was a week where the scoreboard showed a couple upsets for top 25 teams, but we w… [+9645 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "ESPN"
    //         },
    //         "author": "Paolo Uggetti",
    //         "title": "USC outlasts UCLA in thriller, headed for Pac-12 title game - ESPN",
    //         "description": "One year after a blowout loss to UCLA, USC outlasted its rival in a 48-45 thriller that punched the Trojans' ticket to the Pac-12 championship in Year 1 of the Lincoln Riley era.",
    //         "url": "https://www.espn.com/college-football/story/_/id/35064946/usc-outlasts-ucla-thriller-headed-pac-12-title-game",
    //         "urlToImage": "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F1120%2Fr1093576_1296x729_16%2D9.jpg",
    //         "publishedAt": "2022-11-20T05:04:17Z",
    //         "content": "PASADENA, Calif. -- All season long, USC coach Lincoln Riley has made it a point -- after a win, a loss, a practice -- to mention where the team was just a year ago as compared with where it is now.\r… [+5207 chars]"
    //     }
    // ]
    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
        //  document.title = `${this.capitalize(category)} - News Monkey`;
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         articles: this.articles,
    //         page: 1,
    //         loading: true,
    //     }
    
    const updateNews = async() =>{
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=563a8899cbea4533b5f6eac166918786&pageSize=${props.pageSize}`
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        // setLoading(false)
        let parsedData = await data.json()
        // props.setProgress(60);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
        
    };
    
    const fetchData = async() => {
        updateNews()
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=563a8899cbea4533b5f6eac166918786&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1)
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults);
        
    }

    useEffect(() => {
        
        updateNews()
    },[])

    
        // let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f84dcff067b948bca46fa26ac3ba8619&pageSize=${pageSize}`
        // let data = await fetch(url);
        // this.setState({loading:true})
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({ articles: parsedData.articles ,
        //     totalResults:parsedData.totalResults,
        //     loading:false
        // })
     

    // handlePrevclick = async() =>{
    //     let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f84dcff067b948bca46fa26ac3ba8619&page=${this.state.page - 1}&pageSize=${pageSize}`
    //     let data = await fetch(url);
    //     this.setState({loading:true})
    //     let parsedData = await data.json()
    //     console.log(parsedData);
    //     this.setState({ 
    //         page:this.state.page-1 ,
    //         articles: parsedData.articles,
    //         loading:false
    //     })
    // this.setState({page:this.state.page-1});
    // this.updateNews();
    // }
    // handleNextClick = async() =>{
    //     if(this.state.page > Math.ceil(this.state.totalResults/21)){

    //     }
    //     else{
    //     let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=f84dcff067b948bca46fa26ac3ba8619&page=${this.state.page + 1}&pageSize=${pageSize}`
    //     let data = await fetch(url);
    //     this.setState({loading:true})
    //     let parsedData = await data.json()
    //     this.setState({ 
    //         page:this.state.page+1 ,
    //         articles: parsedData.articles,
    //         loading:false
    //     })
    // }
    //     // this.setState({page:this.state.page+1});
    //     // this.updateNews();
    // }

        return (
              <>
                <h1 className='title' style={{marginTop:'182px'}}> Top Headlines - {capitalize(props.category)}</h1>
                <div className='text-center'>
                    {loading && <PulseLoader color={'blue'} size={10} />}
                    <InfiniteScroll
                        dataLength={articles.length} //This is important field to render the next data
                        next={fetchData}
                        hasMore={articles.length!== totalResults}
                        loader={<PulseLoader color={'blue'} size = {12}/>}
                        >
                        <div className="container">
                        <div className='row' >
                            {articles.map((element) => {
                                return <div className='col-md-4 my-3' key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 92) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}

                            {/* < className="container d-flex justify-content-between">
                        <button disabled = {this.state.page<= 1} type="button" className="btn btn-primary" onClick={this.handlePrevclick}>&larr; Previous</button>
                <button disabled = {this.state.page >= this.state.totalResults/pageSize} type="button" className="btn btn-primary" onClick={this.handleNextClick}> Next &rarr;</button>*/}
                    </div>
                    </div>
                   
                </InfiniteScroll>
                </div>
            </>
            )
    
    }
        
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
} 
News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

    
  
export default News

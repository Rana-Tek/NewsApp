import { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Image from "../Images/news1.jpg";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ category }) => {
    const [articles, setArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);

    const resultNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}&apiKey=ecfaf9eaaa8d40a5b5d769210f5ee616`;
        const data = await fetch(url);
        const parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
    };

    useEffect(() => {
        resultNews();
    }, []);

    const fetchData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page + 1}&apiKey=ecfaf9eaaa8d40a5b5d769210f5ee616`;
        setPage(page + 1);
        const data = await fetch(url);
        const parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
    };

    return (
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchData}
            hasMore={articles.length < totalResults}
            loader={<h4 className="text-center">Loading...</h4>}
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="container my-3">
                <div className="row">
                    {articles.map((element) => (
                        <div className="col-md-4" key={element.url}>
                            <NewsItem
                                sourceName={element.source.name}
                                title={element.title}
                                desc={element.description}
                                imageURL={element.urlToImage ? element.urlToImage : Image}
                                newsUrl={element.url}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </InfiniteScroll>
    );
};

export default News;
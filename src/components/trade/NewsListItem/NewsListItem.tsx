import React, { useState } from "react";
import "./styles.css";
import newsImg1 from "../../../assets/imgs/news1.png";
import newsImg2 from "../../../assets/imgs/news2.png";

interface NewsItem {
  id: string;
  s3_url: string;
  cloudfront_url: string;
  title: string;
  content: string;
  reported_at: string;
  publisher: string;
  url: string;
}

interface NewsProps {
  items: NewsItem[];
  type: string;
}

const NewsListItem: React.FC<NewsProps> = ({ items, type }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const viewMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="news">
      {items.slice(0, visibleCount).map((item, index) => (
        <a
          key={index}
          href={
            type === "land"
              ? "https://www.breaknews.com/1037620"
              : "https://www.mk.co.kr/news/it/10890778"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="newsItem">
            <div className="newsText">
              <div className="newsTitle">{item.title}</div>
              <div className="newsInfo">
                {item.reported_at} · {item.publisher}
              </div>
            </div>
            <img
              src={type === "land" ? newsImg2 : newsImg1}
              alt={item.title}
              className="newsImage"
            />
          </div>
        </a>
      ))}
      {visibleCount < items.length && (
        <div className="viewMore" onClick={viewMore}>
          더 보기
        </div>
      )}
    </div>
  );
};

export default NewsListItem;

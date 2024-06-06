import React from "react";
import "./styles.css";
import newsImg1 from "../../../assets/imgs/news1.png";

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
}

const NewsListItem: React.FC<NewsProps> = ({ items }) => {
  return (
    <div className="news">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div key={index} className="newsItem">
            <div className="newsText">
              <div className="newsTitle">{item.title}</div>
              <div className="newsInfo">
                {item.reported_at} · {item.publisher}
              </div>
            </div>
            <img
              src={item.s3_url ? item.s3_url : newsImg1}
              alt={item.title}
              className="newsImage"
            />
          </div>
        </a>
      ))}
      <div className="viewMore">더 보기</div>
    </div>
  );
};

export default NewsListItem;

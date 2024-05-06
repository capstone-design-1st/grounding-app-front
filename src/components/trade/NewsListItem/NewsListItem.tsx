import React from "react";
import "./styles.css";

interface NewsItem {
  title: string;
  date: string;
  source: string;
  image: string;
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
                {item.date} · {item.source}
              </div>
            </div>
            <img src={item.image} alt={item.title} className="newsImage" />
          </div>
        </a>
      ))}
      <div className="viewMore">더 보기</div>
    </div>
  );
};

export default NewsListItem;

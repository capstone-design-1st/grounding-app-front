import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./styles.css";
import idea from "../../../assets/icons/Idea.png";

interface TimelineItemProps {
  number: string;
  title: string;
  date: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ number, title, date }) => (
  <VerticalTimelineElement
    className="vertical-timeline-element"
    contentStyle={{
      background: "#fff",
      boxShadow: "none",
      border: "none",
      fontSize: "15px",
    }}
    date={date}
    dateClassName="timeline-date"
    iconStyle={{
      background: "#fff",
      color: "var(--main)",
      fontSize: "12px",
      width: "35px",
      height: "35px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "none",
    }}
    icon={<div className="timelineItemNumber">{number}</div>}
    position="left"
  >
    <h3 className="vertical-timeline-element-title">{title}</h3>
  </VerticalTimelineElement>
);

const Timeline: React.FC = () => {
  return (
    <div className="timeline">
      <VerticalTimeline lineColor="#00bcd4" layout="1-column-left">
        <TimelineItem
          number="1"
          title="청약 시작"
          date="4월 18일 목요일 오전 9시"
        />
        <TimelineItem
          number="2"
          title="청약 마감"
          date="5월 10일 금요일 오후 10시"
        />
        <TimelineItem
          number="3"
          title="거래 시작"
          date="5월 21일 화요일 오전 9시"
        />
      </VerticalTimeline>
      <div className="timelineNote">
        <img src={idea} alt="Idea Icon" />
        <p>
          모집률 100% 달성시 조기 마감이 될 수 있습니다. 모집이 마감되면 청약 및
          청약 취소를 할 수 없습니다.
        </p>
      </div>
    </div>
  );
};

export default Timeline;

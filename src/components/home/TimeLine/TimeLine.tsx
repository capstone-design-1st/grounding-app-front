import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { formatDateToKorean } from "../../../util/formatDate";

const CustomTimeline = styled(Timeline)(({ theme }) => ({
  paddingLeft: 0,
}));

const CustomTimelineItem = styled(TimelineItem)(({ theme }) => ({
  "&:before": {
    flex: 0,
    padding: 0,
  },
}));

interface TimeLineProps {
  startDate: string;
  endDate: string;
  tradeDate: string;
}

const TimeLine: React.FC<TimeLineProps> = ({
  startDate,
  endDate,
  tradeDate,
}) => {
  return (
    <div>
      <CustomTimeline>
        <CustomTimelineItem>
          <TimelineSeparator>
            <TimelineDot
              color="primary"
              style={{
                width: "22px",
                height: "22px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid var(--main)",
                backgroundColor: "var(--white)",
                boxShadow: "none",
              }}
            >
              <Typography
                variant="caption"
                style={{ color: "#000", fontSize: "16px" }}
              >
                1
              </Typography>
            </TimelineDot>
            <TimelineConnector style={{ background: "var(--main)" }} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              component="span"
              style={{ fontSize: "18px", fontWeight: 600 }}
            >
              청약 시작
            </Typography>
            <Typography style={{ fontWeight: 300, fontSize: "15px" }}>
              {formatDateToKorean(startDate)} 오전 9시
            </Typography>
          </TimelineContent>
        </CustomTimelineItem>
        <CustomTimelineItem>
          <TimelineSeparator>
            <TimelineDot
              color="primary"
              style={{
                width: "22px",
                height: "22px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid var(--main)",
                backgroundColor: "var(--white)",
                boxShadow: "none",
              }}
            >
              <Typography
                variant="caption"
                style={{ color: "#000", fontSize: "16px" }}
              >
                2
              </Typography>
            </TimelineDot>
            <TimelineConnector style={{ background: "var(--main)" }} />
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              component="span"
              style={{ fontSize: "18px", fontWeight: 600 }}
            >
              청약 마감
            </Typography>
            <Typography style={{ fontWeight: 300, fontSize: "15px" }}>
              {formatDateToKorean(endDate)} 오후 10시
            </Typography>
          </TimelineContent>
        </CustomTimelineItem>
        <CustomTimelineItem>
          <TimelineSeparator>
            <TimelineDot
              color="primary"
              style={{
                width: "22px",
                height: "22px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid var(--main)",
                backgroundColor: "var(--white)",
                boxShadow: "none",
              }}
            >
              <Typography
                variant="caption"
                style={{ color: "#000", fontSize: "16px" }}
              >
                3
              </Typography>
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Typography
              component="span"
              style={{ fontSize: "18px", fontWeight: 600 }}
            >
              거래 시작
            </Typography>
            <Typography style={{ fontWeight: 300, fontSize: "15px" }}>
              {formatDateToKorean(tradeDate)} 오전 9시
            </Typography>
          </TimelineContent>
        </CustomTimelineItem>
      </CustomTimeline>
    </div>
  );
};

export default TimeLine;

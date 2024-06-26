import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { getEachDayTrading } from "../../../apis/Trading";
import { QueryFunctionContext, useQuery } from "react-query";
import { usePropertyStore } from "../../../store/tradeStore";

const CandleChart = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "candlestick",
      height: 200,
      toolbar: {
        show: true, // 툴바 활성화
        tools: {
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      zoom: {
        enabled: true,
        type: "x", // x축 기준으로 줌
        autoScaleYaxis: true,
      },
    },

    title: {
      text: undefined,
      align: "left",
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        format: "MM/dd",
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: (value) => `${value.toFixed(0)}원`, // 레이블 포맷 한국어로 표시
      },
      opposite: true, // y축을 오른쪽으로 이동
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#ff4560", // 상승 캔들 색상
          downward: "#008ffb", // 하락 캔들 색상
        },
      },
    },
    tooltip: {
      x: {
        format: "dd MMM HH:mm",
      },
    },
  };

  const fetchEachDayTrading = async ({
    queryKey,
  }: QueryFunctionContext<[string, string | null, number, number]>) => {
    const [, propertyId, page, size] = queryKey;
    if (!propertyId) throw new Error("Property ID is required");
    return await getEachDayTrading(propertyId, page, size);
  };

  const propertyId = usePropertyStore((state) => state.propertyId);

  const { data: eachDayTradingData } = useQuery(
    ["eachDayTrading", propertyId, 0, 100],
    fetchEachDayTrading,
    {
      enabled: !!propertyId,
      refetchInterval: 20000,
      onError: (error) =>
        console.error("Error fetching each day's trading data:", error),
    }
  );

  const transformedData =
    eachDayTradingData &&
    eachDayTradingData.content.map((item: any) => ({
      x: new Date(item.date),
      y: [
        item.opening_price,
        item.max_price,
        item.min_price,
        item.closing_price,
      ],
    }));

  return (
    <ReactApexChart
      options={chartOptions}
      series={[{ data: transformedData ?? [] }]}
      type="candlestick"
      height="230px"
    />
  );
};

export default CandleChart;

import React, { useEffect, useState, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  address: string;
}

const Map: React.FC<MapProps> = ({ address }) => {
  const [coordinates, setCoordinates] = useState(null); // 좌표를 저장할 상태
  const mapContainer = useRef<HTMLDivElement>(null); // 지도를 표시할 div에 대한 참조

  useEffect(() => {
    if (window.kakao && mapContainer.current) {
      const { kakao } = window;

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, function (result: any, status: any) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          setCoordinates(coords); // 검색된 좌표를 상태에 저장
        }
      });
    }
  }, [address]); // 주소가 변경될 때마다 이 useEffect가 실행됩니다.

  useEffect(() => {
    if (coordinates && mapContainer.current) {
      const { kakao } = window;
      const options = {
        center: coordinates,
        level: 3,
      };
      //모바일에서 지도 해상도 낮추기
      kakao.maps.disableHD();
      const map = new kakao.maps.Map(mapContainer.current, options); // 좌표가 준비되면 지도 생성
      new kakao.maps.Marker({
        map: map,
        position: coordinates, // 마커 생성
      });
    }
  }, [coordinates]); // 좌표가 설정되면 이 useEffect가 실행되어 지도를 로드

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{
        width: "100%",
        height: "200px",
      }}
    />
  );
};

export default Map;

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  address: string;
}

const Map: React.FC<MapProps> = ({ address }) => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  useEffect(() => {
    const { kakao } = window;

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const coordinates = new kakao.maps.LatLng(result[0].y, result[0].x);
        setLat(result[0].y);
        setLng(result[0].x);

        const container = document.getElementById("map");
        const options = {
          center: coordinates,
          level: 3,
        };

        const map = new kakao.maps.Map(container, options);

        // 마커 생성
        new kakao.maps.Marker({
          map: map,
          position: coordinates,
        });
      }
    });
  }, [address]);

  return lat && lng ? (
    <a
      href={`https://map.kakao.com/link/map/${encodeURIComponent(
        address
      )},${lat},${lng}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        id="map"
        style={{
          width: "100%",
          height: "200px",
        }}
      />
    </a>
  ) : (
    <div
      id="map"
      style={{
        width: "100%",
        height: "200px",
      }}
    />
  );
};

export default Map;

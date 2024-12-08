import { useState } from "react";
import OrderRow from "../components/OrderRow";
import TrackingNumberRow from "../components/TrackingNumberRow";

export default function Main() {
  const [trackingNumberFile, setTrackingNumberFile] = useState(null);
  const selectTrackingNumberFile = (newValue) => {
    setTrackingNumberFile(newValue);
  };

  return (
    <>
      <OrderRow target={"coupang"} trackingNumberFile={trackingNumberFile} />
      <OrderRow target={"naver"} trackingNumberFile={trackingNumberFile} />

      <TrackingNumberRow
        value={trackingNumberFile}
        onSelect={selectTrackingNumberFile}
      />
    </>
  );
}

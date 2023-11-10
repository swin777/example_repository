import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.   
const map: ktGms.Map = new ktGms.Map({
  container: "map",
  style: "normal",
  center: [127.029414, 37.471401],
  zoom: 16,
  maxPitch: 68
});

//지도에 AttributionControl을 추가합니다. 
map.addControl(new ktGms.control.AttributionControl({
  customAttribution: "KT Map", //속성 정보
  compact: true //축소 가능 여부
}), "top-left");

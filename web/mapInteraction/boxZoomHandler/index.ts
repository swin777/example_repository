import ktGms from "kt-map-sdk-js";

//지도를 생성합니다.
const map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68,
});

const isEnable = document.getElementById("switch") as HTMLInputElement;

// switch가 변경되면 checked여부에 따라 boxZoom 가능여부를 설정합니다.
isEnable?.addEventListener("change", () => {
    if (isEnable.checked) {
        map.boxZoom.enable(); // switch checked가 true이면 boxZoom 활성화
    } else {
        map.boxZoom.disable(); // switch checked가 false이면 boxZoom 비활성화
    }
});
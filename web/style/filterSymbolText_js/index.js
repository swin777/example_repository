import ktGms from "kt-map-sdk-js";

//지도를 생성합니다
const map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [127.029414, 37.471401],
    zoom: 16,
    maxPitch: 68,
});

//아이콘의 포인트 좌표를 속성정보와 함께 소스 정의합니다
const places = new ktGms.source.GeoJSONSource("places", {
    data: [
        new ktGms.geometry.PointGeo([127.029414, 37.471401], { "icon": "theatre" }),
        new ktGms.geometry.PointGeo([127.030334, 37.473301], { "icon": "theatre" }),
        new ktGms.geometry.PointGeo([127.028444, 37.472001], { "icon": "bar" }),
        new ktGms.geometry.PointGeo([127.029444, 37.473001], { "icon": "bicycle" }),
        new ktGms.geometry.PointGeo([127.028944, 37.471101], { "icon": "music" }),
        new ktGms.geometry.PointGeo([127.029044, 37.471301], { "icon": "music" }),
        new ktGms.geometry.PointGeo([127.029644, 37.471801], { "icon": "music" }),
    ]
});

const layerIDs = []; // 필터된 layer의 ID를 담을 배열
const filterInput = document.getElementById("filter-input"); //사용자가 입력하는 input 

map.on("load", () => {
    // 포인트 좌표들을 반복문으로 확인하며 layer로 추가합니다
    places.data.forEach((data) => {
        const symbol = data.properties["icon"];
        const layerID = `poi-${symbol}`;
        let iconUrl;
        switch(symbol){
            case "music": iconUrl = "https://map.gis.kt.com/mapsdk/images/music.png"; break;
            case "theatre": iconUrl = "https://map.gis.kt.com/mapsdk/images/theatre.png"; break;
            case "bicycle": iconUrl = "https://map.gis.kt.com/mapsdk/images/bicycle.png"; break;
            default : iconUrl = "https://map.gis.kt.com/mapsdk/images/bar.png"; 
        }

        if (!map.getLayer(layerID)) {
            map.addLayer(new ktGms.layer.PointLayer(
                layerID, 
                new ktGms.style.SymbolStyle({
                    "text-color": "#202", //글자 색상
                    "text-halo-color": "#fff", //글자 그림자 색상
                    "text-halo-width": 2 //글자 그림자 두께 
                },{
                    "icon-size": 0.17, //아이콘 크기
                    "icon-overlap": "always", //다른 심볼과 겹칠 때 아이콘 표시 유무
                    "text-field": symbol,
                    "text-size": 11, //글자 크기
                    "text-transform": "uppercase", //글자 대문자로 변경
                    "text-letter-spacing": 0.05, //글자 사이 간격
                    "text-offset": [0, 2]  //글자 오프셋
                }, iconUrl /* 아이콘 url */),
                data, 
                "",
                {filter: ["==", "icon", symbol]} //소스의 icon 이름이 symbol과 같은 것만 레이어 표시
            ))

            layerIDs.push(layerID);
        }
    });
    
    //사용자가 텍스트 박스에 글자를 입력/삭제하면 수행할 함수입니다
    filterInput.addEventListener("keyup", (e) => {
        const value = e.target.value.trim().toLowerCase();
        layerIDs.forEach((layerID) => {
            map.setLayoutProperty(layerID, "visibility", layerID.indexOf(value) > -1 ? "visible" : "none");
        });
    });
});

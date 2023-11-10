import ktGms from "kt-map-sdk-js";

let map: ktGms.Map = new ktGms.Map({
    container: "map",
    style: "normal",
    center: [126.98224, 37.573761],
    zoom: 13,
    maxPitch: 68
})

map.on("load", () => {
    // 조선시대 5대 궁궐에 대한 GeoJSON Source를 추가합니다
    map.addSource("places", new ktGms.source.GeoJSONSource("places", {data: "./data.json"}))

    // 장소를 표시하는 레이어를 추가합니다.
    map.loadImage("https://map.gis.kt.com/mapsdk/data/favicon.ico", (error: any, image: any) => {
        if (error) throw error;
        map.addImage("location", image);
        map.addLayer(
            new ktGms.layer.PointLayer(
                "places", 
                new ktGms.style.SymbolStyle({},{
                    "icon-image": "location",
                    "icon-overlap": "always",
                    "icon-size": 0.1,
                }),
                "places"
            )
        )
    });

    // 인포윈도우를 생성하되 아직 지도에 추가하지 마세요.
    const infoWindow = new ktGms.overlay.InfoWindow({
        closeButton: false,
        closeOnClick: false,
    });

    // 장소 레이어의 피처에서 mouseenter 이벤트가 발생하면 해당 속성의 설명 HTML과 함께 피처 위치에서 인포윈도우를 엽니다.
    map.onLayer("mouseenter", "places", (e: any) => {
        // 마우스가 장소 레이어 위에 있으면 커서를 포인터로 변경합니다.
        map.getCanvas().style.cursor = "pointer";

        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        infoWindow.setLngLat(coordinates).setHTML(description).addTo(map);
    });

    map.onLayer("mouseleave", "places", () => {
        // 마우스가 떠날 때 커서를 원상태로 다시 변경합니다.
        map.getCanvas().style.cursor = "";

        // 마우스가 떠날 때 인포윈도우를 제거합니다.
        infoWindow.remove();
    });
});

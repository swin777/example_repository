import ktGms from "kt-map-sdk-js"

const map = new ktGms.Map({
	container: "map",
	style: "normal",
	center: [127.029414, 37.471401],
	zoom: 17,
	maxPitch: 68
});

map.on("load", () => {
	// Polygon 형태의 GeoJSON Source 추가
	map.addSource("area", new ktGms.source.GeoJSONSource("area", {
		data: [new ktGms.geometry.Polygon([
			[
				[127.02899127790869, 37.471897313257],
				[127.02914953319822, 37.47194547660044],
				[127.02925041862255, 37.47196372914743],
				[127.02935791934812, 37.47196865963967],
				[127.02947015055008, 37.47196160198918],
				[127.02960080681999, 37.47193741419227],
				[127.02972683693872, 37.47189604173104],
				[127.02989428207763, 37.47179841699379],
				[127.0299783969507, 37.471720276638735],
				[127.03003236605338, 37.47165919123137],
				[127.0300649238942, 37.471601604876184],
				[127.03011551992455, 37.47146385820275],
				[127.03013146533686, 37.4713139428071],
				[127.03012502585341, 37.471243609019666],
				[127.02980948223092, 37.47105240339992],
				[127.02985394541219, 37.4709925342987],
				[127.02999226480654, 37.4708975761516],
				[127.02986868782818, 37.470816533652126],
				[127.02982115822107, 37.47084744176259],
				[127.02972182180343, 37.47079939411542],
				[127.02972059523393, 37.47079939411542],
				[127.02963197551247, 37.470763861935964],
				[127.02952005095455, 37.470736117617264],
				[127.02941016365492, 37.47072382318207],
				[127.02930007895952, 37.470725526770565],
				[127.02905292498048, 37.47077249741439],
				[127.02895130605657, 37.47080904711913],
				[127.02885554321244, 37.47086192135181],
				[127.02874277316772, 37.470948893122824],
				[127.02868443858927, 37.47101324478487],
				[127.02859505267224, 37.471184522917426],
				[127.0285772233587, 37.47123228751886],
				[127.02856741358818, 37.47131763511703],
				[127.02856496044649, 37.4713621716982],
				[127.0285820090125, 37.471446655053384],
				[127.02911042085617, 37.471762239873414],
				[127.02899127790869, 37.471897313256],
			]
		])]
	}))

	// style 정의
	let style = new ktGms.style.FillStyle({
		"fill-color": "#FF0000",
		"fill-opacity": 0.6
	}, {})

	// layer 추가
	map.addLayer(new ktGms.layer.PolygonLayer("area", style, "area"))

})
// marker 생성하기
const marker = new ktGms.overlay.Marker({
	lngLat: [127.029414, 37.471401]
}).addTo(map)

// map click event가 발생했을 때 호출됩니다.
map.on("click", e => {
	addInnerText("map 클릭 이벤트가 발생하였습니다.\n")
})

// "area" 레이어 click event가 발생했을 때 호출됩니다.
map.onLayer("click", "area", e => {
	addInnerText("layer 클릭 이벤트가 발생하였습니다.\n")
})

// marker click event가 발생했을 때 호출됩니다.
marker.on("click", e => {
	addInnerText("marker 클릭 이벤트가 발생하였습니다.\n")
	e.stopPropagation()
})

const addInnerText = str => {
	if (document.getElementById("res")) {
		document.getElementById("res").innerText += str
	}
}

// mousedown event가 발생하면 HTML 문자열을 초기화 해줍니다.
document.addEventListener("mousedown", e => {
	if (document.getElementById("res")) {
		document.getElementById("res").innerText = ""
	}
})
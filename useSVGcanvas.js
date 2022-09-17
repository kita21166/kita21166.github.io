const SVGscreen = document.getElementById("SVGScreen"); 
const start_endButton = document.getElementById("start_endSelectDesk");
const userNameArea =  document.getElementById("UserName");
const userNumArea = document.getElementById("UserNumber");
const selectNameArea = document.getElementById("selectName");
const deskCanvas = document.getElementById("deskCanvas");
const SVGcanvas = document.getElementById("SVGcanvas");
const dates = new Date();
const hideElementIfexist = function(ele){
	if(ele)ele.className = "hiddenElement";
}
const putButtonSVG = function(){
    localStorage.setItem("WhereAre",JSON.stringify(WhereAre));
    localStorage.setItem("removedDesks",JSON.stringify(RemovedDesks));
    localStorage.setItem("howMany",JSON.stringify(howManyRest));
    localStorage.setItem("userNames",JSON.stringify(userNames));
    const DLbutton = document.createElement("button");
    DLbutton.type = "button";
    DLbutton.textContent = "保存";
    document.body.append(DLbutton);
    DLbutton.addEventListener("click",()=>{
        const SVGtext = new XMLSerializer().serializeToString(document.getElementById("SVGsheet"));
        const canvasForSVG = document.createElement("canvas");
        canvasForSVG.width = 990;
        canvasForSVG.height = 700;
        const SVGx = canvasForSVG.getContext("2d");
        const imageForSVG = new Image();
        imageForSVG.onload = () =>{
        SVGx.drawImage(imageForSVG,0,0);
        const svgA = document.createElement("a");
        svgA.href = canvasForSVG.toDataURL("image/png");
        svgA.download = `席替え-${dates.getMonth()+1}_${dates.getDate()}.png`;
        svgA.click();
        }
        imageForSVG.src = `data:image/svg+xml;charset=utf-8;base64,${btoa(unescape(encodeURIComponent(SVGtext)))}`;
		preparePrint();
    })
}
const preparePrint = function(){
	document.title = `${WhereAre} 座席表 ${dates.getMonth()+1}_${dates.getDate()}～` ;
	document.body.removeChild(document.getElementById("progressWrap"));
	hideElementIfexist(document.getElementById("inputUserNumber"));
	hideElementIfexist(document.querySelector("button[type='button']"));
	SVGscreen.className = "blockElement rotation";
}
const SVGmb = function() {
    howManyRest = howMany;
	document.title = "席替え＜振り分け＞";
	SVGscreen.className = "blockElement";
	SVGscreen.style.width = `${(screen.availWidth)/2}px`;
	const placeRect = [];
	for(let i = 0; i < 7; i++){
		for(let j = 0; j < 6; j++){
			placeName.push([95 +( j *160),61+(i*80)])
		}
	}
	for(let i = RemovedDesks.length; i > 0; i--){
		placeName.splice(RemovedDesks[i-1],1);
	}
	placeName.forEach(ele => {
		const [Xplace,Yplace] = ele;
		placeRect.push([Xplace - 75, Yplace - 31]);
	});
	let p = ""
	for (let i = 0; i < placeRect.length; i++) {
		p += `<rect x="${placeRect[i][0]}" y="${placeRect[i][1]}" width="150" height="70" />`;
	}
	deskCanvas.insertAdjacentHTML("beforeend", p);
	SVGcanvas.insertAdjacentHTML("beforeend",`<text x="150" y="20">${WhereAre}</text><text x="50" y="20">${dates.getMonth()+1}/${dates.getDate()}~</text>`);
	if (localStorage.getItem("userNames") === null && afterChoose === true) {
		document.getElementById("inputUserName").className =
			"ruleSentence blockElement";
		document.getElementById("inputUserNumber").className = "ruleSentence blockElement";
		userNameArea.focus();
		start_endButton.addEventListener("click", startRandomChangeByInput);
	} else if(localStorage.getItem("userNames") !== null){
			const optionNames = JSON.parse(localStorage.getItem("userNames"));
			for (let i = 0; i < howMany; i++) {
				const nameOption = document.createElement("option");
                const userName = optionNames[i]
				nameOption.value = userName;
				nameOption.id = userName;
				nameOption.textContent = userName;
				selectNameArea.appendChild(nameOption);
			}
			document.getElementById("selectUserName").className =
				"ruleSentence blockElement";
			start_endButton.addEventListener("click", startRandomChangeBySelect);
	} else {
		for(let i = 1; i <= howMany; i++){
            const nameOption = document.createElement("option");
            const userName = `${i}.${studentTags[i-1]}`;
            nameOption.value = userName;
            nameOption.id = userName;
            nameOption.textContent = userName;
            selectNameArea.appendChild(nameOption);
		}
        document.getElementById("selectUserName").className = "ruleSentence blockElement";
        start_endButton.addEventListener("click",startRandomChangeBySelect);
	}
}
const startRandomChangeByInput = function(){
	let userName = userNameArea.value;
	let userNum = userNumArea.value;
if(userName){
	userName = userName.replace(/</g,"\x3C");
}else{
  'NOBODY';
}
if(!userNum){
	userNum = howMany;
}
	userName = `${userNum}. ${userName}`;
	userNameArea.value = "";
	start_endButton.removeEventListener("click",startRandomChangeByInput);
	startRandomChange(userName);
}
const startRandomChange = function(userName){
        userNames.push(userName);
	howMany--;
if(howMany){
	randomWhereNum = 99;
	Animeid = setInterval(randomAnime,300,userName);
	start_endButton.textContent = "停止";
	start_endButton.addEventListener("click",stopRandomChange);
}else{
SVGcanvas.insertAdjacentHTML("beforeend",`<text x="${placeName[0][0]}" y="${placeName[0][1]}">${userName}</text>`);
SVGscreen.removeChild(document.getElementById("inputUserName"));
		SVGscreen.removeChild(start_endButton);
		SVGscreen.removeChild(document.getElementById("selectUserName"));
		putButtonSVG();
}
}
const startRandomChangeBySelect = function(){
	const userName = selectNameArea.value;
	selectNameArea.removeChild(document.getElementById(userName));
	start_endButton.removeEventListener("click",startRandomChangeBySelect);
	startRandomChange(userName);
}
const randomAnime = function(userName) {
		if (randomWhereNum !== 99) {
			SVGcanvas.removeChild(SVGcanvas.lastChild);
		}
let preSelectNum = parseInt(Math.random() * placeName.length);
if(preSelectNum === randomWhereNum){
	for(;;){
preSelectNum = parseInt(Math.random() * placeName.length);
if(preSelectNum !== randomWhereNum){
break;
}
}
}
		randomWhereNum = preSelectNum;
		const [x1, y1] = placeName[randomWhereNum];
		SVGcanvas.insertAdjacentHTML("beforeend", `<text x="${x1}" y="${y1}">${userName}</text>`);
}
const stopRandomChange = function() {
	clearInterval(Animeid);
	placeName.splice(randomWhereNum, 1);
		start_endButton.removeEventListener("click", stopRandomChange);
		start_endButton.textContent = "開始";
		if(afterChoose === true){
			start_endButton.addEventListener("click",startRandomChangeByInput);
		}else{
			start_endButton.addEventListener("click", startRandomChangeBySelect);
		}
}
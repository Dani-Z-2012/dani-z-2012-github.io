let allId = [];
let previewVar;
let seatCuant = 0;
let seatId;
//var takenId = JSON.parse(localStorage.getItem("taken"));
var storedNames = JSON.parse(localStorage.getItem("names"));
let payButton = document.getElementsByClassName("pay");
let resButton = document.getElementsByClassName("reset");
const seatMap = document.body.getElementsByClassName("seat_map");
const maxSeats = 104;
const previewText = document.createElement("p");	
previewText.textContent = "Preview Output";
document.body.appendChild(previewText);

if (!storedNames) {
	storedNames = [];
}

function compareNumbers(a, b) {
  return a - b;
}

function setText(pText, idText){

	let checkId = allId.includes(idText);
	
	if (checkId) {
		const reId = allId.indexOf(idText);
		allId.splice(reId, 1);
	} else {
		allId.push(idText);
	}
	
	allId.sort(compareNumbers);
	previewText.textContent = "T:" + pText + "&ID:" + allId;
}



for(let i = 0; i < maxSeats; i++){
	const seat = document.createElement('img');
	if (storedNames.includes(i.toString())) {
		seat.setAttribute("src","images/asiento-rojo.png");
	} else {
		seat.setAttribute("src","images/asiento-blanco.png");
	}
	seat.setAttribute("id",i);
	seatMap[0].appendChild(seat);
	
	seat.onclick = function() {
		let status = this.getAttribute("src");
		if (status === "images/asiento-blanco.png"){
			this.setAttribute("src","images/asiento-verde.png");
			seatId = this.getAttribute("id")
			seatCuant = seatCuant + 1;
			setText(seatCuant, seatId);
			
		} else if (status === "images/asiento-verde.png") {
			seat.setAttribute("src","images/asiento-blanco.png");
			seatId = this.getAttribute("id")
			seatCuant = seatCuant - 1;
			setText(seatCuant, seatId);
		}
	}	
}

payButton[0].onclick = function() {
	const storeData = storedNames.concat(allId);
	localStorage.setItem("names", JSON.stringify(storeData));
	location.reload();
}

resButton[0].onclick = function() {
	localStorage.setItem("names", 0);
	location.reload();
}


let allId = [];
let previewVar;
let seatCuant = 0;
let seatId;
const maxSeats = prompt("Numero de hacientos totales");
const previewText = document.createElement("p");	
previewText.textContent = "Preview Output";
document.body.appendChild(previewText);


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
	seat.setAttribute("src","images/asiento-blanco.png");
	seat.setAttribute("id",i);
	document.body.appendChild(seat);
	
	seat.onclick = function() {
		let status = this.getAttribute("src");
		if (status === "images/asiento-blanco.png"){
			this.setAttribute("src","images/asiento-rojo.png");
			seatId = this.getAttribute("id")
			seatCuant = seatCuant + 1;
			setText(seatCuant, seatId);
			
		} else {
			seat.setAttribute("src","images/asiento-blanco.png");
			seatId = this.getAttribute("id")
			seatCuant = seatCuant - 1;
			setText(seatCuant, seatId);
		}
	}	
}


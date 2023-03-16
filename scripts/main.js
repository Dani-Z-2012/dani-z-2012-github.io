let seatArray = [];															//Todos los Ids de los asientos seleccionados
let seatCuant = 0;															//Cantidad total de asientos seleccionados
let seatId;																	//Id del asiento seleccionado
var storedId = JSON.parse(localStorage.getItem("seats"));					//Carga los id guardas de las reservas
let payButton = document.getElementsByClassName("pay");						//Botton de pago
let resButton = document.getElementsByClassName("reset");					//Boton de reinicio
const maxSeats = 250;														//Numero de asientos que se generan al iniciar la pagina

//Texto que se usara para mostrar el output
const previewText = document.createElement("p");								
previewText.textContent = "Preview Output";
document.body.appendChild(previewText);

//Define el valor del Array a 0 en vez de Null
if (!storedId) {
	storedId = [];
}

//Funsion para ordenar de menor a mayor en los Arrays
function compareNumbers(a, b) {
  return a - b;
}

function evenNumber(x){ 
  return (x % 2) == 0; 
} 

//Output de texto
function setText(pText, idText){

	//Compara si el asiento ya estaba seleccionado
	let checkId = seatArray.includes(idText);
	
	if (checkId) {
		//Busca el lugar del id seleccionado y lo borra
		const reId = seatArray.indexOf(idText);
		seatArray.splice(reId, 1);
	} else {
		//Agrega el id seleccionado
		seatArray.push(idText);
	}
	
	//Ordena de menor a mayor los IDs y luego muestra el texto
	seatArray.sort(compareNumbers);
	previewText.textContent = "T:" + pText + "&ID:" + seatArray;
}


//Generacion de las imagenes
for(let i = 1; i <= maxSeats; i++){
	
	//Crea el elemento de la img
	const seat = document.createElement('img');
	
	//Compara si el ID del asiento esta marcado como ocupado
	if (storedId.includes(i.toString())) {
		//Coloca un asiento en rojo
		seat.setAttribute("src","images/asiento-rojo.png");
	} else {
		//Coloca un asiento en blanco
		seat.setAttribute("src","images/asiento-blanco.png");
	}
	//Le da el ID al asiento
	seat.setAttribute("id",i);
	
	const isEven = evenNumber(i);
	
	//Selecciona donde colocar el asiento dependiendo si la ID es par o impar
	if (isEven) {
		document.body.getElementsByClassName("seat map")[0].getElementsByClassName("evens")[0].appendChild(seat);	
	} else {
		document.body.getElementsByClassName("seat map")[0].getElementsByClassName("odds")[0].appendChild(seat);
	}
	
	//Funcion al clickear las imagenes
	seat.onclick = function() {
		//Que tipo de asiento se selecciono
		let status = this.getAttribute("src");
		
		//Compara si el asiento es blanco o verde
		if (status === "images/asiento-blanco.png"){
			
			//Cambia el color a verde
			this.setAttribute("src","images/asiento-verde.png");
			//Recoge el ID
			seatId = this.getAttribute("id")
			//Agrega 1 al total de asientos seleccionados
			seatCuant = seatCuant + 1;
			//Envia el total de asientos y la id del nuevo asientos al output de texto
			setText(seatCuant, seatId);
			
		} else if (status === "images/asiento-verde.png") {
			
			//Cambia el color a blanco
			seat.setAttribute("src","images/asiento-blanco.png");
			//Recoge el id
			seatId = this.getAttribute("id")
			//Quita 1 al total de asientos seleccionados
			seatCuant = seatCuant - 1;
			//Envia el total de asientos y la id del nuevo asientos al output de texto
			setText(seatCuant, seatId);
		}
	}	
}

//Agrega los asientos seleccionados a los asientos reservados y luego recarga la pagina
payButton[0].onclick = function() {
	//Formato para guardar la informacion
	const storeData = storedId.concat(seatArray);
	//Guarda la informacion
	localStorage.setItem("seats", JSON.stringify(storeData));
	//Recarga la pagina
	location.reload();
}

//Borra la lista de asientos reservados y recarga la pagina
resButton[0].onclick = function() {
	//Elimina los asientos reservados
	localStorage.setItem("seats", 0);
	//Recarga la pagina
	location.reload();
}

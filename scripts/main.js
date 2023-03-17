let seatRow = [20,26,28,30,30,30,30,30,30,28,28,28,28,28,28,28,28,28,26,24,22,17,13];	//Cantidad de asientos por fila
let evenRow = 21;																		//Cantidad de filas pares
let oddRow = 23;																		//Cantidad de filas impares
let maxSeats = 0;																		//Variable para el numero de asientos
let totalRow = 22//seatRow.length;														//Cantidad total de filas de asientos
let seatArray = [];																		//Todos los Ids de los asientos seleccionados
let seatCuant = 0;																		//Cantidad total de asientos seleccionados
let seatId;																				//Id del asiento seleccionado
var storedId = JSON.parse(localStorage.getItem("seats"));								//Carga los id guardas de las reservas
let payButton = document.getElementsByClassName("pay");									//Botton de pago
let resButton = document.getElementsByClassName("reset");								//Boton de reinicio
let currentRow = 0																		//Variable para el calculo de la creacion de asientos

//Texto que se usara para mostrar el output
const previewText = document.createElement("p");								
previewText.textContent = "Preview Output";
document.body.getElementsByClassName("preview")[0].appendChild(previewText);

//for (let i = 0; i < seatRow.length; i++) {
//    maxSeats = maxSeats + seatRow[i];
//}				



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
	previewText.innerHTML = "Total de asientos: " + pText + "<br>" + "ID de los asientos: " + seatArray;
}


//const funcRepeat = (totalRow + 1) * 100 + seatRow[totalRow];

//Generacion de las imagenes
for(let i = 101; i <= (totalRow + 1) * 100 + seatRow[totalRow]; i){
	
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
	
	//Asigna el atributo ID al asiento
	seat.setAttribute("id",i);
	
	const isEven = evenNumber(i);
	
	//Selecciona donde colocar el asiento dependiendo si la ID es par o impar
	if (isEven) {
		if (currentRow <= evenRow - 1) {
			document.body.getElementsByClassName("evens")[0].getElementsByClassName("seat")[currentRow].appendChild(seat);
		}
	} else {
		if (currentRow <= oddRow - 1)
		document.body.getElementsByClassName("odds")[0].getElementsByClassName("seat")[currentRow].appendChild(seat);
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
			seatCuant++;
			//Envia el total de asientos y la id del nuevo asientos al output de texto
			setText(seatCuant, seatId);
			
		} else if (status === "images/asiento-verde.png") {
			
			//Cambia el color a blanco
			seat.setAttribute("src","images/asiento-blanco.png");
			//Recoge el id
			seatId = this.getAttribute("id")
			//Quita 1 al total de asientos seleccionados
			seatCuant--;
			//Envia el total de asientos y la id del nuevo asientos al output de texto
			setText(seatCuant, seatId);
		}
	}
	
	//Suma de i para respetar las ID correctas
	if (i === seatRow[currentRow] + (currentRow + 1) * 100) {
		currentRow++;
		i = (currentRow + 1) * 100 + 1;
	} else {
		i++;
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



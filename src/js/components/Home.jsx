import React, {useState,useEffect,useRef} from "react";
import SecondsCounter from "./SecondsCounter";
import './SecondsCounter.css'


//create your first component
const Home = () => {
	//Creo el estado de inicio de los segundos a 0
	const [segundos, setSegundos]= useState(0);
	// creo el estado para saber si el contador esta corriendo
	const [estaCorriendo, setEstaCorriendo] = useState (true);
	//creo el estado para el tiempo de la alerta
	const [tiempoAlerta, setTiempoAlerta] = useState (null);
	// referencia para el intervalo entre cada segundo
	const intervaloRef = useRef(null);

	//creo funcion para iniciar el intervalo
	const iniciarIntervalo = () => {
		intervaloRef.current = setInterval(() =>{
			setSegundos((prevSegundos) =>prevSegundos + 1);
		},1000);
	};
	// funcion para detener el intervalo de segundos
	const detenerIntervalo = () =>{
		clearInterval(intervaloRef.current)
	}
	// efecto con useEffect para manejar el intervalo de segundos
	useEffect(()=>{
		if (estaCorriendo){
			iniciarIntervalo();
		} else {
			detenerIntervalo()
		}
		return () => detenerIntervalo();
		}, 	[estaCorriendo]);

	// efecto useEffect para mostrar la alerta cuando llega al tiempo elegido
	useEffect(() =>{
		if (tiempoAlerta !== null & segundos === tiempoAlerta){
			alert (`tiempo alcanzado: ${tiempoAlerta} segundos`);
		}
	}, [segundos, tiempoAlerta] )

	// ahora funcion para que separe el contador
	const pararContador = () => setEstaCorriendo(false)

	//reinicio el contador
	const reiniciarContador = () => {
		setEstaCorriendo(false);
		setSegundos(0);
		setEstaCorriendo(true);
	}
	//funcion para resumir contador
	const resumirContador = () => setEstaCorriendo (true);

	// funcion para controlar el cambio en el tiempo de la alerta
	const manejarCambioAlerta = (elemento) => setTiempoAlerta (Number(elemento.target.value));
document.addEventListener("DOMContentLoaded", function() {
  // Tiempo total en segundos
  const totalTime = 60;
  let timeRemaining = totalTime;

  // Elementos del DOM
  const progressBar = document.getElementById("progress-bar");
  const countdown = document.getElementById("countdown");

  // Función para actualizar la barra de progreso y el contador inverso
  const updateProgress = () => {
    // Calcular el porcentaje de progreso
    const progressPercent = (timeRemaining / totalTime) * 100;
    // Actualizar el ancho de la barra de progreso
    progressBar.style.width = progressPercent + "%";
    // Actualizar el contador inverso
    countdown.textContent = timeRemaining;
    // Restar un segundo
    timeRemaining -= 1;
    // Si el tiempo restante es cero, detener el intervalo
    if (timeRemaining < 0) {
      clearInterval(interval);
    }
  };

  // Iniciar el intervalo para el contador inverso
  const interval = setInterval(updateProgress, 1000);
});



	return (
		<div className="text-center">
			<SecondsCounter segundos = {segundos}/>
			<div className="btn-group mt-3" role='group'>
				<button className="btn btn-danger" onClick={pararContador}>Parar</button>
				<button className="btn btn-warning" onClick={reiniciarContador}>Reiniciar</button>
				<button className="btn btn-primary" onClick={resumirContador}>Continuar</button>
			</div>
			<div className="mt-3">
				<label htmlFor="tiempoAlerta" className="btn btn-primary">Tiempo alerta :_</label>
				<input type='number' className='tiempoAlerta' onChange={manejarCambioAlerta} placeholder="Indique segundos:"/>
				
			</div>
			
			
		</div>
	);
};

export default Home;

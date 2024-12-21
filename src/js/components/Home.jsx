import React, {useState,useEffect,useRef} from "react";
import SecondsCounter from "./SecondsCounter";


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



	return (
		<div className="text-center">
			<SecondsCounter segundos = {segundos}/>
			<div className="btn-group mt-3" role='group'>
				<button className="btn btn-danger" onClick={pararContador}>Parar</button>
				<button className="btn btn-warning" onClick={reiniciarContador}>Reiniciar</button>
				<button className="btn btn-primary" onClick={resumirContador}>Continuar</button>
			</div>
			<div className="mt-3">
				<label htmlFor="tiempoAlerta" className="tiempoElegido">Tiempo para la alerta en segundos:_</label>
				<input type='number' id='tiempoAlerta' onChange={manejarCambioAlerta} />
			</div>
		</div>
	);
};

export default Home;

import React, { useContext, useEffect, useState } from "react";
import {
	Container,
	Row,
	Col,
	Image,
	Form,
	Button,
	Card,
	Carousel,
	CarouselItem,
} from "react-bootstrap";
import FormFechaLugar from '../../common/web/alquileres/FormfechaLugar';
//URL API
import FetchAPI from "../../../utils/FetchAPI";
import { urlAutosWeb } from "../../../consts/URLs";

//Context
import { AuthContext } from "../../../contexts/AuthContext";

//Validaciones
import { validationString, validationDateWeb } from "../../../utils/Validations";
import { useHistory } from "react-router";


const HomeView = () => {

	const { infoAlqui, setInfoAlqui, setIdVehiculo } = useContext( AuthContext );
	const history = useHistory();
	const [autos, setAutos] = useState([]);
	const [show, setShow] = useState(false);
	const [no, setNo] = useState(0);

	const getAutos = () => {
		let autosAPI = FetchAPI(urlAutosWeb, "GET", {});
		autosAPI.then((data) => {
			setAutos([...data]);
			if (autos.length < 8) {
				setNo(autos.length);
			} else {
				setNo(8);
			}
		});
	};

	useEffect(() => {
		getAutos();
	}, []);

	const validacionInfoAlqui = () => {
        if( validationString( infoAlqui.entrega.lugar ) && validationString( infoAlqui.entrega.fecha ) && validationString( infoAlqui.devolucion.lugar ) && validationString( infoAlqui.devolucion.fecha )  )
        {
            if( validationDateWeb( infoAlqui.entrega.fecha, infoAlqui.devolucion.fecha) )
            {
                history.push('/public/Detalle');
            }
        }
        else
        {
            console.log('Ingresa los valores necesarios');
        }
        
    }

	return (
		<>
			<Container style={{ backgroundColor: "#F7B569" }} fluid>
				<Row style={{ backgroundColor: "#1E2430", color: "#f9f9f9" }}>
					<Carousel fade nextLabel="" prevLabel="">
						<CarouselItem>
							<img
								className="d-block w-100"
								src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
								alt="Primera"
							/>
						</CarouselItem>
						<CarouselItem>
							<img
								className="d-block w-100"
								src="http://hdqwalls.com/wallpapers/bentley-continental-gt-2018-4k-1g.jpg"
								alt="Segunda"
							/>
						</CarouselItem>
						<CarouselItem>
							<img
								className="d-block w-100"
								src="https://wallpapercave.com/wp/wp7381593.jpg"
								alt="Tercera"
							/>
						</CarouselItem>
					</Carousel>
				</Row>
				<Row
					className="align-items-center"
					style={{ backgroundColor: "#1E2430", color: "#f9f9f9" }}
				>
					<Col className="justify-content-left p-5 pt-15" xs={12} md={6}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
						magna tellus. Phasellus vehicula diam id mollis interdum. Cras vel
						vehicula justo. Suspendisse eu orci vel nisl vestibulum venenatis.
						Nulla interdum nibh tortor, ac tincidunt turpis bibendum a.
						Curabitur nunc eros, mollis vitae convallis at, vestibulum at quam.
						Sed feugiat erat non tempus scelerisque. Fusce at sodales purus.
					</Col>
					<Col className="justify-content-center" xs={12} md={6}>
						<Image
							src="https://es.nissanusa.com/content/dam/Nissan/us/vehicles/sentra/2021/overview/2021-nissan-sentra-orange-against-white-background.png"
							fluid
						/>
					</Col>
				</Row>
				<FormFechaLugar />
				<Row style={{ backgroundColor: "#F7B569" }}>
					{autos.map((item, i) => {
						return (
							<Col key={i} xs={12} md={3}>
								<Card>
									<Card.Img variant="top" src={item.imagen} />
									<Card.Body>
										<Card.Title>{item.modelo.modelo}</Card.Title>
										<Card.Text>
											Año:{" "}
											<span
												className="badge rounded-pill"
												style={{
													backgroundColor: "#F7B569",
													color: "#f9f9f9",
													borderColor: "#DEA35F",
												}}
											>
												{item.anio}
											</span>
										</Card.Text>
										<Card.Text>
											Caja:{" "}
											<span
												className="badge rounded-pill"
												style={{
													backgroundColor: "#F7B569",
													color: "#f9f9f9",
													borderColor: "#DEA35F",
												}}
											>
												{item.transmision}
											</span>
										</Card.Text>
										<Card.Text>
											Puertas:{" "}
											<span
												className="badge rounded-pill"
												style={{
													backgroundColor: "#F7B569",
													color: "#f9f9f9",
													borderColor: "#DEA35F",
												}}
											>
												{item.puertas}
											</span>
										</Card.Text>
										<Card.Text>
											Pasajeros:{" "}
											<span
												className="badge rounded-pill"
												style={{
													backgroundColor: "#F7B569",
													color: "#f9f9f9",
													borderColor: "#DEA35F",
												}}
											>
												{item.pasajeros}
											</span>
										</Card.Text>
										<Button
											style={{
												width: '100%',
												backgroundColor: "#F7B569",
												color: "#f9f9f9",
												borderColor: "#F7B569",
											}}
											onClick = { () => {
												setIdVehiculo(item.id_auto_PK);
												setInfoAlqui( {...infoAlqui, precio_neto: item.precio_dia } )
												validacionInfoAlqui();
											} }
											variant="primary"
										>
											Elegir vehículo
										</Button>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
				<Row
					className="mt-5"
					style={{ backgroundColor: "#1E2430", color: "#f9f9f9" }}
				>
					<Col xs={12} className="text-center text-uppercase fs-2 p-5">
						Derechos Reservados
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default HomeView;

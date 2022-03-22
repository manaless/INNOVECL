import { Carousel } from "react-carousel-minimal";
import "./style.css";
import { Button, Popover } from "element-react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import TableQuestions from "./TableQuestions";
import Accueil from "./Accueil";
import { content } from "react-redux";
import Ajout_seance from "./Ajout_seance";
import { reset } from "../actions/criteriaActions";
import { connect } from "react-redux";

function CarouselTest() {
    const data = [
        {
            image: "http://www.learninglab-network.com/wp-content/uploads/2018/05/UDL_COBRANDING_ECL.png",
            caption: "Inspiration",
        },
        {
            image: "http://novattitude.com/wp-content/uploads/2018/03/open-innovation-LR.jpeg",
            caption: "Organisation",
        },
        {
            image: "https://image.shutterstock.com/image-vector/flat-colorful-design-concept-innovation-260nw-1009256863.jpg",
            caption: "Imagination",
        },
    ];

    const captionStyle = {
        fontSize: "2em",
        fontWeight: "bold",
    };
    const slideNumberStyle = {
        fontSize: "20px",
        fontWeight: "bold",
    };

    return (
        <div className='App'>
            <div style={{ textAlign: "center" }}>
                <h2>Plateforme d'innovation</h2>
                <h1>Innov@Ecl</h1>
                <h3>
                    Pour commencer une nouvelle séance cliquer sur le bouton
                </h3>

                <Popover
                    placement='right'
                    title='Ajouter une seance'
                    width='400'
                    trigger='click'
                    content={<Ajout_seance />}
                >
                    <a
                        href='/TableQueastions'
                        onClick={(e) => {
                            e.preventDefault();
                            this.props.reset();
                        }}
                    >
                        Commencer une nouvelle séance
                    </a>
                </Popover>
            </div>

            <div
                style={{
                    padding: "0 20px",
                }}
            >
                <Carousel
                    data={data}
                    time={2000}
                    width='850px'
                    height='400px'
                    captionStyle={captionStyle}
                    radius='10px'
                    slideNumber={false}
                    slideNumberStyle={slideNumberStyle}
                    captionPosition='bottom'
                    automatic={true}
                    dots={true}
                    pauseIconColor='white'
                    pauseIconSize='40px'
                    slideBackgroundColor='darkgrey'
                    slideImageFit='cover'
                    thumbnails={false}
                    thumbnailWidth='100px'
                    style={{
                        textAlign: "center",
                        maxWidth: "850px",
                        maxHeight: "500px",
                        margin: "40px auto",
                    }}
                />
            </div>
        </div>
    );
}

export default connect(null, reset)(CarouselTest);

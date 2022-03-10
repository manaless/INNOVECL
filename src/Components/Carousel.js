import { Carousel } from 'react-carousel-minimal';
import './style.css';

function CarouselTest() {
 const data = [
    {
      image: "http://www.learninglab-network.com/wp-content/uploads/2018/05/UDL_COBRANDING_ECL.png",
      caption: "Inspiration"
    },
    {
      image: "https://www.yumana.io/wp-content/uploads/2020/06/intelligence-collective.jpg",
      caption: "Créativité"
    },
    {
      image: "http://novattitude.com/wp-content/uploads/2018/03/open-innovation-LR.jpeg",
      caption: "Organisation"
    },
    {
      image: "https://image.shutterstock.com/image-vector/flat-colorful-design-concept-innovation-260nw-1009256863.jpg",
      caption: "Imagination"
    },
    {
      image: "https://www.knowllence.com/wp-content/uploads/2003/05/innovation.jpg",
      caption: "Motivation"
    },
    {
      image: "https://www.echosciences-grenoble.fr/uploads/article/image/attachment/1005408863/xl_open-innovation.jpg",
      caption: "Analyse"
    }
  ];

  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <h2>Plateforme d'innovation de l'Ecole Centrale de Lyon</h2>
        <h1>Innov@Ecl</h1>
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={data}
            time={2000}
            width="850px"
            height="400px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber={false}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={false}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CarouselTest;


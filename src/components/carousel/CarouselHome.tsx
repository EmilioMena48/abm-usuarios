import Carousel from 'react-bootstrap/Carousel';


const CarouselHome = () => {

    return(
        <>
            <Carousel>
      <Carousel.Item>
        <img className='d-block w-100' 
        style={{maxHeight:"500px", objectFit:"cover"}} 
        src="images/75572-hamburguesa.jpg" alt="" />
        <Carousel.Caption>
          <h3>El Buen Sabor</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className='d-block w-100' 
        style={{maxHeight:"500px", objectFit:"cover"}} 
        src="images/wallpaperbetter.com_3840x2160 (1).jpg" alt="" />
        <Carousel.Caption>
          <h3>El Buen Sabor</h3> 
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img className='d-block w-100' 
        style={{maxHeight:"500px", objectFit:"cover"}} 
        src="images/wallpaperbetter.com_3840x2160.jpg" alt="" />
        <Carousel.Caption>
          <h3>El Buen Sabor</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </>
    )

}

export default CarouselHome;
import React, { useEffect, useState } from 'react'
import * as IoIcons from 'react-icons/io'
import './ImageSlider.css'



interface props {
    slides: any
}
const delay = 2500;
const ImageSlider = ({slides}:props) => {

    const [currentSlide, setCurrentSlide] = useState(0)
    const timeoutRef = React.useRef<any>(null);


    const slidestyles = {
        backgroundImage: `url(${slides[currentSlide].url})`,
        width:'100%',
        height:'100%',
        borderRadius:'10px',
        backgroundPosition:'center',
        backgroundSize:'cover',
    }

    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }
    
      React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
          () =>
            setCurrentSlide((prevIndex) =>
              prevIndex === slides.length - 1 ? 0 : prevIndex + 1
            ),
          delay
        );
    
        return () => {
          resetTimeout();
        };
      }, [currentSlide]);

    

    

    

    return (
        <div className='sliderstyles' style={{ transform: `translate3d(${-currentSlide}%)` }}>
            {/* <div className='leftArrowStyles' >
                <IoIcons.IoIosArrowBack />
            </div> */}
            <div 
                style={slidestyles}>
            </div>
            {/* <div className='rightArrowStyles'>
                <IoIcons.IoIosArrowForward />
            </div> */}
        </div>
    )


}

export default ImageSlider
import React, {useState} from 'react'
import styles from './goodImage.module.css'

const GoodImage = ({image_url}) =>{
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const magnifierHeight = 100
  const magnifieWidth = 100
  const zoomLevel = 1.8

  return(
    <div className={styles.product_page_slider}>
      <div className={styles.product_page_slider_wrapper}>
        <div className={styles.swiper_wrapper}>
          <div className={styles.swiper_slide}>
            <div className={styles.main_wrapper}>
              <div className={styles.product_page_img}>
                <img src={image_url} 
                 alt="" 
                 style={{width:'544px'}} 
                 onMouseEnter={(e) => {
                    // update image size and turn-on magnifier
                    const elem = e.currentTarget;
                    const { width, height } = elem.getBoundingClientRect();
                    setSize([width, height]);
                    setShowMagnifier(true);
                }}
                  onMouseMove={(e) => {
                    const elem = e.currentTarget;
                    const { top, left } = elem.getBoundingClientRect();
                    const x = e.pageX - left;
                    const y = e.pageY - top;
                    setXY([x, y]);
                }}
                  onMouseLeave={() => {
                    setShowMagnifier(false);
                  }}
                />
                <div style={{
                    display: showMagnifier ? "" : "none",
                    position: "absolute",

                    // prevent magnifier blocks the mousemove event of img
                    pointerEvents: "none",
                    // set size of magnifier
                    height: `${magnifierHeight}px`,
                    width: `${magnifieWidth}px`,
                    // move element center to cursor pos
                    top: `${y - magnifierHeight + 210}px`,
                    left: `${x - magnifieWidth / 2}px`,
                    opacity: "1", // reduce opacity so you can verify position
                    border: "1px solid lightgray",
                    backgroundColor: "white",
                    backgroundImage: `url('${image_url}')`,
                    backgroundRepeat: "no-repeat",

                    //calculate zoomed image size
                    backgroundSize: `${imgWidth * zoomLevel}px ${
                      imgHeight * zoomLevel
                    }px`,

                    //calculate position of zoomed image.
                    backgroundPositionX: `${-x * zoomLevel + magnifieWidth /2}px`,
                    backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                  }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default GoodImage
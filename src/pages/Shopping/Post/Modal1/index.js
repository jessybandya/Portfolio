import React, { Component } from "react";
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#88888888" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#88888888" }}
      onClick={onClick}
    />
  );
}


export default class Modal1 extends Component {

  
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div style={{padding:15}}>
      {this?.props?.mealImage?.length === 0 ?(
        <img src="https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982" className="img-fluid" />
      ):(
        <Slider {...settings}>
        {this?.props?.mealImage?.map(room => {
          return (
            <div className="rooms_slider">
                <img src={room?.url} className="img-fluid" />  
            </div>
          );
        })}          
        </Slider>
      )}

      </div>
    );
  }
}
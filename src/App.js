import Physiotherapy from "./images/Physiotherapy.jpg";
import "./App.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';


function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get('city');
   const [dataDoc, setDataDoc] = useState([]);



   const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [cityIP, setCityIP] = useState(city?city:"");
  const [cheifComplaint, setCheifComplaint] = useState("");
  const [preExp, setPreExp] = useState("");



  const [dataTes, setDataTes] = useState([]);

  const handleDoctors = async () => {
    const data = await axios.get(`http://localhost:8080/doctor?city=${city?city:cityIP}`);
    console.log(data);
    setDataDoc(data.data);
  };
  const handleTestiminials = async () => {
    const data = await axios.get("http://localhost:8080/testimonials");
    setDataTes(data.data);
  };

  const HandleBooking=()=>{
    const booking={
      name,
      age,
      city:city?city:cityIP,
      cheifComplaint,
      preExp
    }

  }
  useEffect(() => {
    handleDoctors();
    handleTestiminials();
  }, [cityIP,city]);

  return (
    <div className="App">
      <div
        id="Nav"
        style={{
          display: "flex",
          width: "100%",
          color: "white",
          justifyContent: "space-between",
          margin: "auto",
        }}
      >
        <div>
          <img src="https://www.titancapital.vc/wp-content/uploads/2021/12/fixhealth-1.png" alt="logo" style={{height:"68px"}}></img>
        </div>
        <div className="navHalf">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Book Now
          </button>
        </div>
      </div>
      <div id="content">
        <div
          style={{  
            backgroundImage: `url(${Physiotherapy})`,
            // height: "80vh",
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <div id="BookingForm">
            <form className="formBlock">
              <input type="text" placeholder="Name"onChange={(e)=>{
                setName(e.target.value)
              }}/>
              <input type="number" placeholder="Phone No." onChange={(e)=>{
                setContact(e.target.value)
              }}/>
              <input type="number" placeholder="Age" onChange={(e)=>{
                setAge(e.target.value)
              }}/>
              <input type="text" placeholder="City"value={city} onChange={(e)=>{
                if(!city){setCityIP(e.target.value)}
                  
              }}/>
              <input type="text" placeholder="Chief Complaints" onChange={(e)=>{
                setCheifComplaint(e.target.value)
              }}/>
              <input type="text" placeholder="Any previous experience with physiotherapy" onChange={(e)=>{
                setPreExp(e.target.value)
              }}/>
              <button onClick={HandleBooking}>Submit</button>
            </form>
          
          
          </div>
        </div>
        <div>
          <Carousel responsive={responsive}>
            {dataDoc?.map((elem) => (
              <div id="Therapist">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={elem.img} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{elem.name}</h5>
                    <p className="card-text">{elem.specialization}</p>
                    <p className="card-text">{elem.experience}</p>
                    <p className="card-text">{elem.city}</p>
                    <a href="#" className="btn btn-primary">
                      Know more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <Carousel responsive={responsive}>
          {dataTes?.map((elem) => {
            return (
              <div id="Therapist">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={elem.img} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{elem.name}</h5>
                    <p className="card-text">{elem.doctor}</p>
                    <p className="card-text">{elem.msg}</p>
                    <a href="#" className="btn btn-primary">
                      Know more
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;

import "../src/App.css";
import abi from "./abi.json";
import moment from "moment";
import { useState, useEffect } from "react";
import Web3 from "web3";
function App() {
  const [acc, setacc] = useState("Account is not connected");
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setacc(accounts[0]);
        const contract = new web3.eth.Contract(
          abi,
          "0x8abaDF7e4D45C4BAa1E092ddBa85535D1CB8cd96"
        );
        setState({ web3: web3, contract: contract });
        console.log(state);
      } catch (error) {
        alert("Please Install Metamask");
      }
    };
    init();
  }, []);

  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const donateEth = async () => {
    try {
      console.log("Hii");
      const { contract, web3 } = state;
      const eth = "0.001";
      const weiValue = web3.utils.toWei(eth, "ether");
      const date = moment().format("MMMM Do YYYY, h:mm:ss a");
      await contract.methods
        .DonateMatic(date, name, message)
        .send({ from: acc, value: weiValue, gas: 480000 });
      window.location.reload(false);
    } catch (error) {
      console.log("Bye");
    }
  };

  const [detail, setDetail] = useState("");
  useEffect(() => {
    const { contract } = state;
    const getDetail = async () => {
      const nameText = await contract.methods.getUser().call();
      setDetail(nameText);
      console.log(nameText);
      console.log(nameText[0][0]);
    };
    contract && getDetail();
  }, [state]);
  return (
    <div className="container">
      <section>
        <div class="box1 box">
          <div class="content">
            <div class="image">
              <img
                src="https://i.postimg.cc/bryMmCQB/profile-image.jpg"
                alt="Profile Image"
              />
            </div>
            <div class="level">
              <p>Learning</p>
            </div>
            <div class="text">
              <p class="name">Ayush Dhamankar</p>
              <p class="job_title">Blockchain Developer</p>
              <p class="job_discription">
                Passionate and driven IT student with a love for technology and
                problem-solving. Equipped with a solid foundation in programming
                and web development.
              </p>
            </div>
            <div class="icons">
              <button>
                <ion-icon name="logo-dribbble"></ion-icon>
              </button>
              <button>
                <ion-icon name="logo-instagram"></ion-icon>
              </button>
              <button>
                <ion-icon name="logo-twitter"></ion-icon>
              </button>
              <button>
                <ion-icon name="logo-linkedin"></ion-icon>
              </button>
              <button>
                <ion-icon name="logo-facebook"></ion-icon>
              </button>
              <button>
                <ion-icon name="logo-behance"></ion-icon>
              </button>
            </div>
            <div class="button">
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                style={{
                  height: "40px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  paddingLeft: "15px",
                }}
              />
              <input
                type="text"
                placeholder="Message"
                id="message"
                name="message"
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  height: "40px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                  paddingLeft: "15px",
                }}
              />
              <div>
                <button class="connect" type="button" onClick={donateEth}>
                  Support <br /> (0.001 Matic)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <h1
        class="name"
        style={{
          fontWeight: "bolder",
          fontSize: "40px",
          marginTop: "10px",
          textAlign: "center",
        }}
      >
        Transactions
      </h1>

      <section>
        {detail !== "" &&
          detail.map((detail) => {
            return (
              <div class="box1 box">
                <div class="content">
                  <p class="name">{detail[1]}</p>
                  <p class="job_discription">{detail[2]}</p>
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default App;

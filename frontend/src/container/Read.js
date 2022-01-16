//import logo from './logo.svg';
import './Sea.css';
//import Choose_letter from "./mailbox";
import { Layout, Button } from 'antd';
import {useState} from "react";
//import Read_Reply from "./read";
import Sea from "./Sea";
import mainlogo from "./MSB.png";






function App({username, setSeaorbox}) {
    const [step, setStep] = useState(1);
    const [attr1, setAttr1] = useState("Problem to Solve");
    const [attr2, setAttr2] = useState("2");
    const [attr3, setAttr3] = useState("");

    const { Header, Content, Footer, Sider } = Layout;


    function next(){
        setStep(prev => prev + 1);
    }
    function back(){
        setStep(prev => prev - 1);
    }

    var info = {
        content: 'haha',
        title: 'hello',
        texture: 'texture',
        attr: 'Job'
    }

    var page = (


        <Layout style={{height:'100vh', width:'100vw'}}>
            <Layout>
                <div style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Shaqi_jrvej.jpg/1200px-Shaqi_jrvej.jpg")`,
                    backgroundSize: 'cover'
                }}>
                    <div className="logo" >
                        <img src={mainlogo} width={100}/>
                    </div>
                    <Sea step={step} setStep={setStep} attr1={attr1} attr2={attr2} attr3={attr3} 
                        setAttr1={setAttr1} setAttr2={setAttr2} setAttr3={setAttr3} username = {username} setSeaorbox = {setSeaorbox}/>

                </div>
            </Layout>
        </Layout>


    );

  return (
      <div>
          {page}
      </div>

  );
}

export default App;
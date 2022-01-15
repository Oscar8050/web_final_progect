import logo from './logo.svg';
import './App.css';
import Choose_letter from "./mailbox";
import { Layout, Button } from 'antd';
import {useState} from "react";
import Read_Reply from "./read";
import Alldone from "./Alldone";
import mainlogo from "./MSB.png";






function App() {

    const [step, setStep] = useState(1);
    const [attr1, setAttr1] = useState("1");
    const [attr2, setAttr2] = useState("2");
    const [attr3, setAttr3] = useState("3");

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
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                style={{width:'30vw'}}
            >
                <div className="logo" >
                    <img src={mainlogo} width={100}/>
                </div>

            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 5, height: '18vh' }}>

                </Header>
                <div style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url("https://thumbs.dreamstime.com/b/bottle-message-24928711.jpg")`,
                    backgroundSize: 'cover'
                }}>
                    <Alldone attr1={attr1} attr2={attr2} attr3={attr3} setAttr1={setAttr1} setAttr2={setAttr2} setAttr3={setAttr3}/>
                    <div style={{ textAlign: 'center' }}>Designed by J.T. Hsu ©2021 Web programming final</div>
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

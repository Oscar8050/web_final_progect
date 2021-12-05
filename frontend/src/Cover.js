import logo from './logo.svg';
import './App.css';
import { store_page1 , render_page1 } from './axios.js';
import { useState , useEffect , useRef, useCallback} from 'react';
import App from './App.js';
import React from 'react';
import './write_letter.js';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Space, Card, Button } from 'antd';
import Title from 'antd/lib/skeleton/Title';

var last_choice = "";
var tit= "";
var next = 0;

function get_choice(){
    return {last_choice, tit};
}

function Cover({step, onstep}){
    const [title, setTitle] = useState("");
    const [texture, setTexture] = useState("");
    const [b1, setB1] = useState("solid gray 0px");
    const [b2, setB2] = useState("solid gray 0px");
    const [b3, setB3] = useState("solid gray 0px");
    const [b4, setB4] = useState("solid gray 0px");
    const [b5, setB5] = useState("solid gray 0px");

    const nextstep = useCallback(() => {
        onstep(1)
    }, [onstep])

    const Save_page1 = async (title, tex) => {
        console.log('here')
        const response = await store_page1(title, tex)
        console.log(response)
        if(response == "success"){
            alert("Create successfully!");
            nextstep();
        }
        else{
            alert("Error, please try again");
        }
    }

    const Render_page1 = async() => {
        const response = await render_page1();
        console.log(response)
        if(response != "fail"){
            console.log("success render");
            console.log(response["tit"]);
            if(response["tit"] != "Default title"){
                setTitle(response["tit"]);
                //console.log(title);
            }
            if(response["tex"] != "Default texture"){
                setTexture(response["tex"]);
                if(response["tex"] == "Classic"){
                    setB1("solid rgb(65, 172, 136) 2px");
                }
                else if(response["tex"] == "Old"){
                    setB2("solid rgb(65, 172, 136) 2px");
                }
                else if(response["tex"] == "Real"){
                    setB3("solid rgb(65, 172, 136) 2px");
                }
                else if(response["tex"] == "Capsule"){
                    setB4("solid rgb(65, 172, 136) 2px");
                }
                else if(response["tex"] == "Simple"){
                    setB5("solid rgb(65, 172, 136) 2px");
                }
            }
            console.log({texture, title});
        }
        else{
            console.log("Fail render");
        }
    }

    useEffect(() => {
        Render_page1();
      }, [])

    return (<Space direction="vertical" className="cover">
    <Card title="Choose letter type" style={{ width: '60vw'}} >
    <div style={{display: 'flex'}}>
      <div className="material_pair" style={{border: b1}} onClick={
          () => {
              setTexture("Classic");
              setB1("solid rgb(65, 172, 136) 2px");
              setB2("solid gray 0px");
              setB3("solid gray 0px");
              setB4("solid gray 0px");
              setB5("solid gray 0px");
              last_choice = 1;
        }}>
      <img src="https://previews.123rf.com/images/radugaw/radugaw1804/radugaw180400028/98861413-message-in-the-bottle-cartoon-illustration-.jpg" className="material"/>
      <div className="material_des">Classic</div>
      </div>
      <div className="material_pair" style={{border: b2}} onClick={
          () => {
              setTexture("Old");
              setB2("solid rgb(65, 172, 136) 2px");
              setB1("solid gray 0px");
              setB3("solid gray 0px");
              setB4("solid gray 0px");
              setB5("solid gray 0px");
              last_choice = 2;
        }}>
      <img src="https://thumbs.dreamstime.com/b/message-bottle-color-engraving-vector-sketch-illustration-scratch-board-style-imitation-hand-drawn-image-149614789.jpg" className="material"/>
      <div className="material_des">Old</div>
      </div>
      <div className="material_pair" style={{border: b3}} onClick={
          () => {
              setTexture("Real");
              setB3("solid rgb(65, 172, 136) 2px");
              setB2("solid gray 0px");
              setB1("solid gray 0px");
              setB4("solid gray 0px");
              setB5("solid gray 0px");
              last_choice = 3;
        }}>
      <img src="https://thumbs.dreamstime.com/b/message-bottle-isolated-white-background-d-illustration-135203492.jpg" className="material"/>
      <div className="material_des">Real</div>
      </div>
      <div className="material_pair" style={{border: b4}} onClick={
          () => {
              setTexture("Capsule");
              setB4("solid rgb(65, 172, 136) 2px");
              setB2("solid gray 0px");
              setB3("solid gray 0px");
              setB1("solid gray 0px");
              setB5("solid gray 0px");
              last_choice = 4;
        }}>
      <img src="https://ae01.alicdn.com/kf/HTB1yse0RFXXXXXnXXXXq6xXFXXX1/1Pack-Cute-Message-in-a-Bottle-Message-Capsule-Letter-Love-Pill-Full-Clear-Wish-Bottle-With.jpg" className="material"/>
      <div className="material_des">Capsule</div>
      </div>
      <div className="material_pair" style={{border: b5}} onClick={
          () => {
              setTexture("Simple");
              setB5("solid rgb(65, 172, 136) 2px");
              setB2("solid gray 0px");
              setB3("solid gray 0px");
              setB4("solid gray 0px");
              setB1("solid gray 0px");
              last_choice = 5;
        }}>
      <img src="https://media.istockphoto.com/vectors/message-in-the-bottle-icon-in-cartoon-style-isolated-on-white-vector-id691576404?k=20&m=691576404&s=612x612&w=0&h=1rnieIoTI8ochoP2U-UD_TWd8r-Xk1P-TaDYxilBfaE=" className="material"/>
      <div className="material_des">Simple</div>
      </div>
    </div>
    </Card>
    <p></p>
    <Card title="Insert your letter's title" style={{ width: '60vw' }} >
    <div className="done_create">
    <Input placeholder="Title..." allowClear value={title} onChange={(e) => {setTitle(e.target.value)}} />
    <Button style={{background: 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)'}} 
    onClick={() => {
        console.log(last_choice);
        console.log(title);
        tit = title;
        Save_page1(title, texture);
    }}>Create</Button>
    </div>
    </Card>
  </Space>)
}

/* onClick={() => {
        console.log(last_choice);
        console.log(title);
        tit = title;
        nextstep;
        alert("Create successfully!");
    }}>Create</Button>*/

export {Cover, get_choice};
import logo from './logo.svg';
import './App.css';
import { render_page1 , render_page2 } from './axios.js';
import { useState , useEffect , useRef, useCallback} from 'react';
import App from './App.js';
import React from 'react';
import './write_letter.js';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Space, Card, Button, Select } from 'antd';
import SizeContext from 'antd/lib/config-provider/SizeContext';

function handleChange(value) {
    console.log(`selected ${value}`);
  }

function Alldone(){

    const [art, setArt] = useState("Default content")
    const [title, setTitle] = useState("Default topic")
    const [paper, setPaper] = useState(`url("https://cdn.pixabay.com/photo/2015/02/19/14/16/old-paper-642132_1280.jpg")`);

    const Render_art = async() => {
        const response = await render_page2();
        console.log(response)
        if(response != "fail"){
            console.log("success render");
            if(response != "Default content")
            setArt(response);
        }
        else{
            console.log("Fail render");
        }
    }

    const Render_tit = async() => {
        const response = await render_page1();
        console.log(response)
        if(response != "fail"){
            console.log("success render");
            if(response["tit"] != "Default title")
            setTitle(response["tit"]);
            if(response["tex"] == "Old"){
                setPaper(`url("https://st.depositphotos.com/2086879/2449/i/950/depositphotos_24493081-stock-photo-old-paper.jpg")`);
            }
            else if(response["tex"] == "Simple"){
                setPaper(`url("https://image.shutterstock.com/mosaic_250/1427210/758024551/stock-photo-old-paper-texture-758024551.jpg")`);
            }
            else if(response["tex"] == "Real"){
                setPaper(`url("https://us.123rf.com/450wm/roystudio/roystudio1509/roystudio150900207/44756396-canvas-texture-background-subtle-dot-pattern-a4-format-paper-texture-background.jpg?ver=6")`);
            }
        }
        else{
            console.log("Fail render");
        }
    }

    const { Option } = Select;

    useEffect(() => {
        Render_art();
    }, [])

    useEffect(() => {
        Render_tit();
    }, [])

    return <div className="final">
        <div style={{display: 'flex', flexDirection: 'column'}}>
        <Card title={title} style={{ width: '58vw', height: '49vh',backgroundImage: paper,
      backgroundSize: 'cover', fontFamily: 'Cambria, Cochin, Georgia, Times, Times New Roman, serif' , fontSize: 20}} >
            <div>{art}</div>
        </Card>
        <Card title="Type : Default" style={{ width: '35vw', height: '15vh', marginTop: '3vh'}} >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div>Attached files count : 0</div>
            <div style={{marginLeft: '30px'}}><Button style={{ backgroundColor: 'rgb(40, 176, 40)'}}>Send</Button></div>
            </div>
        </Card>
        </div>
        <Card title="Tag table" style={{ width: '20vw', height: '35vh', marginLeft: 'auto' }} >
            <Select defaultValue="Problem to Solve" style={{ width: '15vw' }} onChange={handleChange}>
            <Option value="Problem to Solve">Problem to Solve</Option>
            <Option value="Sharing Feelings">Sharing Feelings</Option>
            <Option value="disabled" disabled>
                Play Games
            </Option>
            <Option value="Send Data">Send Data</Option>
            </Select>
            <p></p>
            <Select defaultValue="About" style={{ width: '15vw' }} onChange={handleChange}>
            <Option value="About">About</Option>
            <Option value="Job">Job</Option>
            <Option value="School">School</Option>
            <Option value="Relationship">Relationship</Option>
            <Option value="Love">Love</Option>
            <Option value="Family">Family</Option>
            <Option value="Hobbies">Hobbies</Option>
            <Option value="Glossories">Glossories</Option>
            </Select>
            <p></p>
            <Select defaultValue="Attribute" style={{ width: '15vw' }} onChange={handleChange}>
            <Option value="Attribute">Attribute</Option>
            <Option value="Job">Job</Option>
            <Option value="School">School</Option>
            <Option value="Relationship">Relationship</Option>
            <Option value="Love">Love</Option>
            <Option value="Family">Family</Option>
            <Option value="Hobbies">Hobbies</Option>
            <Option value="Glossories">Glossories</Option>
            </Select>
        </Card>
    </div>
}

export default Alldone;
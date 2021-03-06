import './Page1.css';
import { render_page1 , render_page2, send_letter } from './axios.js';
import { useState , useEffect, useCallback} from 'react';
import React from 'react';
import './write_letter.js';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Space, Card, Button, Select } from 'antd';
import SizeContext from 'antd/lib/config-provider/SizeContext';

function Alldone({mode,onmode}){

    const [art, setArt] = useState("Default content")
    const [title, setTitle] = useState("Default topic")
    const [paper, setPaper] = useState(`url("https://cdn.pixabay.com/photo/2015/02/19/14/16/old-paper-642132_1280.jpg")`);
    const [attr1, setAttr1] = useState("Problems to solve");
    const [attr2, setAttr2] = useState("None");
    const [attr3, setAttr3] = useState("None");

    const nextmode = useCallback(() => {
        onmode(0);
        console.log("call back");
    }, [onmode])

    const handleChange = (value, num) => {
        console.log(`selected ${value}`);
        console.log(num);
        if(num === 1){
            setAttr1(value);
        }
        else if(num === 2){
            setAttr2(value);
        }
    }

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

    const send = async(attr1, attr2, attr3) => {
        const response = await send_letter(attr1, attr2, attr3);
        console.log("here");
        if(response == "success"){
            alert("send successfully!");
            nextmode();}
        else{
            alert("error!");
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
        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'left'}}>
        <Card title={title} style={{ width: '58vw', height: '49vh',backgroundImage: paper,
      backgroundSize: 'cover', fontFamily: 'Cambria, Cochin, Georgia, Times, Times New Roman, serif' , fontSize: 20}} >
            <div>{art}</div>
        </Card>
        <Card title="Type : Default" style={{ width: '35vw', height: '15vh', marginTop: '3vh'}} >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <div>Attached files count : 0</div>
            <div style={{marginLeft: '30px'}}><Button style={{ backgroundColor: 'rgb(40, 176, 40)'}} onClick={() => {
                send(attr1, attr2, attr3)}} >Send</Button></div>
            </div>
        </Card>
        </div>
        <Card title="Tag table" style={{ width: '20vw', height: '35vh', marginLeft: 'auto' }} >
            <Select defaultValue="Problem to Solve" style={{ width: '15vw' }} onChange={(value)=>{ handleChange(value,1)}}>
            <Option value="Problem to Solve">Problem to Solve</Option>
            <Option value="Sharing Feelings">Sharing Feelings</Option>
            <Option value="disabled" disabled>
                Play Games
            </Option>
            <Option value="Send Data">Send Data</Option>
            </Select>
            <p></p>
            <Select defaultValue="About" style={{ width: '15vw' }} onChange={(value) => {handleChange(value,2)}}>
            <Option value="About">About</Option>
            <Option value="Job">Job</Option>
            <Option value="School">School</Option>
            <Option value="Relationship">Relationship</Option>
            <Option value="Love">Love</Option>
            <Option value="Family">Family</Option>
            <Option value="Hobbies">Hobbies</Option>
            <Option value="Others">Others</Option>
            </Select>
            <p></p>
            <Card style={{ width: '15vw', height: '10vh'}} >
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-2vh', marginLeft: '-1vw'}}>
                Selfdefined Attribute
            </div>
            <Input style={{ width: '14vw', marginLeft: '-1.5vw'}} placeholder="Attribute..." allowClear value={attr3} onChange={(e) => {setAttr3(e.target.value)}} />
        </Card>
        </Card>
    </div>
}

export default Alldone;
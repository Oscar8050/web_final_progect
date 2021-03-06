import './Page1.css';
import { store_page1 , render_page1 } from './axios.js';
import { useState , useEffect , useCallback} from 'react';
import React from 'react';
import './write_letter.js';
import 'antd/dist/antd.css';
import { Input, Space, Card, Button } from 'antd';

function Cover({step, onstep, usr}){

    const [title, setTitle] = useState("");
    const [texture, setTexture] = useState("");

    /*選取材質的匡線效果 */
    const [b1, setB1] = useState("solid gray 0px");
    const [b2, setB2] = useState("solid gray 0px");
    const [b3, setB3] = useState("solid gray 0px");
    const [b4, setB4] = useState("solid gray 0px");
    const [b5, setB5] = useState("solid gray 0px");

    /*自動跳轉至下一頁 */
    const nextstep = useCallback(() => {
        onstep(1)
    }, [onstep])

    /*儲存材質和標題 */
    const Save_page1 = async (title, tex, usr) => {
        const response = await store_page1(title, tex, usr)
        if(response === "success"){
            alert("Create successfully!");
            nextstep();
        }
        else{
            alert("Error, please try again");
        }
    }

    /*復原版面 */
    const Render_page1 = async(usr) => {
        /*從後端拿回之前存的資料 */
        const response = await render_page1(usr);
        console.log(response)
        if(response !== "fail"){
            console.log("success render");
            if(response["tit"] !== "Default title"){
                setTitle(response["tit"]);
            }
            if(response["tex"] !== "Default texture"){
                setTexture(response["tex"]);
                if(response["tex"] === "Classic"){
                    setB1("solid rgb(65, 172, 136) 2px");
                }
                else if(response["tex"] === "Old"){
                    setB2("solid rgb(65, 172, 136) 2px");
                }
                else if(response["tex"] === "Real"){
                    setB3("solid rgb(65, 172, 136) 2px");
                }
                else if(response["tex"] === "Capsule"){
                    setB4("solid rgb(65, 172, 136) 2px");
                }
                else if(response["tex"] === "Simple"){
                    setB5("solid rgb(65, 172, 136) 2px");
                }
            }
            console.log({texture, title});
        }
        else{
            console.log("Fail render");
        }
    }

    /*載入時自動回覆版面 */
    useEffect(() => {
        Render_page1();
      }, [])

    /*render 畫面 */
    return (
    <Space direction="vertical" className="cover">
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
        }}>
      <img src="https://previews.123rf.com/images/radugaw/radugaw1804/radugaw180400028/98861413-message-in-the-bottle-cartoon-illustration-.jpg" alt="" className="material"/>
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
        }}>
      <img src="https://thumbs.dreamstime.com/b/message-bottle-color-engraving-vector-sketch-illustration-scratch-board-style-imitation-hand-drawn-image-149614789.jpg" alt="" className="material"/>
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
        }}>
      <img src="https://thumbs.dreamstime.com/b/message-bottle-isolated-white-background-d-illustration-135203492.jpg" alt="" className="material"/>
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
        }}>
      <img src="https://ae01.alicdn.com/kf/HTB1yse0RFXXXXXnXXXXq6xXFXXX1/1Pack-Cute-Message-in-a-Bottle-Message-Capsule-Letter-Love-Pill-Full-Clear-Wish-Bottle-With.jpg" alt="" className="material"/>
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
        }}>
      <img src="https://media.istockphoto.com/vectors/message-in-the-bottle-icon-in-cartoon-style-isolated-on-white-vector-id691576404?k=20&m=691576404&s=612x612&w=0&h=1rnieIoTI8ochoP2U-UD_TWd8r-Xk1P-TaDYxilBfaE=" alt="" className="material"/>
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
        Save_page1(title, texture);
    }}>Create</Button>
    </div>
    </Card>
  </Space>)
}

export {Cover};
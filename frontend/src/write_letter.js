import logo from './logo.svg';
import './App.css';
import { store_page2 , render_page2 } from './axios.js';
import { useState , useEffect , useRef, useCallback} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import mainlogo from './MSB.png';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Button } from 'antd';
import { UploadOutlined, UserOutlined, FormOutlined, BookOutlined } from '@ant-design/icons';
/* https://ant.design/components/button/ */

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

function Write_letter({step, onstep}){
    const [article, setArticle] = useState("");
    const nextstep = useCallback(() => {
        onstep(2)
    }, [onstep])

    const Save_page2 = async (art) => {
        const response = await store_page2(art);
        console.log(response);
        if(response == "success"){
            alert("Content saved!");
            nextstep();
        }
        else{
            alert("Error, please try again");
        }
    }

    const Render_page2 = async() => {
        const response = await render_page2();
        console.log(response)
        if(response != "fail"){
            console.log("success render");
            if(response != "Default content")
            setArticle(response);
        }
        else{
            console.log("Fail render");
        }
    }

    useEffect(() => {
        Render_page2();
      }, [])

    var cont = (<div>
        <Content style={{ margin: '40px 50px 0'}}>
          <TextArea className="site-layout-background" rows={16} style={{padding:26, fontSize:'20px'}}
          placeholder="Content:"
          value={article}
          onChange={(e) => setArticle(e.target.value)}>
          </TextArea>
        </Content>
        <Button className="send_buttom" onClick={() => {
            Save_page2(article);
            nextstep();
    }}>Complete</Button>
      </div>)

    return cont;
    
}

export default Write_letter;
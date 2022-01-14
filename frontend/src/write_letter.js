import './App.css';
import { store_page2 , render_page2 } from './axios.js';
import { useState , useEffect , useCallback} from 'react';
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Input, Button } from 'antd';
/* https://ant.design/components/button/ */

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

function Write_letter({step, onstep}){

    const [article, setArticle] = useState("");

    /*自動切換至下一頁 */
    const nextstep = useCallback(() => {
        onstep(2)
    }, [onstep])

    /*儲存版面內容 */
    const Save_page2 = async (art) => {
        const response = await store_page2(art);
        if(response == "success"){
            alert("Content saved!");
            nextstep();
        }
        else{
            alert("Error, please try again");
        }
    }

    /*復原暫存的版面 */
    const Render_page2 = async() => {
        const response = await render_page2();
        if(response != "fail"){
            if(response != "Default content")
                setArticle(response);
        }
        else{
            console.log("render failed");
        }
    }

    useEffect(() => {
        Render_page2();
      }, [])

    /*render畫面 */
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
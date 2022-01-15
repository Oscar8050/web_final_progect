import logo from './logo.svg';
import './App.css';

import { useState , useEffect , useRef, useCallback} from 'react';
import { useQuery} from "@apollo/client";
import App from './App.js';
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Space, Card, Button, Select, Tag } from 'antd';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import {GET_LETTERS_QUERY} from "./graphql";

function handleChange(value) {
    console.log(`selected ${value}`);

}

function Alldone({step, setStep, attr1, attr2, attr3, setAttr1, setAttr2, setAttr3}){

    const [art, setArt] = useState("Please select threes topic that you are interested in")
    const [title, setTitle] = useState("")
    const [paper, setPaper] = useState(`url("https://cdn.pixabay.com/photo/2015/02/19/14/16/old-paper-642132_1280.jpg")`);

    const {data, refetch} = useQuery(GET_LETTERS_QUERY, {variables:{attr1, attr2, attr3}});
    const { TextArea } = Input;
    const { Search } = Input;
    const onSearch = value => console.log(value);

    const { Option } = Select;


    var show = (<>
        {step == 1 ?  <Card title="Select topics you are interested in" style={{ width: '22vw', height: '80vh', marginLeft: 'auto', marginRight: 'auto'}} >
            <Select defaultValue="Problem to Solve" style={{ width: '15vw' }} onChange={(e) => setAttr1(e.key.value)}>
                <Option value="Problem to Solve">Problem to Solve</Option>
                <Option value="Sharing Feelings">Sharing Feelings</Option>
                <Option value="disabled" disabled>
                    Play Games
                </Option>
                <Option value="Send Data">Send Data</Option>
            </Select>
            <div style={{height: '10vh'}}></div>
            <Select defaultValue="About" style={{ width: '15vw' }} onChange={(e) => setAttr2(e.key.value)}>
                <Option value="About">About</Option>
                <Option value="Job">Job</Option>
                <Option value="School">School</Option>
                <Option value="Relationship">Relationship</Option>
                <Option value="Love">Love</Option>
                <Option value="Family">Family</Option>
                <Option value="Hobbies">Hobbies</Option>
                <Option value="Glossories">Glossories</Option>
            </Select>
            <div style={{height: '10vh'}}></div>
            <Card style={{ width: '15vw', height: '10vh'}} >
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: '-2vh', marginLeft: '-1vw'}}>
                    Selfdefined Attribute
                </div>
                <Input style={{ width: '14vw', height: '5vh', marginLeft: '-1.2vw'}} placeholder="Attribute..." allowClear value={attr3} onChange={(e) => {setAttr3(e.target.value)}} />
            </Card>
            <div style={{height: '10vh'}}></div>
            <Button style={{marginLeft: 'auto', marginRight: 'auto'}} onClick={() => {
                refetch();
                if (data){
                    console.log(data);
                    setTitle(data.letters.title);
                    setArt(data.letters.content);
                    setStep(2)

                }}}>Search</Button>
        </Card> : <div className="final">

                <div>
                    <Card title={title} style={{ margin: 'auto', width: '58vw', height: '49vh',backgroundImage: paper,
                        backgroundSize: 'cover', fontFamily: 'Cambria, Cochin, Georgia, Times, Times New Roman, serif' , fontSize: 20}} >
                        {art == 'Please select threes topic that you are interested in' ? <div style={{height: '38vh'}}>{art}</div> : <div style={{overflowY: 'scroll', height: '38vh'}}>{art}</div>}

                    </Card>
                    <TextArea placeholder='Send regards to your new friend' style={{margin: 'auto', width: '58vw', height: '28vh'}} showCount maxLength={200} onChange={e => console.log(e)} />

                    <Button type="dashed" danger size='large'>
                        Cancel
                    </Button>
                    <Button className='reply' type="dashed" size='large'>
                        Send
                    </Button>

                </div>

        </div>}
    </>)

    return show
}

export default Alldone;



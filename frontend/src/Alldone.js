import logo from './logo.svg';
import './App.css';

import { useState , useEffect , useRef, useCallback} from 'react';
import { useQuery} from "@apollo/client";
import App from './App.js';
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Space, Card, Button, Select } from 'antd';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import {GET_LETTERS_QUERY} from "./graphql";

function handleChange(value) {
    console.log(`selected ${value}`);

}

function Alldone({attr1, attr2, attr3, setAttr1, setAttr2, setAttr3}){

    const [art, setArt] = useState("Please select threes topic that you are interested in")
    const [title, setTitle] = useState("")
    const [paper, setPaper] = useState(`url("https://cdn.pixabay.com/photo/2015/02/19/14/16/old-paper-642132_1280.jpg")`);

    const {data, refetch} = useQuery(GET_LETTERS_QUERY, {variables:{attr1, attr2, attr3}});
    const { TextArea } = Input;




    const { Option } = Select;


    return <div className="final">
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Card title={title} style={{ width: '58vw', height: '49vh',backgroundImage: paper,
      backgroundSize: 'cover', fontFamily: 'Cambria, Cochin, Georgia, Times, Times New Roman, serif' , fontSize: 20}} >
                <div style={{overflowY: 'scroll', height: '38vh'}}>{art}</div>
            </Card>
            <Card title="Tag table" style={{ width: '20vw', height: '35vh', marginLeft: 'auto' }} >
                <Select defaultValue="Problem to Solve" style={{ width: '15vw' }} onChange={(e) => setAttr1(e.key.value)}>
                    <Option value="Problem to Solve">Problem to Solve</Option>
                    <Option value="Sharing Feelings">Sharing Feelings</Option>
                    <Option value="disabled" disabled>
                        Play Games
                    </Option>
                    <Option value="Send Data">Send Data</Option>
                </Select>
                <p></p>
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
                <p></p>
                <Select defaultValue="Attribute" style={{ width: '15vw' }} onChange={(e) => setAttr3(e.key.value)}>
                    <Option value="Attribute">Attribute</Option>
                    <Option value="Job">Job</Option>
                    <Option value="School">School</Option>
                    <Option value="Relationship">Relationship</Option>
                    <Option value="Love">Love</Option>
                    <Option value="Family">Family</Option>
                    <Option value="Hobbies">Hobbies</Option>
                    <Option value="Glossories">Glossories</Option>
                </Select>
                <Button onClick={() => {
                    refetch();
                    if (data){
                        console.log(data);
                        setTitle(data.letters.title);
                        setArt(data.letters.content);
                    }}}>Search</Button>
            </Card>


        </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <TextArea style={{width: '58vw', height: '30vh'}} showCount maxLength={100} onChange={e => console.log(e)} />

            <Button type="dashed" size='large' style={{marginLeft: 'auto'}}>
                Send
            </Button>
        </div>




    </div>
}

export default Alldone;



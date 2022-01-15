import React from 'react';
import 'antd/dist/antd.css';
import { Input, Space, Tag, Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { useState }  from 'react';
import './mailbox.css'
import {GET_LETTERS_QUERY} from "./graphql";





function Choose_letter({setAttr1, setAttr2, setAttr3}){




    const { Search } = Input;
    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );
    const onSearch = value => console.log(value);

    const [Categories, setCategories] = useState(['program', 'math', 'English', 'Chinese']);
    const [Choices, setChoices] = useState([]);

    console.log(Categories);
    var test = Categories.map(e => {
        return "1${e}1"
    });
    console.log(test);
    function select(e){
        console.log(e);
        setChoices(prev => [...prev, e]);

    }
    console.log(window.innerWidth);

    return (<div>
        <div className='selected'>
            {Choices.map(e => <Tag closable>{e}</Tag>)}
            <div className='next'>
                <Button type="primary">Next</Button>
            </div>

        </div>
        <div className="searchbox">
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            <ul>
                {Categories.map(e => <li closable onClick={() => select(e)}>{e}</li>)}
            </ul>

        </div>







    </div>);
}

export default Choose_letter;
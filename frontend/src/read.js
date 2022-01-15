import React from 'react';
import { useState } from "react";
import { Button } from 'antd';
import {
    GET_LETTERS_QUERY
} from "./graphql";

function Read_Reply(props) {



    //console.log(props.info)
    const [click, setClick] = useState(0);

    function textedit() {
        console.log(1);
        setClick(1);
    }

    var change = (<>
        {click == 0 ? <Button type="primary" onClick={textedit}>Click to Reply</Button> : <></>}
    </>

    )





    return (<div>
        {props.info.title}<br/>
        {props.info.content}<br/>
        {props.info.attr}<br/>
        {change}

    </div>);

}
export default Read_Reply;
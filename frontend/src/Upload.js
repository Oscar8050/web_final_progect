import React from 'react';
import { useState , useEffect , useRef, useCallback} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Upload, message, Button, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function Push({step, onstep}){

    const nextstep = useCallback(() => {
        onstep(3)
    }, [onstep])

    const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        }
        console.log(info);
    },
    };

    return (
    <div className="upload"> 
    <Card title="Great! It is almost completed! You can upload files here if needed." >
        <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click here to Upload</Button>
        </Upload>
        <p></p>
        <Button className="send_package" onClick={() => {
        alert("Done uploading");
        nextstep();
    }}>Done</Button>
    </Card>
    <p></p>
    </div>
    )
}

export default Push;
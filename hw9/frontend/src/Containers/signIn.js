import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";

const SignIn = ({ me, setMe, setSignedIn, displayStatus }) => (
    <>
        <Title>
            <h1>My Chat Room</h1>
        </Title>
        <Input.Search
            prefix={<UserOutlined />}
            value={me} enterButton="Sign In"
            onChange={(e) => setMe(e.target.value)}
            placeholder="Enter your name"
            size="large" style={{ width: 300, margin: 50 }}
            autoFocus={!me ? true : false}
            onSearch={(name) => {
                if (!name.trim())
                    displayStatus({
                        type: "error",
                        msg: "Missing user name",
                    });
                else setSignedIn(true);
            }}

        />
    </>
);
export default SignIn;

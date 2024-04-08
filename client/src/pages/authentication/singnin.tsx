import {Button, Card, Form, FormProps, Space} from "antd";
import Input from "antd/lib/input/Input";
import Password from "antd/lib/input/Password";
import {Link} from "react-router-dom";
import {PATHS} from "../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, userActions} from "../../slices/userSlice";

type FieldType = {
    email?: string;
    password?: string;
};

function SignIn() {
    const {isLoading} = useSelector(selectUser)
    const dispatch = useDispatch()

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        dispatch(userActions.signIn(values))
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <Card title="SignIn" extra={<Link to={PATHS.SIGNUP}>No account?</Link>} style={{width: 400}}>
        <Form
            name="basic"
            layout="vertical"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Space direction="vertical" style={{width: '100%'}}>
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{required: true, type: 'email', message: 'Please input your email!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Password/>
                </Form.Item>

                <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {isLoading ? '...' : 'Submit'}
                        </Button>
                </Form.Item>
            </Space>
        </Form>
    </Card>
}

export default SignIn
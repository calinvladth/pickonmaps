import {useDispatch, useSelector} from "react-redux";
import {selectUser, signOut} from "../../slices/userSlice";
import {Button, Space} from "antd";

function UserProfile() {
    const {email} = useSelector(selectUser)
    const dispatch = useDispatch()
    return <Space direction="vertical" size="middle">
        <p>User Profile {email}</p>
        <Button onClick={() => dispatch(signOut())}>Logout</Button>
    </Space>
}

export default UserProfile
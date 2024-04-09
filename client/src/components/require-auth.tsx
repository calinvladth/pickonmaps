import {useSelector} from "react-redux";
import {selectUser} from "../slices/userSlice";
import {Navigate, useLocation} from "react-router-dom";
import {PATHS} from "../utils/constants";

function RequireAuth({ children }: { children: JSX.Element }) {
    const {isAuthenticated} = useSelector(selectUser);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={PATHS.SIGNIN} state={{ from: location }} replace />;
    }

    return children;
}


export default RequireAuth
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotePage from "./components/NotePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NotFound from "./components/NotFound";
import 'antd/dist/antd.css'
import ProtectedRoutes from "./components/ProtectedRoutes";
import {useState} from "react";
const App = () => {
    const [token, setToken] = useState(undefined);
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRoutes userToken={token}/>}>
                    <Route path="/notes" element={<NotePage userToken={token} setToken={setToken}/>}/>
                </Route>
               <Route path="/" element={<LoginPage userToken={setToken}/>}/>
               <Route path="/register" element={<RegisterPage/>}/>
               <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}
export default App;
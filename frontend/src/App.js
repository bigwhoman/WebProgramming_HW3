import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotePage from "./components/NotePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NotFound from "./components/NotFound";
import 'antd/dist/antd.css'
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/notes" element={<NotePage/>}/>
                </Route>
               <Route path="/" element={<LoginPage/>}/>
               <Route path="/register" element={<RegisterPage/>}/>
               <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}
export default App;
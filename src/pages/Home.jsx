import imgUrl from '../assets/imgs/Gmail_Logo_512px.png'
import { NavLink } from "react-router-dom"
export function Home() {
    return (
        <section className="home">
            <h1>Welcome to our Gmail Clone</h1>
            <h4>
                This is a simple Gmail clone app built with React.
                It allows you to experience the basic functionality
                of Gmail, such as viewing emails, composing new emails,
                and managing your inbox.
            </h4>
            <NavLink to="/email"><img src={imgUrl} alt="React Logo" /></NavLink>
        </section>
    );
}

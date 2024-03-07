import { NavLink } from "react-router-dom"

export function AppHeader() {

    return (
        <header className="app-header">
            <section className="container">
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/inbox">Email</NavLink>
                </nav>
            </section>
        </header>
    )
}

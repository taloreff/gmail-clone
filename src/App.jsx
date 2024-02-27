import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { AboutUs } from './pages/AboutUs'
import { EmailIndex } from './pages/EmailIndex'
import { AppHeader } from './cmps/AppHeader'

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/email" element={<EmailIndex />} />
                </Routes>
            </section>
        </Router>
    )
}
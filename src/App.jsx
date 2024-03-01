import { Route, HashRouter as Router, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { AboutUs } from './pages/AboutUs'
import { EmailIndex } from './pages/EmailIndex'
import { AppHeader } from './cmps/AppHeader'
import { EmailDetails } from './pages/EmailDetails'

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/email" element={<EmailIndex />} />
                    <Route path='/email/:emailId' element={<EmailDetails />}></Route>
                </Routes>
            </section>
        </Router>
    )
}
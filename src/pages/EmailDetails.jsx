import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import { emailService } from "../services/email.service";
import { EmailStar } from "../cmps/EmailStar";

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
        } catch (err) {
            navigate('/email')
            console.log('Error in loademail', err)
        }
    }

    console.log('params', params)
    if (!email) return <div>Loading..</div>
    return (
        <section className="email-details">
            <Link className="email-details-back" to="/email">⬅</Link>
            <h1 className="email-details-subject">{email.subject}</h1>
            <div className="email-sub-details">
                <h2 className="email-details-from">{email.from}</h2>
                <h2 className="email-details-to">{email.to}</h2>
                <span className="email-details-sent-at">{email.sentAt}</span>
                <EmailStar className="email-details-star" isStarred={email.isStarred} />
            </div>
            <h2 className="email-details-body">{email.body}</h2>
            <div className="email-details-footer">
                <button>↩︎ Reply</button>
                <button>↪︎ Forward</button>
            </div>
        </section>
    )
}


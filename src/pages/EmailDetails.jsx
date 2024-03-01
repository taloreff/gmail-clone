import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

import { emailService } from "../services/email.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


// import { EmailStar } from "../cmps/EmailStar";

// Problem with passing props in the link, so cant pass functions such as handleStarClick onUpdateEmail

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

    function formatTimestamp(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date(timestamp);
        const diffTime = Math.abs(currentDate - targetDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        // If it's today
        if (currentDate.toDateString() === targetDate.toDateString()) {
            return targetDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ' (Today)';
        }
        // If it's less than 30 days ago
        else if (diffDays < 30) {
            const timeAgo = diffDays === 1 ? 'day ago' : 'days ago';
            return targetDate.toLocaleString('en-US', options) + ` (${diffDays} ${timeAgo})`;
        }
        // If it's more than 30 days ago
        else {
            return targetDate.toLocaleString('en-US', options);
        }
    }





    if (!email) return <div>Loading..</div>
    return (
        <section className="email-details">
            <div className="email-details-top">
                <span>
                    <Link className="email-details-back" to="/email"><FontAwesomeIcon icon={faArrowLeft} /></Link>
                </span>
                <h1 className="email-details-subject">{email.subject}</h1>
            </div>
            <div className="email-sub-details">
                <div>
                    <h2 className="email-details-from">{email.from}</h2>
                    <h2 className="email-details-to">{email.to}</h2>
                </div>
                <div>
                    <span className="email-details-sent-at">{formatTimestamp(email.sentAt)}</span>
                    {/* <EmailStar className="email-details-star" />*/}
                </div>
            </div>
            <h2 className="email-details-body">{email.body}</h2>
            <div className="email-details-footer">
                <button>↩︎ Reply</button>
                <button>↪︎ Forward</button>
            </div>
        </section>
    )
}


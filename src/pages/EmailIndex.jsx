import { useEffect, useState } from "react"
import { emailService } from '../services/email.service'
import { EmailList } from "../cmps/EmailList";
import { EmailNav } from "../cmps/EmailNav";

export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy)
            setEmails(emails)
        } catch (error) {
            console.log('Error in loadEmails', error)
        }
    }

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    async function onRemoveEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(prevEmails => {
                return prevEmails.filter(email => email._id !== emailId)
            })
        } catch (error) {
            console.log('Error in onRemoveEmail', error)
        }
    }

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email)
            setEmails(prevEmails => prevEmails.map(currEmail => currEmail._id === updatedEmail._id ? updatedEmail : currEmail))
        } catch (error) {
            console.log('Error in onUpdateEmail')
        }
    }

    if (!emails) return <div>Loading..</div>

    return (
        <section className="email-index">
            <EmailNav filterBy={filterBy} onSetFilter={onSetFilter} />
            <div className="list-container">
                <EmailList
                    emails={emails}
                    onRemoveEmail={onRemoveEmail}
                    onUpdateEmail={onUpdateEmail} />
            </div>
        </section>
    )
}
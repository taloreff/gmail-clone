import { useEffect, useState } from "react"
import { Outlet, useLocation, useParams } from "react-router-dom";

import { emailService } from '../services/email.service'

import { EmailList } from "../cmps/EmailList";
import { EmailNav } from "../cmps/EmailNav";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { UserActions } from "../cmps/UserActions";

export function EmailIndex() {
    const location = useLocation()
    const params = useParams()

    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter(location.pathname))

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    useEffect(() => {
        onSetFilter(emailService.getDefaultFilter())
    }, [params.mailStatus])

    async function loadEmails() {
        try {
            const emails = await emailService.query({ ...filterBy, status: params.mailStatus })
            setEmails(emails)
        } catch (error) {
            console.log('Error in loadEmails', error)
        }
    }

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    async function onRemoveEmail(currEmail) {
        try {
            await emailService.save({ ...currEmail, removedAt: true })
            setEmails(prevEmails => {
                return prevEmails.filter(email => email._id !== currEmail._id)
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
            <EmailFolderList onSetFilter={onSetFilter} />
            <UserActions />
            {params.emailId && <Outlet />}
            {!params.emailId && <div className="list-container">
                <EmailList
                    emails={emails}
                    onRemoveEmail={onRemoveEmail}
                    onUpdateEmail={onUpdateEmail}
                />
            </div>}

        </section>
    )
}
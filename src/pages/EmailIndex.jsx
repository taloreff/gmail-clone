import { useEffect, useState } from "react"
import { Outlet, useParams, useSearchParams } from "react-router-dom";

import { emailService } from '../services/email.service'

import { EmailList } from "../cmps/EmailList";
import { EmailNav } from "../cmps/EmailNav";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { UserActions } from "../cmps/UserActions";
import { EmailCompose } from "../cmps/EmailCompose";
import { eventBusService } from "../services/event-bus.service";

export function EmailIndex() {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))

    useEffect(() => {
        updateSearchParams(filterBy)
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
            eventBusService.emit('show-user-msg', { type: 'success', txt: 'Email removed successfully' })
        } catch (error) {
            console.log('Error in onRemoveEmail', error)
            eventBusService.emit('show-user-msg', { type: 'error', txt: 'Email was not removed successfully' })
        }
    }

    async function onUpdateEmail(email) {
        try {
            const updatedEmail = await emailService.save(email)
            setEmails(prevEmails => prevEmails.map(currEmail => currEmail._id === updatedEmail._id ? updatedEmail : currEmail))
            eventBusService.emit('show-user-msg', { type: 'success', txt: 'Email updated successfully' })
        } catch (error) {
            console.log('Error in onUpdateEmail')
            eventBusService.emit('show-user-msg', { type: 'error', txt: 'Email was not updated successfully' })
        }
    }

    function updateSearchParams(updatedParams) {
        const sanitizedFilterBy = {};
        for (const field in updatedParams) {
            if (updatedParams[field] !== "" && updatedParams[field] !== null) {
                sanitizedFilterBy[field] = updatedParams[field];
            }
        }
        setSearchParams(sanitizedFilterBy);
    }

    if (!emails) return <div>Loading..</div>
    return (
        <section className="email-index">
            <EmailNav filterBy={filterBy} onSetFilter={onSetFilter} />
            <EmailFolderList filterBy={filterBy} updateSearchParams={updateSearchParams} emails={emails} />
            <UserActions />
            {params.emailId && <Outlet />}
            {!params.emailId && <div className="list-container">
                <EmailList
                    onSetFilter={onSetFilter}
                    filterBy={filterBy}
                    emails={emails}
                    onRemoveEmail={onRemoveEmail}
                    onUpdateEmail={onUpdateEmail}
                />
            </div>}
            {searchParams.getAll('compose').length && <EmailCompose />}
        </section>
    )
}
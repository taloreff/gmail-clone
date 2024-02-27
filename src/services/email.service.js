import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter
}

const STORAGE_KEY = 'emails'

_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        var { subject, body, from, to } = filterBy
        emails = emails.filter(
            email => email.subject.toLowerCase().includes(subject.toLowerCase())
                || email.from.toLowerCase().includes(from.toLowerCase())
                || email.from.toLowerCase().includes(body.toLowerCase())
                || email.to.toLowerCase().includes(to.toLowerCase())
        )
    }
    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    console.log(emailToSave._id)
    if (emailToSave._id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function createEmail(subject = '', body = '', isRead, isStarred, sentAt, removedAt, from, to) {
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        to
    }
}

function getDefaultFilter() {
    return {
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: null,
        removedAt: null, //for later use
        from: '',
        to: ''
    }
}

function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            {
                _id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                type: 'Cooking',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e102',
                subject: 'Dropbox - Last weeks update',
                body: 'Heres what happened in your shared folders last week',
                type: 'Software',
                isRead: true,
                isStarred: true,
                sentAt: 1551133930598,
                removedAt: null,
                from: 'popo@popo.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e103',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930599,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}





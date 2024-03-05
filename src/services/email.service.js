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

// const loggedinUser = {
//     email: 'user@appsus.com',
//     fullname: 'Mahatma Appsus'
// }

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
                body: `סטודנטים יקרים שלום רב,
שמי ד"ר אליהו חלסצ'י, חבר סגל בבית הספר למדעי המחשב. את הקורס תכנות פונקציונאלי חיברתי מתוך מטרה להכיר לכם פרדיגמת תכנות שונה ומיוחדת - פרדיגמה שבשנים האחרונות התעשייה עושה שימוש די נרחב.  זה לא פת"מ, זה קורס שבשנה שיראה לכם כקורס קליל וכיפי שמרחיב את הדעת. הקורס מועבר במתכנות מקוונת (מוק). עליכם להגיש פרויקט נחמד שנבדק בצורה אוטומטית במערכת הבדיקות ומהווה 100% מהציון. קל ופשוט :)

אני מאחל לכם סמסטר מועיל ופורה . בהצלחה!`,
                type: 'Cooking',
                isRead: false,
                isStarred: false,
                sentAt: 1709244000000,
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
                sentAt: 1551000000000,
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
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e104',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e105',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e106',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e107',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e108',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e109',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e110',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e111',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e112',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e113',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e114',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e115',
                subject: 'Last Email - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1551133930594,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}





import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    getFilterFromParams,
}

const STORAGE_KEY = 'emails'



_createEmails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        var { subject, body, from, to, status, isRead } = filterBy
        emails = emails.filter(
            email => email.subject.toLowerCase().includes(subject.toLowerCase())
                || email.from.toLowerCase().includes(from.toLowerCase())
                || email.body.toLowerCase().includes(body.toLowerCase())
                || email.to.toLowerCase().includes(to.toLowerCase())
        )
        emails = filterByFolder(emails, status)
        emails = filterBySelect(emails, isRead)
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
        isRead: null,
        isStarred: false,
        sentAt: null,
        removedAt: null, //for later use
        from: '',
        to: ''
    }
}

function filterByFolder(emails, status) {
    switch (status) {
        case 'inbox':
            return emails.filter(email => email.to === loggedinUser.email && !email.removedAt && email.sentAt)
        case 'sent':
            return emails.filter(email => email.from === loggedinUser.email && !email.removedAt)
        case 'starred':
            return emails.filter(email => email.isStarred && !email.removedAt)
        case 'drafts':
            return emails.filter(email => !email.sentAt && !email.removedAt)
        case 'trash':
            return emails.filter(email => email.removedAt)
    }
}

function filterBySelect(emails, isRead) {
    switch (isRead) {
        case true:
            return emails.filter(email => email.isRead)
        case false:
            return emails.filter(email => !email.isRead)
        default:
            return emails
    }
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    return filterBy
}

function sortEmails(emails) {
    return emails.sort((a, b) => b.sentAt - a.sentAt)
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
                sentAt: 1649584000000,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e102',
                subject: 'Dropbox - Last weeks update',
                body: 'Heres what happened in your shared folders last week',
                type: 'Software',
                isRead: true,
                isStarred: true,
                sentAt: 1646544000000,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e103',
                subject: 'LinkedIn - See Ronis and other people connections',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1646544000000,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e104',
                subject: 'Networking Opportunities Await!',
                body: 'Hello! Your networking opportunities await you. Connect with others and explore new possibilities. Start here!',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1645616400000,
                removedAt: null,
                from: 'user@appsus.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e105',
                subject: 'Important Update Regarding Your Connections',
                body: 'Hi, We have an important update regarding your connections. Please take a moment to review and stay informed.',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: null,
                removedAt: true,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e106',
                subject: 'Your Networking Potential',
                body: 'Hello, Its time to unlock your networking potential! Explore profiles and start meaningful conversations today.',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1646457600000,
                removedAt: true,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e107',
                subject: 'Expand Your Horizons',
                body: 'Hi there! Expand your horizons with new connections. Discover exciting opportunities and possibilities ahead.',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1646371200000,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e108',
                subject: 'Start Conversations Today!',
                body: 'Hello! Start meaningful conversations today with new connections. Take the first step towards new opportunities.',
                type: 'Software',
                isRead: false,
                isStarred: true,
                sentAt: 1646284800000,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e109',
                subject: 'Wellness Check-In',
                body: 'Check out their profiles and start a conversation',
                type: 'Software',
                isRead: false,
                isStarred: true,
                sentAt: 1646198400000,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e110',
                subject: 'amazon.co.uk: Sign-in',
                body: 'Tal Oreff,Someone signed-in to your account.',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1646198400000,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e111',
                subject: 'שבוע השל הפתעות מאגודת הסטודנטים.ות!',
                body: 'סטודנטים.ות יקרים.ותכמו תמיד, ריכזנו כאן עבורכם.ן את כל העדכונים החשובים כדי לוודא שלא פספסתם.ן כלום!',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1646112000000,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e112',
                subject: 'Tal, you have a promo 🎉',
                body: 'Enjoy 35% off your rides this week',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1646112000000,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e113',
                subject: 'Don’t forget to review your recent purchase!',
                body: 'Earn $1 instant Rewards Credit per review! Your honest opinions on each product will help other customers like you.Then, redeem these Rewards INSTANTLY like cash on your next purchase.',
                type: 'Software',
                isRead: false,
                isStarred: true,
                sentAt: 1646112000000,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e114',
                subject: 'Your Jam was seen',
                body: 'Your Jam was seen! Your Jam from today was just viewed for the first time. 🥭 Somebody intuits a prophecy from this bug report.',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1646112000000,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
            {
                _id: 'e115',
                subject: 'קוד הגישה הזמנית שלך לNetflix',
                body: 'קיבלנו בקשה לקוד גישה זמנית מהמכשיר שמופיע למטה.',
                type: 'Software',
                isRead: false,
                isStarred: false,
                sentAt: 1646112000000,
                removedAt: null,
                from: 'toto@toto.com',
                to: 'user@appsus.com'

            },
        ]
        sortEmails(emails)
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}





import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { emailService, loggedinUser } from '../services/email.service';
export function EmailCompose() {
    const navigate = useNavigate()
    const params = useParams()
    const [form, setForm] = useState(emailService.createEmail())

    const [composeState, setComposeState] = useState({
        view: '',
        style: {},
        textAreaRows: 20
    });


    useEffect(() => {
        const saveDraftTimeout = setTimeout(async () => {
            await emailService.save(form);
        }, 5000);

        return () => clearTimeout(saveDraftTimeout);
    }, [form])


    async function onSubmit(ev) {
        ev.preventDefault();
        const updatedForm = { ...form, from: loggedinUser.email, sentAt: new Date() };
        await emailService.save(updatedForm);
        navigate(-1);
    }



    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        value = type === 'number' ? +value : value
        setForm(prev => ({ ...prev, [field]: value }))

    }

    function handleMaximizeClick() {
        const nextState = composeState.view === '' ? {
            view: 'fullscreen',
            style: maximizeStyle,
            textAreaRows: 42
        } : {
            view: '',
            style: {},
            textAreaRows: 20
        };
        setComposeState(nextState);
    }

    function handleMinimizeClick() {
        setComposeState({
            view: 'minimize',
            style: minimizeStyle,
            textAreaRows: 0
        });
    }

    async function handleCloseCompose() {
        if (form.subject || form.body) {
            await emailService.save(form)
        }
        navigate(-1)
    }

    const minimizeStyle = {
        width: '260px',
        height: '40px',
        position: 'absolute',
        top: 'auto',
        left: 'auto',
        right: '56px',
        bottom: 0,
        margin: 0
    }

    const maximizeStyle = {
        maxWidth: '1345px',
        width: '1209px',
        top: '40px',
        left: '0',
        right: '0',
        bottom: '50%',
        margin: 'auto'
    }

    const backgroundMaxStyle = {
        backgroundColor: 'rgba(0,0,0,.5)',
        height: '100%',
        left: '0',
        position: 'absolute',
        top: '0',
        width: '100%',
        zIndex: '6'
    }

    return (
        <div className='email-compose' style={composeState.view === 'fullscreen' ? backgroundMaxStyle : {}} >
            <div className='email-compose-container' style={composeState.style}>
                <div className='header-container'>
                    <header>New Message</header>
                    <button onClick={handleMinimizeClick}>
                        <span className="material-symbols-outlined">
                            minimize
                        </span>
                    </button>
                    <button onClick={handleMaximizeClick}>
                        <span className="material-symbols-outlined">
                            {composeState.view === "fullscreen" ? 'close_fullscreen' : 'open_in_full'}
                        </span>
                    </button>
                    <button onClick={handleCloseCompose}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </button>
                </div>
                <form action="" onSubmit={(ev) => onSubmit(ev)}>
                    <label htmlFor="to" >
                        <input required type="text" onChange={handleChange}
                            name='to' value={form.to} placeholder='To' />
                    </label>
                    <hr />
                    <label htmlFor="subject">
                        <input required type="text" onChange={handleChange}
                            name='subject' value={form.subject} placeholder='Subject' />
                    </label>
                    <hr />

                    <textarea required name="body" onChange={handleChange}
                        id="" cols="100" value={form.body} rows={composeState.textAreaRows}></textarea>
                    <div>
                        <button className='send'>Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
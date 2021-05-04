document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.onsubmit = function (event) {
        event.preventDefault();
        const recipients = document.querySelector('#compose-recipients').value;
        const subject = document.querySelector('#compose-subject').value;
        const body = document.querySelector('#compose-body').value;
        fetch('/emails', {
            method: 'POST',
            body: JSON.stringify({
                recipients: recipients,
                subject: subject,
                body: body
            })
        })
        .then(response => response.json())
        .then(result => {
            const message = document.querySelector('#message');
            if(result.message == "Email sent successfully."){
                message.className = '';
                message.style.display = 'none';
                message.innerHTML = '';
                load_mailbox('sent');
            } else{
                message.className = 'alert alert-danger';
                message.style.display = 'block';
                message.innerHTML = `${result.error}`;
            }
        });
    }
});
const verifyEmail = (user, verifyUrl) => {
    return `<h1>Hi ${user.firstname}!</h1>
    <h3>Thank you for registering at WORKOUT TRACKER.</h3>
    <p>Please click the link below to verify your email address or copy and paste the link into your browser.</p>
    <a href=${verifyUrl}>${verifyUrl}</a>
    <p>Thank you ❤.</p>`;
}

module.exports = verifyEmail;
This is the SMARTLEAD assignment done by ANEKET

**How to use**

- git clone the repository
- run npm install
- fill .env file with your configuration credentials
- make a smartlead database in your postgres database
- run npm start
- go to : http://localhost:3000/api-docs to access the APIs through swagger

API Endpoints:
save user data in DB : http://localhost:3000/api/v1/user-details
get a particular user data from DB  :  http://localhost:3000/api/v1/user-details/1
send mail by a particular user : http://localhost:3000/api/v1/send-mail/1

Features implemented
- When a user clicks save it should send this data to the backend and store the fields within a database
- Page 2 should contain a to email address field, subject input field, a main email input field
- All should have validation to prevent empty data being submitted
- When clicked the subject line and email body should be sent to the backend along with the “to” email address
- An email should be sent “from” the email address captured in the first page “to” the `to` email captured in the second page containing the subject line as well as email body
- Show an error message if the email account details in the first page are wrong and can’t be authenticated
- Add a CC or BCC email to vaibhav@five2one.com.au
- Validate the “to” email address on the UI
- POSTGRES SQL used
- Comments attached
- Backend build in Nodejs


Highlights
- Swagger used for OpenAPI documentation and testing APIs
- Error handling middlewares 
- Validation at server for all input request fields like emails, usernames etc
- Arrays used to handle multiple recipients of to_email, cc and bcc
- Enums used to handle encryption options of SSL ,TLS and None
- Encryption of Password before saving to DB and Decryption after fetching from DB in order to send in nodemailer
- Foreign key relation of User table to Email table as one user can send multiple mails 
- if cc or bcc empty then automaically 'vaibhav@five2one.com.au' added to the recipient list
- used array destructuring to pass emails as strings to nodemailer for multiple recepients
- env file to make the credentials and algorithm platform independent 




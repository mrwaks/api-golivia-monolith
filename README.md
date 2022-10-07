# **GOLIVIA API V1 DOCUMENTATION**

*This API is intended for developers, to allow them to submit forms without coding a backend. <br>
This type of tool intended for front-end developers, as well as for back-end developers wishing to develop a simplistic application, already exists... <br>
but most of them have a lot of security flaws.
These security issues are: <br>*

1. <ins>**No DNS check is performed:**</ins>
    
    This allows an attacker, among other things, to usurp the origin (domain name) of anyone.
2. <ins>**Ability to override a reCaptcha:**</ins>

    This is possible by going either through a custom script with an api call on the form submission route, or directly from the devtools console.

3. <ins>**Very accessible spam:**</ins>

    APIs are accessible through simple script in fetch/axios request. <br>
    Thanks to certain sites like "https://builtwith.com/", it is quite possible to find all the sites and all the applications using a certain tool. <br>
    From there, we can retrieve the link (containing the personal identifier) used to submit the form, from any site using the API. <br>
    And therefore to create a simple DoS script, see DDoS using tools like Jmeter or Locust <br> 
    which are open-source and which can make it possible to do a lot of damage on both sides <br>
    (flood of mailbox on the user side, server crash/slow server on admin side).

4. <ins>**No control of string lengths:**</ins>

    The majority do not control the length of strings. <br>
    This can be a risk of loss of reliability on the deliveries on the SMTP side. <br>
    On the other hand, some sites offering this tool, set up the possibility of reading submitted emails, <br>
    directly from their site, which confirms that the emails are recorded in their database. <br>
    This allows, you will have understood, DoS and DDoS the admin server.

<br>

This API is developed, not with the aim of copying what has already been done, <br>
but to improve user security, improve response performance and offer some nice features by the way :)




### <ins>**For Testing, Run:**</ins>

    npm run test

## <ins>**Account Registration:**</ins>
<ins>***Registration is done in two steps:***</ins>

1. Registration request with a valid email, and sending an email with a verification code.

    <ins>**ROUTES:**</ins>

    - /api/v1/signup/step1:

        Here we make a request to the API with a valid email as data, <br>
        and receive in return a verification code by email.

        - <ins>METHOD:</ins> POST.
        - <ins>INPUTS:</ins>
            - accountEmail: type string.
        - <ins>STATUS CODE:</ins>
            - 200: OK, Verification code sent by email.
            - 400: Bad Request.
            - 409: Conflict.
            - 500: Internal Server Error.
<br><br>            

2. Verification of the code, edition of the password and creation of the account.

    <ins>**ROUTES:**</ins>

    - /api/v1/verification-code:

        Here we verify our verification code. <br>
        Then the api returns a key and the timestamp of the creation of the verification code. <br>
        These two elements are to be saved in the localStorage. <br>
        - The key is will be used at the last registration stage to retrieve the email associated with the first registration request.
        - The timestamp is used to calculate the expiration time of the verification code which is: "5 minutes". <br>
        It also allows if desired, in the event that a user leaves the page (inadvertently or not), to return to the second registration step.

            - <ins>METHOD:</ins> POST.
            - <ins>INPUTS:</ins>
                - verifCode: type string.
            - <ins>STATUS CODE:</ins>
                - 200: OK, Return elements used for the second registration step.
                - 400: Bad Request.
                - 500: Internal Server Error.

    - /api/v1/signup/step2:

        Here we enter the encrypted verification code (saved in the localStorage), <br>
        as well as two passwords which must be identical, and containing at least 10 characters as well as at least <br> 
        one uppercase letter, one lowercase letter, one number and one special character.

        - <ins>METHOD:</ins> POST.
        - <ins>INPUTS:</ins>
            - verifCodeEncrypted: type string.
            - password1: type string.
            - password2: type string.
        - <ins>STATUS CODE:</ins>
            - 201: OK, Account Created.
            - 400: Bad Request.
            - 409: Conflict.
            - 500: Internal Server Error.
            
## <ins>**Account Authentication:**</ins>
The connection is validated using email and password. <br>
Once the connection is validated, a session is created to keep the session active. <br>
Then different routes will have different "ADMIN" or "USER" permissions. <br>
Some routes will have different permissions like "ADMIN" or "USER". <br>
To access these routes with different "ADMIN" or "USER" type permissions, an authentication will check the session cookie, created during the connection. <br>
To disconnect, you must obviously be connected beforehand. <br>

1. <ins>**LOGIN:**</ins>
- /api/v1/account/login:

    - <ins>METHOD:</ins> POST.
    - <ins>INPUTS:</ins>
        - accountEmail: type string.
        - password: type string.
    - <ins>STATUS CODE:</ins>
        - 200: OK.
        - 400: Bad Request.
        - 401: Unauthorized.

2. <ins>**LOGOUT:**</ins>
- /api/v1/account/logout:

    - <ins>METHOD:</ins> GET.
    - <ins>STATUS CODE:</ins>
        - 200: OK.
        - 400: Bad Request.
        - 401: Unauthorized.
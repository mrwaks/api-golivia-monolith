# **GOLIVIA API V1 DOCUMENTATION**

## <ins>**Account Registration:**</ins>
<ins>***Registration is done in two steps:***</ins>

1. Registration request with a valid email, and sending an email with a verification code.

    <ins>**ROUTES:**</ins>

    - /api/v1/signup/step1:

        Here we make a request to the API with a valid email as data, <br>
        and receive in return a verification code by email.

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

        - <ins>INPUTS:</ins>
            - verifCodeEncrypted: type string.
            - password1: type string.
            - password2: type string.
        - <ins>STATUS CODE:</ins>
            - 201: OK, Account Created.
            - 400: Bad Request.
            - 409: Conflict.
            - 500: Internal Server Error.
            


"use strict";

const regexp = {
    /**
     * Check xss entries.
     */
    xssDetect: /< *[a-zA-Z]* *.*>[ \n\w\d\S]*< *\/ *[a-zA-Z]* *>|< *[a-zA-Z]* *.*>[ \n\w\d\S]*/,
    /**
     * Check if is a valid verification code
     */
    isValidCode: /^\d{6}$/,
    /**
     * Check if is a valid password
     */
    isValidPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$€£%^&*-]).{10,}$/,
};

export default regexp;
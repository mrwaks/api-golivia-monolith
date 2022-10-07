"use strict";

// Npm Modules
import MailosaurClient from "mailosaur";

// Config
import config from "./config";

const mailosaur = new MailosaurClient(config.mailosaur.apiKey);

export default mailosaur;
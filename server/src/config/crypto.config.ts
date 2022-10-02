"use strict";

// Custom Modules
import Krypto from "../modules/krypto.module";

// Config
import config from "../config";

const crypto = new Krypto(config.environmentVariables.crypto.key);

export default crypto;
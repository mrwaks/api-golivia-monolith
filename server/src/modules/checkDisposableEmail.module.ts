"use strict";

const disposableEmails = [
    "yopmail.com", "yopmail.fr", "yopmail.net",
    "@cool.fr.nf", "@jetable.fr.nf", "@courriel.fr.nf",
    "@moncourrier.fr.nf", "@monemail.fr.nf", "@monmail.fr.nf",
    "@hide.biz.st", "@mymail.infos.st", "maildrop.cc", "dispostable.com",
    "tempr.email", "discard.email", "discardmail.com",
    "discardmail.de", "spambog.com", "spambog.de",
    "spambog.ru", "0815.ru", "knol-power.nl",
    "freundin.ru", "smashmail.de", "s0ny.net",
    "lajoska.pe.hu", "1mail.x24hr.com", "from.onmypc.info",
    "now.mefound.com", "mowgli.jungleheart.com", "cr.cloudns.asia",
    "tls.cloudns.asia", "msft.cloudns.asia", "b.cr.cloudns.asia",
    "ssl.tls.cloudns.asia", "sweetxxx.de", "dvd.dns-cloud.net",
    "dvd.dnsabr.com", "bd.dns-cloud.net", "yx.dns-cloud.net",
    "shit.dns-cloud.net", "shit.dnsabr.com", "eu.dns-cloud.net",
    "eu.dnsabr.com", "asia.dnsabr.com", "8.dnsabr.com",
    "pw.8.dnsabr.com", "mm.8.dnsabr.com", "23.8.dnsabr.com",
    "pw.epac.to", "postheo.de", "sexy.camdvr.org",
    "888.dns-cloud.net", "adult-work.info", "trap-mail.de",
    "m.cloudns.cl", "you.has.dating", "t.woeishyang.com",
    "badlion.co.uk", "fshare.ootech.vn", "pflege-schoene-haut.de",
    "mails.v2-ray.net", "mail.a1.wtf", "streamboost.xyz",
    "okmail.p-e.kr", "geekpro.org", "hotbird.giize.com",
    "as10.ddnsfree.com", "tempmail-1.net", "tempmail-2.net",
    "tempmail-3.net", "tempmail-4.net", "tempmail-5.net",
    "disposable-1.net", "disposable-2.net", "disposable-3.net",
    "disposable-4.net", "mpszcsoport.xyz", "mehr-bitcoin.de",
    "hepsicrack.cf", "edukansassu12a.cf", "a1b2.cloudns.ph",
    "temp.kasidate.me", "wacamole.soynashi.tk", "temp69.email",
    "virustoaster.com", "so4ever.codes", "a.z9.cloudns.nz",
    "z9.z9.cloudns.nz", "try.z9.cloudns.nz", "mailcatch.com",
    "ordinarybzi.com", "mailexpire.com", "mailnesia.com",
    "armyspy.com", "cuvox.de", "dayrep.com",
    "einrot.com", "fleckens.hu", "gustr.com",
    "jourrapide.com", "rhyta.com", "superrito.com",
    "teleworm.us", "ci.mintemail.com", "mintemail.com"
];

const isDisposableEmail = (email: string) => {
    return new Promise((resolve, _) => {
        let isDisposableEmail: string[] = [];
        for (const disposableEmail of disposableEmails) {
            if (email.endsWith(disposableEmail)) {
                isDisposableEmail.push(disposableEmail);
                break;
            }
        }
        return resolve(isDisposableEmail.length > 0);
    });
};

export default isDisposableEmail;
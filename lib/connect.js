const { WAConnection } = require("@adiwajshing/baileys")
const chalk = require('chalk')
const fs = require("fs")

const sanz = new WAConnection()
exports.sanz = sanz

exports.connect = async() => {
    console.log(chalk.whiteBright('>    [ LOG ]'))
    let auth = './session.json'
    sanz.logger.level = 'warn'
    sanz.on("qr", () => {
        console.log(`Qr ready, scan`)
    })
    fs.existsSync(auth) && sanz.loadAuthInfo(auth)
    sanz.on('connecting', () => {
        console.log(chalk.whiteBright(">"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright("Connecting..."))
    })
    sanz.on('open', () => {
        console.log(chalk.whiteBright(">"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright("WA Version : " + sanz.user.phone.wa_version))
        console.log(chalk.whiteBright(">"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright("OS Version : " + sanz.user.phone.os_version))
        console.log(chalk.whiteBright(">"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright("Device : " + sanz.user.phone.device_manufacturer))
        console.log(chalk.whiteBright(">"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright("Model : " + sanz.user.phone.device_model))
        console.log(chalk.whiteBright(">"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright("OS Build Number : " + sanz.user.phone.os_build_number))
        console.log(chalk.whiteBright(">"), chalk.keyword("aqua")("[  STATS  ]"), chalk.whiteBright('Welcome My Senpai'))
        const authInfo = sanz.base64EncodedAuthInfo()
        fs.writeFileSync(auth, JSON.stringify(authInfo, null, '\t'))
    })
    await sanz.connect({ timeoutMs: 30 * 1000 })
    return sanz
}
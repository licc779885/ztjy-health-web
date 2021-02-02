const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-px2rem');
module.exports = ({ file }) => {
    let remUnit
    if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
        remUnit = 37.5
    } else {
        remUnit = 75
    }
    return {
        plugins: [
            autoprefixer(),
            pxtorem({
                remUnit: remUnit,
                propList: ['*'],
                selectorBlackList: ['']
            })
        ]
    }
}　　 
const {expect} = require("chai");

module.exports.assertions = [
    document => {
        const headings = document.getElementsByTagName('h2')
        return expect(headings).length(3, 'დოკუმენტში უნდა იყოს მხოლოდ სამი სათაური თემის')
    },
    document => {
        const headings = document.getElementsByTagName('h2')
        return expect(headings).length(5, 'დოკუმენტში უნდა იყოს მხოლოდ სამი სათაური თემის')
    }
]
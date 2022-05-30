const {expect} = require("chai");

module.exports.assertions = [
    document => {
        const headings = document.getElementsByTagName('h2')
        return expect(headings).length(3, 'დოკუმენტში უნდა იყოს მხოლოდ სამი სათაური თემის')
    },

    document => {
        const headings = document.getElementsByTagName('h3')
        return expect(headings).length(6, 'დოკუმენტში უნდა იყოს სამ-სამი მოტივაცია და რესურსები')
    },

    document => {
        const motivations = document.getElementsByTagName('h3').filter(heading => heading.innerText === 'მოტივაცია')

        return expect(motivations).length(3, 'დოკუმენტში არის სამი მოტივაცია რომლებიც აუცილებლად სათაურების შემდეგაა')
    },

    document => {
        const resources = document.getElementsByTagName('h3').filter(heading => heading.innerText === 'რესურსები')

        return expect(resources).length(3, 'სულ არის 3 რესურსების ელემენტი')
    },

    document => {
        const headings = document.getElementsByTagName('h2').filter(heading => {
            let motivationCount = 0;
            let resourceCount = 0;
            while(heading.nextElementSibling.rawTagName !== 'h2') {
                heading = heading.nextElementSibling
                if(heading.innerText === 'მოტივაცია') {
                    if(motivationCount > 0) {
                        return false
                    } else {
                        motivationCount++;
                    }
                }

                if(heading.innerText === 'რესურსები') {
                    if(resourceCount > 0) {
                        return false
                    } else {
                        resourceCount++;
                    }
                }

                if(heading.nextElementSibling === null)
                    break
            }
            return true;
        })

        return expect(headings).length(3, 'თითოეულ თემაში არის მხოლოდ ერთი რესურები და ერთი მოტივაცია')
    },

    document => {
        const resources = document.getElementsByTagName('h3').filter(heading => heading.innerText === 'რესურსები').filter(resource => {
                if (resource.nextElementSibling === null) {
                    return false
                }

                if (resource.nextElementSibling.rawTagName !== 'ol')
                    return false

                let uniqueArr = []

                resource.nextElementSibling.childNodes.forEach(elem => {
                    if (elem.rawTagName === 'li') {
                        if (uniqueArr.indexOf(elem.innerText) === -1) {
                            uniqueArr.push(elem.innerText)
                        }
                    }
                })

                return uniqueArr.length === 3;
            }
        )

        return expect(resources).to.have.length.above(2, 'ყოველ რესურსების ელემენტში არის 3 უნიკალური ლინკი')
    },


]
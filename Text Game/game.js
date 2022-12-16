const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'Ready to start your grocery shop?',
        options: [
            {
                text: 'Yes',
                setState: { blueGoo: true },
                nextText: 2
            },
            {
                text: 'No',
                nextText: 8
            }
        ]
    },
    {
        id: 2,
        text: 'Choose your category',
        options: [
            {
                text: 'Fresh & Chilled Food',
                nextText: 3
            },
            {
                text: 'Frozen Food',
                nextText: 4
            },
            {
                text: 'Bakery',
                nextText: 5
            }, 
            {
                text: 'Food Cupboard',
                nextText: 6
            }
        ]
    },
    {
        id: 3,
        text: 'What kind of Fresh & Chilled Food do you need today? Choose an option to add to trolley.',
        options: [
            {
                text: 'Fresh Fruit',
                nextText: 7
            },
            {
                text: 'Fresh Vegetables',
                nextText: 7
            },
            {
                text: 'Fresh Meat',
                nextText: 7
            },
            {
                text: 'Chilled Fish & Seafood',
                nextText: 7
            }
        ]
    },
    {
        id: 4,
        text: 'What kind of Frozen Food do you need today? Choose an option to add to trolley.',
        options: [
            {
                text: 'Frozen Vegetables, Herbs & Rice',
                nextText: 7
            },
            {
                text: 'Frozen Meat, Poultry, Fish & Seafood',
                nextText: 7
            },
            {
                text: 'Frozen Ready Meals',
                nextText: 7
            },
            {
                text: 'Frozen Vegetables, Herbs & Rice',
                nextText: 7
            }
        ]
    },
    {
        id: 5,
        text: 'What kind of Bakery items do you need? Choose an option to add to trolley.',
        options: [
            {
                text: 'Bread or Fresh Bread',
                nextText: 7
            },
            {
                text: 'Rolls, Bagels & Wraps',
                nextText: 7
            },
            {
                text: 'Cakes & Tarts',
                nextText: 7
            },
            {
                text: 'Broissants, Brioche & Pastries',
                nextText: 7
            }
        ]
    },
    {
        id: 6,
        text: 'Which Food Cupboard items do you require? Choose an option to add to trolley.',
        options: [
            {
                text: 'Breakfast Items, Tea & Coffee',
                nextText: 7
            },
            {
                text: 'Rice, Pasta & Pulses',
                nextText: 7
            },
            {
                text: 'Tins, Cans & Packets',
                nextText: 7
            },
            {
                text: 'Dried Herbs, Oils & Vinegar',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'Items have been added to your list.',
        options: [
            {
                text: 'Next Item Please',
                nextText: 2
            },
            {
                text: 'I Am Finished',
                nextText: 9
            }
        ]
    },
    {
        id: 8,
        text: 'You have completed your grocery shop. Thanks for shopping at Waitrose & Partners. See you again soon.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'Are you ready to checkout?',
        options: [
            {
                text: 'Checkout',
                nextText: 8
            }
        ]
    }
]

startGame()
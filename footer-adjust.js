function processComputedMargin(element) {
    const elementMargin = getComputedStyle(element).margin;
    const getNumbersCaracters = elementMargin.match(numbersRegexp);

    return getNumbersCaracters.map(item => Number(item));
}

function processComputedHeight(element) {
    const elementHeight = getComputedStyle(element).height;
    const getNumbersCaracters = elementHeight.match(numbersRegexp);

    return Number(getNumbersCaracters);
}

function calcFullMarginOfElements(...elements) {
    let sum = 0;

    elements.forEach(item => {
        const margin = processComputedMargin(item);

        if (margin.length <= 2) {
            sum += margin[0];
            return;
        }

        sum += margin[0] + margin[2];
    });

    return sum;
}

const numbersRegexp = /-?[0-9]+\.?[0-9]?/g;

const body = document.body;
const header = document.querySelector('header');
const main = document.querySelector('main');
const footer = document.querySelector('footer');

const bodyHeight = processComputedHeight(body);
const headerHeight = processComputedHeight(header);
const mainHeight = processComputedHeight(main)
const footerHeight = processComputedHeight(footer);
const marginsSum = calcFullMarginOfElements(main, header);


const marginTop = bodyHeight - (headerHeight + mainHeight + marginsSum + footerHeight);

footer.style.marginTop = marginTop + 'px';
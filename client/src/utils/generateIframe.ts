interface GenerateIframeInterface {
    url: string,
    name: string
}
function generateIframe({url, name}: GenerateIframeInterface) {
    return `<iframe src="${url}" height="400" width="700" title="${name}" frameBorder="0"></iframe>`
}

export default generateIframe
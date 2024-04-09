interface ReplaceKeyInUrlInterface {
    keys: { [key: string]: string | number | undefined }
    url: string
}
function replaceKeysInUrl({keys, url}: ReplaceKeyInUrlInterface) {
    let newUrl = url

    for (const [key, value] of Object.entries(keys)) {
        newUrl = newUrl.replace(`:${key}`, value as string)
    }

    return newUrl
}

export default replaceKeysInUrl
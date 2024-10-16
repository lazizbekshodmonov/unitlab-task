import dayjs from 'dayjs'


export const formatDate = (date) => {
    return dayjs(date).format('DD.MM.YYYY')
}


const timeouts = {}

const cTimeout = (key = 'key') => {
    if (timeouts[key]) {
        clearTimeout(timeouts[key])
        timeouts[key] = undefined
    }
}

export const debounce = (key = 'key', fn = () => {
}, timeout = 500) => {
    const sTimeout = (key, fn, timeout) => {
        cTimeout(key)

        timeouts[key] = setTimeout(() => {
            try {
                fn()
            } catch (e) {
            }

            timeouts[key] = undefined
        }, timeout)
    }

    return sTimeout(key, fn, timeout)
}

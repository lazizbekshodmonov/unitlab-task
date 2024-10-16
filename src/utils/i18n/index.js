import {createI18n} from 'vue-i18n'
import uz from './uz'
import cr from './cr.js'
import ru from './ru'
import en from '@/utils/i18n/en.js'

const i18nFactory = () => {
    return createI18n({
        legacy: false,
        locale: localStorage.getItem('locale') || 'uz',
        fallbackLocale: 'uz',
        messages: {uz, cr, ru, en}
    })
}

export default i18nFactory

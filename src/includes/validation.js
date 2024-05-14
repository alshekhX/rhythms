import {
  Form as VeeForm,
  Field as VeeField,
  configure,
  ErrorMessage,
  defineRule
} from 'vee-validate'
import {
  not_one_of as excluded,
  required,
  email,
  min,
  max,
  alpha_spaces,
  min_value,
  max_value,
  confirmed
} from '@vee-validate/rules'
export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)

    defineRule('email', email)

    defineRule('min', min)
    defineRule('max', max)

    defineRule('alpha_spaces', alpha_spaces)
    defineRule('min_value', min_value)
    defineRule('max_value', max_value)
    defineRule('password_match', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is too long`,
          alpha_spaces: `only use letters`,
          min_value: `The field ${ctx.field} is too low`,
          max_value: `The field ${ctx.field} is too high`,
          password_match: 'Password does not match',
          tos: `You must accept the Terms of Service`,
          country_excluded: `We are currently not operating in this country`,
          excluded: `You can not use ${ctx.value} as a password`
        }

        const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : 'Enter a valid value'

        return message
      },
      validateOnInput: false
    })
  }
}

import { defineRule, configure } from 'vee-validate';
import { all as rules } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import ru from '@vee-validate/i18n/dist/locale/ru.json';

configure({
	generateMessage: localize({
		ru,
	}),
});
// Install rules and localization

Object.keys(rules).forEach((rule) => {
	defineRule(rule, rules[rule]);
});

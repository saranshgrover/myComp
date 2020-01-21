import { getPreciseTime } from '../../server/tools'
/**
 *
 * @param {*} condition Avancement Condition from WCIF
 * @return {string} String representation of Advancement Condition
 */
export const parseAdvancementCondition = condition => {
	if (!condition) {
		return ''
	}
	switch (condition.type) {
		case 'ranking':
			return `Top ${parseInt(condition.level)}`
		case 'percent':
			return `${parseInt(condition.leve)}%`
		case 'attemptResult':
			return `Better than ${getPreciseTime(condition.level)}`
		default:
			return ''
	}
}

/**
 *
 * @param {{}} cutoff Cutoff from WCIF
 * @return {string} String representation of Cutoff
 */
export const parseCutoff = cutoff => {
	return `${getPreciseTime(cutoff.attemptResult)} seconds in ${
		cutoff.numberOfAttempts
	} results`
}

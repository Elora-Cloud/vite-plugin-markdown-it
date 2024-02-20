import { withInstall } from '../utils/util'
import eloraCodeBox from './code-box.vue'
import eloraDocPage from './doc-page.vue'
import eloraVersionTag from './version-tag.vue'

export const EloraCodeBox = withInstall(eloraCodeBox)
export const EloraDocPage = withInstall(eloraDocPage)
export const EloraVersionTag = withInstall(eloraVersionTag)

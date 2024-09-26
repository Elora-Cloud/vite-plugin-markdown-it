import { withInstall } from '../../utils/util';
import eloraApiTyping from './api-typing.vue';
import eloraCodeBox from './code-box.vue';
import eloraDocPage from './doc-page.vue';
import eloraVersionTag from './version-tag.vue';

export const EloraCodeBox = withInstall(eloraCodeBox);
export const EloraDocPage = withInstall(eloraDocPage);
export const EloraVersionTag = withInstall(eloraVersionTag);
export const EloraApiTyping = withInstall(eloraApiTyping);

export const globalComponents = [EloraCodeBox, EloraDocPage, EloraVersionTag, EloraApiTyping];

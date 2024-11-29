import { withInstall } from '../../utils/util';
import docApiTyping from './api-typing.vue';
import docCodeBox from './code-box.vue';
import docDocPage from './doc-page.vue';
import docVersionTag from './version-tag.vue';

export const DocCodeBox = withInstall(docCodeBox);
export const DocDocPage = withInstall(docDocPage);
export const DocVersionTag = withInstall(docVersionTag);
export const DocApiTyping = withInstall(docApiTyping);

export const globalComponents = [DocCodeBox, DocDocPage, DocVersionTag, DocApiTyping];

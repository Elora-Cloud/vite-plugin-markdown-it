import type { SFCWithInstall } from '../../utils/util';
import { withInstall } from '../../utils/util';
import docApiTyping from './api-typing.vue';
import docCodeBox from './code-box.vue';
import docDocPage from './doc-page.vue';
import docVersionTag from './version-tag.vue';

export const DocCodeBox: SFCWithInstall<typeof docCodeBox> = withInstall(docCodeBox);
export const DocDocPage: SFCWithInstall<typeof docDocPage> = withInstall(docDocPage);
export const DocVersionTag: SFCWithInstall<typeof docVersionTag> = withInstall(docVersionTag);
export const DocApiTyping: SFCWithInstall<typeof docApiTyping> = withInstall(docApiTyping);

export const globalComponents: (SFCWithInstall<typeof docCodeBox> | SFCWithInstall<typeof docDocPage> | SFCWithInstall<typeof docVersionTag> | SFCWithInstall<typeof docApiTyping>)[] = [DocCodeBox, DocDocPage, DocVersionTag, DocApiTyping];

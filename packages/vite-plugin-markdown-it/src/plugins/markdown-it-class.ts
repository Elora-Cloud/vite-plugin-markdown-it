import type MarkdownIt from 'markdown-it';

export interface ClassMapping {
  [className: string]: string
}
/**
 * Takes the markdown-it tokens and assigns classes to each token
 *
 * @param tokens Tokens injected by the markdown-it plugin
 * @param mapping Tag to class mapping
 */
function setTokenClasses(tokens: any[], mapping: ClassMapping = {}) {
  tokens.forEach((token) => {
    /**
     * `token.nesting` is a number referring to the nature of the tag.
     *
     * - `1` means the tag is opening
     * - `0` means the tag is self-closing
     * - `-1` means the tag is closing
     *
     * @see https://github.com/markdown-it/markdown-it/blob/2e31d3430187d2eee1ba120c954783eebb93b4e8/lib/token.js#L44-L53
     */
    const isOpeningTag = token.nesting !== -1;

    if (isOpeningTag && mapping[token.tag]) {
      const existingClassAtr = token.attrGet('class') || '';

      const existingClasses = existingClassAtr.split(' ');
      const givenClasses = mapping[token.tag] || '';

      const newClasses = [
        ...existingClasses,
        ...(Array.isArray(givenClasses) ? givenClasses : [givenClasses]),
      ];

      token.attrSet('class', newClasses.join(' ').trim());
    }

    // If the tag has any nested children, assign classes to those also
    if (token.children) {
      setTokenClasses(token.children, mapping);
    }
  });
}

export default (md: MarkdownIt, mapping: ClassMapping = {}): void => {
  md.core.ruler.push('markdown-it-tag-to-class', (state) => {
    setTokenClasses(state.tokens, mapping);
  });
};

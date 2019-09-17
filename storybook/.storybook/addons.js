/**
 * Load more/needed synthax languages
 * 
 * @see https://github.com/storybookjs/storybook/blob/7ee997698df4908ec716c5cfb6b59053469b04a9/lib/components/src/syntaxhighlighter/syntaxhighlighter.tsx 
 */
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import pug from 'react-syntax-highlighter/dist/esm/languages/prism/pug';

SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('pug', pug);



import '@storybook/addon-a11y/register';
import '@storybook/addon-knobs/register';
import '@storybook/addon-notes/register';
import '@storybook/addon-options/register';
import '@storybook/addon-viewport/register';
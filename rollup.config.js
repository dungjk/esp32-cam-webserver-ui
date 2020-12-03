import rollupCommonjs from '@rollup/plugin-commonjs';
import rollupResolve from '@rollup/plugin-node-resolve';
import rollupTs2 from 'rollup-plugin-typescript2';
import rollupPostcss from 'rollup-plugin-postcss';
import rollupFilesize from 'rollup-plugin-filesize';
import rollupReplace from '@rollup/plugin-replace';
import rollupHtml, { makeHtmlAttributes } from '@rollup/plugin-html';
import { terser } from 'rollup-plugin-terser';
import { extname } from 'path';

const isDevelopmentEnv = process.env.NODE_ENV === 'development';
const isBeta = process.env.SITE === 'beta';
const isStaging = process.env.SITE === 'staging';

console.log('Environment', process.env.NODE_ENV);

const toString = (source) => {
  if (typeof source === 'string') return source;
  if (source instanceof Buffer) return source.toString('utf8');
  return source;
};
const generateInlineElements = (bundle) => {
  const files = Object.values(bundle).filter(
    (file) => file.isEntry || (typeof file.type === 'string' ? file.type === 'asset' : file.isAsset)
  );
  var scripts = [];
  var styles = [];
  for (const file of files) {
    const { fileName } = file;
    const extension = extname(fileName).substring(1);
    if (extension === 'js') {
      scripts.push(`<script>${file.code}</script>`);
    } else if (extension === 'css') {
      styles.push(`<style>${toString(file.source)}</style>`);
    }
  }
  return { scripts, styles };
};

const generateHtmlBundle = ({ attributes, files, meta, publicPath, title, bundle }) => {
  const { scripts, styles } = generateInlineElements(bundle);
  const scriptElements = scripts.join('\n');
  const styleElements = styles.join('\n');

  const metas = meta
    .map((input) => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
    })
    .join('\n');

  return `
<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
<head>
${metas}
<title>${title}</title>
${styleElements}
</head>
<body>
${scriptElements}
</body>
</html>`;
};

const plugins = [
  rollupResolve({
    jsnext: true,
    preferBuiltins: true,
    browser: true,
  }),
  rollupCommonjs({
    include: 'node_modules/**',
  }),
  rollupTs2({
    noEmitOnError: false,
  }),
  rollupReplace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  }),
  rollupPostcss({
    extract: true,
    sourceMap: isDevelopmentEnv,
    modules: {
      globalModulePaths: [/styles.scss/],
      scopeBehaviour: 'local',
      generateScopedName: isDevelopmentEnv
        ? '[name]__[local]___[hash:base64:5]'
        : isBeta || isStaging
        ? '[local]___[hash:base64:8]'
        : '[hash:base64:8]',
    },
    autoModules: false,
    minimize: !isDevelopmentEnv,
    namedExports: (name) => {
      return `${name.replace(/-/g, '_')}`;
    },
  }),
  rollupHtml({
    title: 'ESP32 cam server',
    fileName: 'index.html',
    template: generateHtmlBundle,
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width,initial-scale=1' }],
  }),
  rollupFilesize(),
];

!isDevelopmentEnv && plugins.push(terser());

const external = [];
export default [
  {
    input: './src/index.tsx',
    watch: isDevelopmentEnv,
    plugins: [...plugins],
    external,
    output: {
      sourcemap: (isDevelopmentEnv ? 'inline' : false),
      file: './dist/index.js',
      format: 'iife',
    },
    watch: {
      buildDelay: 500,
      clearScreen: false,
      chokidar: {
        ignoreInitial: true,
        useFsEvents: true,
      },
      exclude: ['node_modules/**'],
    },
  },
];

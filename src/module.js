const fs = require('fs');
const path = require('path');
const glob = require('glob-all');

const QUASAR_CONF_PATH = `${process.cwd()}/quasar.conf.js`;

const QUASAR_EXTRAS_PATH = '@quasar/extras';
const QUASAR_ANIMATION_CSS_PATH = `${QUASAR_EXTRAS_PATH}/animate`;
const QUASAR_FLEX_ADDON_PATH = 'quasar/src/css/flex-addon.styl';
const QUASAR_VARIABLES_PATH = 'quasar/src/css/variables.styl';
const QUASAR_VARIABLES_OVERRIDES_PATH = '~/assets/quasar.variables.styl';

const QUASAR_STYLUS_FILES = [
  'quasar/dist/quasar.styl',
  QUASAR_VARIABLES_PATH,
  QUASAR_VARIABLES_OVERRIDES_PATH,
];

const STYLUS_AUTO_IMPORTS = [
  QUASAR_VARIABLES_PATH,
  QUASAR_VARIABLES_OVERRIDES_PATH,
];

const mergeOptions = (moduleOptions, nuxtOptions, resolver) => {
  const options = Object.assign({}, nuxtOptions, moduleOptions);

  if (!fs.existsSync(QUASAR_CONF_PATH)) return options;

  const quasarConfBuilder = resolver.requireModule(QUASAR_CONF_PATH);

  return Object.assign({}, options, quasarConfBuilder({}));
};

export default function nuxtQuasar(moduleOptions) {
  const resolver = this.nuxt.resolver || this.nuxt;
  const resolvePath = path =>
    resolver.resolveModule(path) || resolver.resolveAlias(path)

  const pushCSS = file =>
    resolvePath(file) && this.options.css.push(file);

  const options = mergeOptions(moduleOptions, this.options.quasar, resolver);

  const { animations = [], extras = [] } = options;

  animations.map(name => `${QUASAR_ANIMATION_CSS_PATH}/${name}.css`).forEach(pushCSS);
  extras.map(extra => `${QUASAR_EXTRAS_PATH}/${extra}/${extra}.css`).forEach(pushCSS);

  if (options.framework && options.framework.cssAddon) {
    pushCSS(QUASAR_FLEX_ADDON_PATH);
  }

  QUASAR_STYLUS_FILES.forEach(pushCSS);

  const { build: { loaders: { stylus: stylusLoader } } } = this.options;

  const stylusLoaderImports = STYLUS_AUTO_IMPORTS.reduce((paths, path) => {
    const modulePath = resolver.resolveModule(path);
    if (modulePath) return [...paths, modulePath];

    const aliasPath = resolver.resolveAlias(path);
    const globPaths = glob.sync(aliasPath);

    return [...paths, ...globPaths];
  }, []);

  stylusLoader.import = stylusLoader.import
    ? [...stylusLoader.import, ...stylusLoaderImports]
    : stylusLoaderImports;

  this.addPlugin({
    src: path.resolve(__dirname, 'templates', 'plugin.js'),
    fileName: 'nuxt-quasar-plugin.js',
    options,
  });
};

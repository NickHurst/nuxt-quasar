# Nuxt Quasar Module

A Nuxt module for the [Quasar Framework](https://quasar.dev).

> Note this module only supports Quasar >= 1.0

**This is currently very early in development,
so use with caution. There are currently no tests, but this module
is currently used in production on a few of my Nuxt apps, however they
all follow the roughly same configuration, so there are likely bugs lurking
that I haven't found due to the limited usage at the time, so if you find a bug,
please create an issue so I (or maybe someone else) can get it fixed.**

## Install

```bash
$ npm install --save nuxt-quasar

# Or with Yarn

$ yarn add nuxt-quasar
```

## Features

* Allows for configuring the Quasar Framework through `nuxt.config.js` or
  `quasar.conf.js` (Currently only supports a subset of Quasar's configuration options)
* Brings some features that are only available when using Quasar CLI/Vue CLI
  like automatically importing Quasar's theme and your custom Stylus variables into
  your Vue components
* Tree Shaking
* Supports Nuxt's Universal mode for SPAs or SSR, as well as Nuxt's static generation

### Roadmap

* Support [Quasar App Extensions](https://quasar.dev/app-extensions/introduction),
  Nuxt's module API exposes a similar interface to Quasars App Extensions API which
  will allow for utilizing Quasar's App Extensions in the exact same manner as
  Quasar CLI.
* Use Nuxt's module package commands to emulate some of the functionality
  of Quasar CLI.

## Configuration

`nuxt-quasar` currently supports the following [Quasar Config Options](https://quasar.dev/quasar-cli/quasar-conf-js):

* animations
* extras
* framework
  * config
    * brand
  * components
  * directives
  * plugins
  * iconSet
  * cssAddon
* supportIE

You can configure these options in your `nuxt.config.js`:

```js
export default {
  quasar: {
    animations: ["fadeIn", "fadeOut"],
    extras: ["fontawesome-v5"],
    framework: {
      config: {
        brand: {
          primary: "#ffffff",
          // ...
        },
      },
      components: [
        "QAvatar",
        "QBtn",
        // ...
      ],
      directives: ["ClosePopup"],
      plugins: ["Cookies"],
      iconSet: "fontawesome-v5",
      cssAddon: true
    },
    supportIE: true
  },
};
```

Or you can alternatively use a `quasar.conf.js`:

```js
// Note ctx will be undefined currently, eventually
// support will be added to emulate the Quasar Context object
// allowing for dyanmic configuration
module.exports = function(ctx) {
  return {
    animations: ["fadeIn", "fadeOut"],
    extras: ["fontawesome-v5"],
    framework: {
      config: {
        brand: {
          primary: "#ffffff",
          // ...
        },
      },
      components: [
        "QAvatar",
        "QBtn",
        // ...
      ],
      directives: ["ClosePopup"],
      plugins: ["Cookies"],
      iconSet: "fontawesome-v5",
      cssAddon: true
    },
    supportIE: true
  };
};
```

Then for your custom theme/Quasar Variable overrides, you can create a
`quasar.variables.styl` file in `./assets`. These variables along with
all of Quasars other variables will automatically be imported into your
Vue components with a stylus style block:

```stylus
// ./assets/quasar.variables.styl
$primary = #ffffff
// etc...
```

```vue
<script>
// ./components/MyComponent.vue
export default {
  props: ["foo"],
};
</script>

<style lang="stylus">
.my-component
  color $positive
  background-color $primary
</style>
```

### Why/Who's this For

This was created because I have a few existing Nuxt projects, most of which
were originally created while Quasar while still in early beta, and while
I had wanted to use Quasar orginally on a few of them, I decided to use
alternatives while Quasar matured.

However, now that Quasar is out of beta, and offers one of the best UI
Frameworks available (in my opinion), I found myself wanting to start migrating
those Nuxt apps over. Unfortunately though, Quasar only offers three ways to
integrate it into your project (UMD, Quasar CLI, or Vue CLI). Quasar CLI
is great, but can't be integrated into existing projects. Vue CLI is also
a great tool, but yet again, can't easily be integrated into an existing Nuxt project.
So, that leaves the UMD build, which while convinient, it doesn't offer all
the benefits that Quasar/Vue CLI have (mainly treeshaking and configuration).

What I really wanted was an option to slowly integrate Quasar into a Nuxt
project, as for some of the projects I would also like to eventually migrate
to use Quasar CLI rather than Nuxt due to the features Quasar CLI offers like
building for Electron/Cordova that are lacking in Nuxt. But, in addition to
migrating the actual code to use the Quasar components, that would require
also restructuring the entire project, and doing both at the same time sounds
like a recipe for disaster. However, some of the projects (the ones that use
Nuxt's static generation -- a feature unavailable in Quasar), I don't plan
on migrating from Nuxt, but would like to be able to use the same config/files
as I would when I'm working on a Quasar CLI project. Thus, this module was created.

So, if you want to use Quasar with Nuxt, incrementally migrate your Nuxt
app to Quasar CLI, or just don't want to have the bloat of the UMD build,
you may find this module useful.


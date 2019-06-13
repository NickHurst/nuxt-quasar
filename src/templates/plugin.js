import Vue from 'vue';

<% var framework = options.framework || {} %>

<% if (!framework || framework === 'all') { %>
import Quasar from 'quasar';
Vue.use(Quasar, {});
<% } else { %>
  <% var components = framework.components || [] %>
  <% var directives = framework.directives || [] %>
  <% var plugins = framework.plugins || [] %>
  <% var config = framework.config %>

import Quasar, {
<%= components
      .concat(directives)
      .concat(plugins)
      .map(s => '\t' + s)
      .join(',\n') + ',\n' %>
} from 'quasar/src/index.esm';

<% if (framework.iconSet) { %>
import iconSet from 'quasar/icon-set/<%= framework.iconSet %>.js';
<% } else { %>
import iconSet from 'quasar/icon-set/material-icons.js';
<% } %>

Vue.use(Quasar, {
  config: <%= JSON.stringify(config, null, '\t') %>,
  components: {
<%= components.map(s => '\t\t' + s).join(',\n') + ',\n' %>
  },
  directives: {
<%= directives.map(s => '\t\t' + s).join(',\n') + ',\n' %>
  },
  plugins: {
<%= plugins.map(s => '\t\t' + s).join(',\n') + ',\n' %>
  },
  iconSet,
});
<% } %>

<% if (options.supportIE) { %>
import 'quasar/dist/quasar.ie.polyfills.js';
<% } %>

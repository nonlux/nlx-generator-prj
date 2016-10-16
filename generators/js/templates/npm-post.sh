#!/bin/bash
<% if (isBabel) { %>
ln ./node_modules/nlx-babel-config/.babelrc ./
<% } %>

<% if (isEslint) { %>
ln ./node_modules/nlx-eslint-config/.eslintrc.js ./
<% } %>

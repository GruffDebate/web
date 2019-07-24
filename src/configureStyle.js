import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  body {
    margin: 0;
  }

  main {
    display: block;
  }

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  table{
    border-spacing: 0;
  }

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  a {
    background-color: transparent;
  }

  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  img {
    border-style: none;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  button,
  input { /* 1 */
    overflow: visible;
  }

  button,
  select { /* 1 */
    text-transform: none;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }

  progress {
    vertical-align: baseline;
  }

  textarea {
    overflow: auto;
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  details {
    display: block;
  }

  summary {
    display: list-item;
  }

  template {
    display: none;
  }

  [hidden] {
    display: none;
  }

  html {
    margin: 0;
    padding: 0;
    font-family: OpenSans, 'Lato', sans-serif;
    text-size-adjust: 100%;
    width: 100%;
    height: 100vh;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #525f7f;
    background-color: rgb(246, 250, 255);
  }

  body {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
    letter-spacing: 0.1px;
    word-wrap: break-word;
    font-kerning: normal;
    -webkit-font-smoothing: antialiased;
    background-color: rgb(246, 250, 255);
    margin: 0;
  }

  @font-face {
    font-family: OpenSans;
    src: url(/fonts/OpenSans-Regular.ttf);
  }

  @font-face {
    font-family: Lato;
    src: url(/fonts/Lato-Regular.ttf);
  }

  /* @font-face {
    font-family: OpenSansLight;
    src: url(/fonts/OpenSans-Light.ttf);
  }

  @font-face {
    font-family: CodeProBold;
    src: url(/fonts/CodeProBold.otf);
  }

  @font-face {
    font-family: CodePro;
    src: url(/fonts/CodeProRegular.otf);
  }

  @font-face {
    font-family: PtSans;
    src: url(/fonts/PTSansRegular.ttf);
  }  */

  #react-paginate ul {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    padding-left:0px;
  }

  #react-paginate li {
    display: inline-block;
    padding: 5px 2px;
    cursor: pointer;
    color: #000;
    border-radius: 3px;
  }

  #react-paginate li > a{
    padding: 3px 18px;
    outline: 0;
  }

  #react-paginate .break a {
    cursor: default;
  }

  #react-paginate li:first-of-type {
    background-color: #26483f;
    margin-right: 10px;
    color: #fff;
    font-weight: bold;
  }

  #react-paginate li:last-of-type {
    background-color: #26483f;
    color: #fff;
    font-weight: bold;
    margin-left: 10px;
  }

  #react-paginate .active {
    background-color: #26483f;
    color: #fff;
    font-weight: bold;
  }
`;

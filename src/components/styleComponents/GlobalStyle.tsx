import { createGlobalStyle } from "styled-components"
export const GlobalStyle = createGlobalStyle<any>`
   html, body, div, span, applet, object, iframe,
   h1, h2, h3, h4, h5, h6, p, blockquote, pre,
   a, abbr, acronym, address, big, cite, code,
   del, dfn, em, img, ins, kbd, q, s, samp,
   small, strike, strong, sub, sup, tt, var,
   b, u, i, center,
   dl, dt, dd, ol, ul, li,
   fieldset, form, label, legend,
   table, caption, tbody, tfoot, thead, tr, th, td,
   article, aside, canvas, details, embed, 
   figure, figcaption, footer, header, hgroup, 
   menu, nav, output, ruby, section, summary,
   time, mark, audio, video, input {
     margin: 0;
     padding: 0;
     border: 0;
     font-size: 100%;
     font: inherit;
     font-family: -apple-system, blinkmacsystemfont, "Helvetica Neue", helvetica, segoe ui, arial,
     roboto, "PingFang SC", "miui", "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
    //  vertical-align: baseline;
   }
   /* HTML5 display-role reset for older browsers */
   article, aside, details, figcaption, figure, 
   footer, header, hgroup, menu, nav, section {
     display: block;
   }
  :root {
    color-scheme:${({ theme }) => theme.name || "normal"};
    --igt-color-primary: ${({ theme }) => theme.color.primary || "inherit"};
    --igt-color-txt: ${({ theme }) => theme.color.txtPrimary || "inherit"};
    --igt-color-bg: ${({ theme }) => theme.color.bgPrimary || "inherit"};
    --igt-color-border: ${({ theme }) => theme.color.borderPrimary || "inherit"};
    --igt-color-head-bg:${({ theme }) => theme.color.headBgPrimary || "inherit"};
    --igt-color-deep-bg:${({ theme }) => theme.color.deepBgPrimary || "inherit"};
    --igt-color-menu-bg: ${({ theme }) => theme.color.menuBgPrimary || "inherit"};
    --igt-color-menu-border: ${({ theme }) => theme.color.menuBorderPrimary || "inherit"};
    --igt-color-card-bg: ${({ theme }) => theme.color.cardBgPrimary || "inherit"};
    --igt-color-card-even-bg: ${({ theme }) => theme.color.cardEvenBgPrimary || "inherit"};
    --igt-color-card-border: ${({ theme }) => theme.color.cardBorderPrimary || "inherit"};
    --igt-color-input-disabled-bg:  ${({ theme }) =>
      theme.color.inputWrapperBgPrimary || "inherit"};
    --igt-color-input-disabled-txt:  ${({ theme }) => theme.color.txtPrimary || "inherit"};
    --igt-color-steps-bg: ${({ theme }) => theme.color.stepsBgPrimary || "inherit"};
    --igt-color-yardBayCell-bg: ${({ theme }) => theme.color.yardBayCellBgPrimary || "inherit"};
    --igt-color-actived: ${({ theme }) => theme.color.activedBgPrimary || "inherit"};
    --igt-color-loading: ${({ theme }) => theme.color.loadingPrimary || "inherit"};
    --igt-color-error: ${({ theme }) => theme.color.error || "inherit"};
  }
   html {
    touch-action: manipulation;
    overflow-y: overlay;
   }
   body {
     line-height: 1;
      overflow-y: overlay;
      background: var(--igt-color-bg);
   }
   ol, ul {
     list-style: none;
   }
   blockquote, q {
     quotes: none;
   }
   blockquote:before, blockquote:after,
   q:before, q:after {
     content: '';
     content: none;
   }
   table {
     border-collapse: collapse;
     border-spacing: 0;
   }
   input {
     box-sizing: border-box;
     border:none;
     outline: none;
     background: #fff;
     color: #333;
   }
 `

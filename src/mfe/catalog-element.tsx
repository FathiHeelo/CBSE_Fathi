import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { createRoot, type Root } from 'react-dom/client';

import App from '../App';
import { yumTaDumTheme } from '../theme';

const ELEMENT_NAME = 'yum-catalog';

class CatalogMfeElement extends HTMLElement {
  private reactRoot?: Root;
  private mountPoint?: HTMLDivElement;

  connectedCallback() {
    if (this.reactRoot) return;

    const shadowRoot = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
    this.mountPoint ??= document.createElement('div');
    this.mountPoint.setAttribute('part', 'app');
    this.mountPoint.style.minWidth = '320px';
    this.mountPoint.style.minHeight = '100vh';

    if (!this.mountPoint.isConnected) shadowRoot.appendChild(this.mountPoint);

    const emotionCache = createCache({
      key: 'yum-catalog',
      container: shadowRoot,
      prepend: true,
    });
    const portalTheme = createTheme(yumTaDumTheme, {
      components: {
        MuiModal: { defaultProps: { container: this.mountPoint } },
        MuiPopover: { defaultProps: { container: this.mountPoint } },
        MuiPopper: { defaultProps: { container: this.mountPoint } },
      },
    });

    this.reactRoot = createRoot(this.mountPoint);
    this.reactRoot.render(
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={portalTheme}>
          <CssBaseline />
          <App embedded />
        </ThemeProvider>
      </CacheProvider>,
    );
  }

  disconnectedCallback() {
    this.reactRoot?.unmount();
    this.reactRoot = undefined;
  }
}

export function registerCatalogElement() {
  if (!customElements.get(ELEMENT_NAME)) {
    customElements.define(ELEMENT_NAME, CatalogMfeElement);
  }
}

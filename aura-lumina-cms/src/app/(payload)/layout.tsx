/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import Script from 'next/script'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <>
    {/* Suppress hydration warnings caused by browser extensions (Grammarly, etc.) */}
    {process.env.NODE_ENV === 'development' && (
      <Script
        id="suppress-hydration-warnings"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            const originalError = console.error;
            console.error = function(...args) {
              const message = args[0];
              if (
                typeof message === 'string' &&
                (message.includes('hydration') || 
                 message.includes('data-gr-ext-installed') ||
                 message.includes('data-new-gr-c-s-check-loaded'))
              ) {
                return; // Suppress hydration warnings from browser extensions
              }
              originalError.apply(console, args);
            };
          `,
        }}
      />
    )}
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  </>
)

export default Layout

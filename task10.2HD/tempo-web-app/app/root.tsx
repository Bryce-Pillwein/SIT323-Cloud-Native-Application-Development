import { Links, Meta, MetaFunction, Outlet, Scripts, ScrollRestoration, } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import Providers from "./providers/Providers";

export const meta: MetaFunction = () => {
  return [{ title: "TempoTrack Vital" }, { name: "description", content: "Tempo Track" },];
};

export const links: LinksFunction = () => [
  // Preload Custom font
  { rel: "preload", href: "/fonts/DrukWide/DrukWide-Medium.otf", as: "font", type: "font/otf", crossOrigin: "anonymous" },

  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous", },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap", },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  )
}

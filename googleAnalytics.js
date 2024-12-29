import Script from 'next/script';

export default function Analytics() {
  return (
    <>
      {process.env.NODE_ENV === 'production' && typeof window !== 'undefined' ? (
        <>
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-97B8JN3F8V"
            async
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-97B8JN3F8V');
              `,
            }}
          />
        </>
      ) : null}
    </>
  );
}

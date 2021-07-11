import Head from "next/head";

export default function Analytics() {
  return (
    <>
      {process.env.NODE_ENV === "production" && process.browser ? (
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-97B8JN3F8V"
          ></script>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());

                gtag("config", "G-97B8JN3F8V");`,
            }}
          />
        </Head>
      ) : null}
    </>
  );
}

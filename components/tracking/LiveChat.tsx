import Script from 'next/script';

/** The live chat from the original footer, for the redesigned pages. Production only. */
export function LiveChat() {
  if (process.env.NEXT_PUBLIC_ENABLE_CHAT !== 'true') return null;
  return (
    <Script id="messenger-widget-b" src="https://cdn.express-chat.com/website-bot.js" defer>
      6a76c1152d8f27e936e5715f,6a75cca21d2e325f2330e17c,agent
    </Script>
  );
}

export default function TermsPage() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p className="text-xs text-muted/60">Last updated: placeholder — replace before taking payments.</p>

      <h2>1. About Dexy</h2>
      <p>
        Dexy provides off-market and pre-market property information and an
        automated ranking tool to help investors evaluate opportunities. Dexy is
        an information service and does not provide financial, legal, or
        investment advice.
      </p>

      <h2>2. Subscriptions &amp; billing</h2>
      <p>
        Access to full listing intelligence requires an active paid
        subscription, billed through Stripe. You may cancel at any time from your
        account; access continues until the end of the current billing period.
      </p>

      <h2>3. Acceptable use</h2>
      <p>
        Listing addresses and intelligence are provided for your personal
        investment research only and may not be redistributed, scraped, or
        resold.
      </p>

      <h2>4. No guarantee of outcomes</h2>
      <p>
        Property rankings and estimates are general in nature. Past growth and
        yield figures are not a guarantee of future performance. Always conduct
        your own due diligence.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a className="link-orange" href="mailto:hello@dexyapp.ai">
          hello@dexyapp.ai
        </a>
        .
      </p>

      <p className="mt-8 text-xs text-muted/60">
        ⚠️ This is placeholder copy for the MVP scaffold. Have a lawyer review
        before launch.
      </p>
    </>
  );
}

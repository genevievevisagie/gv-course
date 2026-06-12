export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="text-xs text-muted/60">Last updated: placeholder — replace before taking payments.</p>

      <h2>1. What we collect</h2>
      <p>
        Account details (name, email), your saved search criteria, savings-goal
        figures you enter, and billing information processed securely by Stripe.
        Dexy never stores full card numbers.
      </p>

      <h2>2. How we use it</h2>
      <p>
        To operate your account, generate property shortlists, send
        transactional email (sign-up confirmation, password reset, and
        notifications you opt into), and manage your subscription.
      </p>

      <h2>3. Sharing</h2>
      <p>
        We share data only with the processors that run the service (e.g.
        Supabase for authentication and data, Stripe for payments, our email
        provider). We do not sell your personal information.
      </p>

      <h2>4. Your savings data</h2>
      <p>
        Deposit goals and balances you enter are stored against your account so
        you can track progress. You can update or clear these at any time.
      </p>

      <h2>5. Contact</h2>
      <p>
        Privacy questions? Email{" "}
        <a className="link-orange" href="mailto:privacy@dexyapp.ai">
          privacy@dexyapp.ai
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

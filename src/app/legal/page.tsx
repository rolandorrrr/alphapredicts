import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal",
  description: "AlphaPredicts legal documentation including Privacy Policy, Terms of Service, Risk Disclosure, and Electronic Communications Policy.",
};

const NAV_ITEMS = [
  { id: "privacy-policy", label: "Privacy Policy" },
  { id: "terms-of-service", label: "Terms of Service" },
  { id: "risk-disclosure", label: "Risk Disclosure" },
  { id: "electronic-communications", label: "Electronic Communications Policy" },
  { id: "electronic-signature", label: "Consent to Electronic Signature and Disclosure" },
];

export default function LegalPage() {
  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
          Legal <span className="text-tertiary">Documentation</span>
        </h1>
        <p className="text-on-surface-variant mb-12">
          Last updated: March 29, 2026. Please review the following policies carefully.
        </p>

        {/* Table of Contents */}
        <nav className="bg-surface-container-low p-6 mb-16 border-l-4 border-tertiary">
          <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link href={`#${item.id}`} className="text-primary hover:text-tertiary hover:underline decoration-tertiary transition-colors text-sm">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Privacy Policy */}
        <section id="privacy-policy" className="mb-20 scroll-mt-28">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b border-outline-variant/30 pb-4">Privacy Policy</h2>
          <div className="prose-legal space-y-4 text-on-surface-variant text-sm leading-relaxed">
            <h3 className="text-lg font-bold text-on-surface mt-6">1. Introduction</h3>
            <p>AlphaPredicts (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website alphapredicts.com (the &quot;Service&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services, including our prediction market analysis tools and subscription services.</p>
            <p>By accessing or using the Service, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Service.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">2. Information We Collect</h3>
            <p><strong>Personal Information:</strong> When you create an account, we collect your name, email address, and profile information provided through your authentication provider (such as Google). When you subscribe to Alpha Pro, we collect billing information processed through Stripe; we do not store your full credit card number on our servers.</p>
            <p><strong>Usage Data:</strong> We automatically collect certain information when you visit the Service, including your IP address, browser type, operating system, referring URLs, pages viewed, time spent on pages, and other diagnostic data. This data is collected through Vercel Analytics only if you have consented to analytics cookies.</p>
            <p><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can manage your cookie preferences through the Cookie Preferences panel accessible in the footer of any page. Functional cookies required for authentication and site operation cannot be disabled.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">3. How We Use Your Information</h3>
            <p>We use the information we collect to: (a) provide, operate, and maintain the Service; (b) process your subscription and manage your account; (c) communicate with you about service updates, security alerts, and administrative messages; (d) monitor and analyze usage patterns to improve the Service; (e) detect, prevent, and address technical issues and fraudulent activity; and (f) comply with legal obligations.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">4. Data Sharing and Disclosure</h3>
            <p>We do not sell your personal information to third parties. We may share your information with: (a) service providers who assist us in operating the Service, including Supabase for authentication and database services, Stripe for payment processing, and Vercel for hosting and analytics; (b) law enforcement or regulatory authorities when required by law or in response to valid legal process; and (c) in connection with a merger, acquisition, or sale of all or a portion of our assets, in which case your personal information may be transferred.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">5. Data Security</h3>
            <p>We implement commercially reasonable security measures to protect your personal information, including encryption in transit (TLS/SSL), secure authentication protocols, and access controls. However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">6. Data Retention</h3>
            <p>We retain your personal information for as long as your account is active or as needed to provide you with our services. We may also retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements. If you delete your account, we will delete or anonymize your personal information within 30 days, except where retention is required by law.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">7. Your Rights</h3>
            <p>Depending on your jurisdiction, you may have the right to: (a) access the personal information we hold about you; (b) request correction of inaccurate personal information; (c) request deletion of your personal information; (d) object to or restrict processing of your personal information; (e) data portability; and (f) withdraw consent at any time where we rely on consent to process your personal information. To exercise these rights, contact us at legal@alphapredicts.com.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">8. California Privacy Rights (CCPA)</h3>
            <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act. These include the right to know what personal information is collected, the right to know whether personal information is sold or disclosed and to whom, the right to opt-out of the sale of personal information, the right to delete personal information, and the right to non-discrimination for exercising your CCPA rights.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">9. Children&apos;s Privacy</h3>
            <p>The Service is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18 without verification of parental consent, we will take steps to remove that information from our servers.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">10. Changes to This Privacy Policy</h3>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">11. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact us at: legal@alphapredicts.com</p>
          </div>
        </section>

        {/* Terms of Service */}
        <section id="terms-of-service" className="mb-20 scroll-mt-28">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b border-outline-variant/30 pb-4">Terms of Service</h2>
          <div className="prose-legal space-y-4 text-on-surface-variant text-sm leading-relaxed">
            <h3 className="text-lg font-bold text-on-surface mt-6">1. Acceptance of Terms</h3>
            <p>By accessing and using AlphaPredicts (&quot;the Service&quot;), you accept and agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you must not access or use the Service. We reserve the right to modify these Terms at any time. Your continued use of the Service after any modifications constitutes your acceptance of the revised Terms.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">2. Description of Service</h3>
            <p>AlphaPredicts provides prediction market analysis, signals, and research tools (&quot;Content&quot;). The Service is available in free and paid subscription tiers (Alpha Pro). The Content provided through the Service is for informational and educational purposes only and does not constitute financial advice, investment advice, trading advice, or any other form of professional advice.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">3. Account Registration</h3>
            <p>To access certain features of the Service, you must create an account. You agree to: (a) provide accurate, current, and complete information during registration; (b) maintain the security of your account credentials; (c) promptly update your account information as necessary; and (d) accept responsibility for all activities that occur under your account. You must be at least 18 years old to create an account.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">4. Subscription and Billing</h3>
            <p>Alpha Pro subscriptions are billed on a recurring basis (monthly or annually) as selected at the time of purchase. By subscribing, you authorize us to charge the payment method provided for recurring fees. Subscription fees are non-refundable except as required by applicable law or as otherwise stated in these Terms. We may change subscription pricing with 30 days&apos; notice. You may cancel your subscription at any time; cancellation takes effect at the end of the current billing period.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">5. Free Trial</h3>
            <p>We may offer a free trial period for Alpha Pro. A valid payment method is required to begin a free trial. If you do not cancel before the trial period ends, your payment method will be charged the applicable subscription fee. Free trial eligibility is limited to one trial per user. We reserve the right to modify or discontinue free trial offers at any time.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">6. Intellectual Property</h3>
            <p>All Content, features, and functionality of the Service, including but not limited to text, graphics, logos, data, analysis, signals, and software, are the exclusive property of AlphaPredicts and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any Content without our prior written consent.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">7. Prohibited Uses</h3>
            <p>You agree not to: (a) use the Service for any unlawful purpose; (b) redistribute, resell, or share your account access or Content with third parties; (c) attempt to reverse engineer, decompile, or disassemble any portion of the Service; (d) use automated systems (bots, scrapers) to access the Service without authorization; (e) interfere with or disrupt the integrity or performance of the Service; (f) impersonate any person or entity; or (g) use the Content to provide competing services.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">8. Disclaimer of Warranties</h3>
            <p>THE SERVICE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ACCURACY. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT ANY DEFECTS WILL BE CORRECTED.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">9. Limitation of Liability</h3>
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, ALPHAPREDICTS AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO US IN THE TWELVE MONTHS PRECEDING THE CLAIM.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">10. Indemnification</h3>
            <p>You agree to indemnify, defend, and hold harmless AlphaPredicts and its officers, directors, employees, agents, and affiliates from and against any claims, damages, obligations, losses, liabilities, costs, or expenses arising from: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any third-party right; or (d) any claim that your use of the Service caused damage to a third party.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">11. Governing Law and Dispute Resolution</h3>
            <p>These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions. Any dispute arising from these Terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, conducted in Delaware. You agree to waive any right to a jury trial or to participate in a class action.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">12. Termination</h3>
            <p>We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service will immediately cease. Provisions that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">13. Contact</h3>
            <p>For questions about these Terms of Service, contact us at: legal@alphapredicts.com</p>
          </div>
        </section>

        {/* Risk Disclosure */}
        <section id="risk-disclosure" className="mb-20 scroll-mt-28">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b border-outline-variant/30 pb-4">Risk Disclosure</h2>
          <div className="prose-legal space-y-4 text-on-surface-variant text-sm leading-relaxed">
            <div className="bg-error/10 border border-error/30 p-4 text-error text-xs font-bold uppercase tracking-widest mb-6">
              Important: Please read this risk disclosure carefully before using our services.
            </div>

            <h3 className="text-lg font-bold text-on-surface mt-6">1. General Risk Warning</h3>
            <p>Prediction markets and event-based trading involve substantial risk of loss and are not suitable for all individuals. The value of positions can fluctuate rapidly and unpredictably, and you may lose some or all of your invested capital. You should not engage in prediction market trading unless you understand the nature of the transactions you are entering into and the extent of your exposure to risk.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">2. No Financial Advice</h3>
            <p>AlphaPredicts does not provide financial advice, investment advice, legal advice, tax advice, or any other form of professional advice. All Content, including but not limited to market analysis, signals, predictions, and commentary, is provided for informational and educational purposes only. You should consult with qualified professionals before making any financial decisions.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">3. No Guarantee of Performance</h3>
            <p>Past performance is not indicative of future results. Any historical performance data, signals accuracy rates, or backtested results presented on the Service are hypothetical or historical in nature and do not guarantee future performance. There is no assurance that any strategy, signal, or analysis will be profitable or will not result in losses.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">4. Market Risks</h3>
            <p>Prediction markets are subject to unique risks including but not limited to: (a) liquidity risk, where markets may have insufficient volume for timely execution; (b) resolution risk, where the outcome of events may be ambiguous or disputed; (c) platform risk, where prediction market platforms may experience technical failures, regulatory actions, or insolvency; (d) regulatory risk, where laws governing prediction markets may change; and (e) counterparty risk inherent in decentralized and centralized market platforms.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">5. Technology Risks</h3>
            <p>Use of the Service is subject to technology risks including system failures, network outages, data transmission delays, software errors, and cybersecurity threats. Signal delivery may be delayed or interrupted. We do not guarantee continuous, uninterrupted, or error-free operation of the Service.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">6. Your Responsibility</h3>
            <p>You are solely responsible for: (a) your own trading and investment decisions; (b) conducting your own due diligence and research; (c) understanding and complying with all applicable laws and regulations in your jurisdiction; (d) determining whether prediction market participation is legal in your jurisdiction; and (e) managing your own risk exposure. AlphaPredicts assumes no liability for any losses you may incur.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">7. Third-Party Platforms</h3>
            <p>AlphaPredicts is not affiliated with, endorsed by, or associated with any prediction market platform including but not limited to Polymarket, Kalshi, or any other trading venue. References to these platforms are for informational purposes only. We are not responsible for the operation, security, or regulatory status of any third-party platform.</p>
          </div>
        </section>

        {/* Electronic Communications Policy */}
        <section id="electronic-communications" className="mb-20 scroll-mt-28">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b border-outline-variant/30 pb-4">Electronic Communications Policy</h2>
          <div className="prose-legal space-y-4 text-on-surface-variant text-sm leading-relaxed">
            <h3 className="text-lg font-bold text-on-surface mt-6">1. Consent to Electronic Communications</h3>
            <p>By creating an account or using the Service, you consent to receive electronic communications from AlphaPredicts. These communications may include: (a) service announcements and administrative messages; (b) subscription confirmations, billing notices, and payment receipts; (c) security alerts and account notifications; (d) updates to our Terms of Service, Privacy Policy, and other legal documents; and (e) marketing communications, if you have opted in.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">2. Methods of Communication</h3>
            <p>We may communicate with you electronically through: (a) email to the address associated with your account; (b) in-app notifications and messages displayed within the Service; (c) push notifications if enabled on your device; and (d) posts or notices on the Service. All communications delivered electronically satisfy any legal requirement that such communications be made in writing.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">3. Updating Your Contact Information</h3>
            <p>It is your responsibility to keep your email address and other contact information current. If your contact information changes, you must update it promptly through your account settings. We are not responsible for communications that fail to reach you due to outdated contact information.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">4. Opting Out</h3>
            <p>You may opt out of marketing communications by using the unsubscribe link provided in marketing emails. You may not opt out of service-related communications that are necessary for the operation of your account, including billing notifications, security alerts, and changes to our terms or policies.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">5. Record Retention</h3>
            <p>We recommend that you print or save a copy of all electronic communications for your records. You may request a paper copy of any electronic communication by contacting us at legal@alphapredicts.com. Standard charges may apply for paper copies.</p>
          </div>
        </section>

        {/* Consent to Electronic Signature and Disclosure */}
        <section id="electronic-signature" className="mb-20 scroll-mt-28">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b border-outline-variant/30 pb-4">Consent to Electronic Signature and Disclosure</h2>
          <div className="prose-legal space-y-4 text-on-surface-variant text-sm leading-relaxed">
            <h3 className="text-lg font-bold text-on-surface mt-6">1. Scope of Consent</h3>
            <p>By using the Service, you consent to the use of electronic signatures, electronic records, and electronic delivery of disclosures, notices, and documents in connection with your account and all transactions conducted through the Service. This consent applies to all records, disclosures, and documents that AlphaPredicts is required by law or chooses to provide to you electronically.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">2. Electronic Signature Agreement</h3>
            <p>You agree that your electronic acceptance (including clicking &quot;I agree,&quot; &quot;Accept,&quot; &quot;Submit,&quot; or similar buttons, or otherwise taking affirmative action to indicate acceptance) constitutes your signature, acceptance, and agreement as if you had signed a document in ink. You agree that no certification authority or other third-party verification is necessary to validate your electronic signature, and that the lack of such certification or verification will not affect the enforceability of your electronic signature.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">3. Hardware and Software Requirements</h3>
            <p>To receive and retain electronic disclosures and communications, you need: (a) a device with internet access; (b) a current version of a supported web browser (Chrome, Firefox, Safari, or Edge); (c) an active email account; and (d) sufficient storage space or a printer to retain disclosures for your records. If these requirements change, we will notify you.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">4. Withdrawing Consent</h3>
            <p>You may withdraw your consent to receive electronic disclosures at any time by contacting us at legal@alphapredicts.com. If you withdraw consent, we may terminate your access to the Service, as electronic communication is essential to the operation of our platform. Withdrawing consent does not affect the legal validity or enforceability of any electronic disclosures or signatures provided prior to withdrawal.</p>

            <h3 className="text-lg font-bold text-on-surface mt-6">5. Federal and State Law</h3>
            <p>This consent is provided in accordance with the Electronic Signatures in Global and National Commerce Act (E-SIGN Act), 15 U.S.C. 7001 et seq., and applicable state laws governing electronic transactions. You acknowledge that electronic records and signatures carry the same legal weight as paper documents and handwritten signatures.</p>
          </div>
        </section>

        {/* Back to top */}
        <div className="text-center pt-8 border-t border-outline-variant/30">
          <Link href="#" className="text-tertiary hover:underline text-sm font-bold uppercase tracking-widest">
            Back to Top
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client"

import { Footer } from "@/components/sections/footer"
import Image from "next/image"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <main>
      {/* Hero section with page title - matching main hero style */}
      <div className="relative w-full bg-white px-3 pt-3 pb-3 md:px-4 md:pt-4 md:pb-4">
        {/* Background Container with rounded corners */}
        <div 
          className="relative w-full h-[280px] md:h-[360px] overflow-hidden rounded-2xl md:rounded-3xl"
          style={{
            boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.06)',
          }}
        >
          {/* Background Image */}
          <Image
            src="/images/Majestic Mountain Landscape.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          
          {/* Overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
          
          {/* Vignette effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at top left, rgba(0,0,0,0.5) 0%, transparent 50%),
                radial-gradient(ellipse at top right, rgba(0,0,0,0.5) 0%, transparent 50%)
              `,
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
              Privacy Policy
            </h1>
            <p className="text-base md:text-lg text-white/70">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="relative bg-[#FFFFFF] py-16 md:py-24" data-theme="light">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto px-6 md:px-8 text-[#1a1a1a]">
          <div className="max-w-none">
            
            <p className="text-xl text-[#333] mb-6 leading-relaxed">
              At Duckie, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Duckie and how we use it.
            </p>

            <p className="text-[#444] mb-4 leading-relaxed">
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to <Link href="/contact" className="text-[#FF6B35] hover:underline">contact us</Link>.
            </p>

            <p className="text-[#444] mb-4 leading-relaxed">
              This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Duckie. This policy is not applicable to any information collected offline or via channels other than this website.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">Consent</h2>
            <p className="text-[#444] mb-4 leading-relaxed">
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">Information We Collect</h2>
            <p className="text-[#444] mb-4 leading-relaxed">
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">How We Use Your Information</h2>
            <p className="text-[#444] mb-4 leading-relaxed">We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#444] mb-4">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">Log Files</h2>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">Cookies and Web Beacons</h2>
            <p className="text-[#444] mb-4 leading-relaxed">
              Like any other website, Duckie uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">Advertising Partners Privacy Policies</h2>
            <p className="text-[#444] mb-4 leading-relaxed">
              You may consult this list to find the Privacy Policy for each of the advertising partners of Duckie. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Duckie, which are sent directly to users&apos; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              Note that Duckie has no access to or control over these cookies that are used by third-party advertisers.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">Third Party Privacy Policies</h2>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
            <p className="text-[#444] mb-4 leading-relaxed">Under the CCPA, among other rights, California consumers have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#444] mb-4">
              <li>Request that a business that collects a consumer&apos;s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
              <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
              <li>Request that a business that sells a consumer&apos;s personal data, not sell the consumer&apos;s personal data.</li>
            </ul>
            <p className="text-[#444] mb-4 leading-relaxed">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please <Link href="/contact" className="text-[#FF6B35] hover:underline">contact us</Link>.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">GDPR Data Protection Rights</h2>
            <p className="text-[#444] mb-4 leading-relaxed">We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#444] mb-4">
              <li><strong className="text-[#1a1a1a]">The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
              <li><strong className="text-[#1a1a1a]">The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
              <li><strong className="text-[#1a1a1a]">The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong className="text-[#1a1a1a]">The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong className="text-[#1a1a1a]">The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li><strong className="text-[#1a1a1a]">The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p className="text-[#444] mb-4 leading-relaxed">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please <Link href="/contact" className="text-[#FF6B35] hover:underline">contact us</Link>.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">Children&apos;s Information</h2>
            <p className="text-[#444] mb-4 leading-relaxed">
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to <Link href="/contact" className="text-[#FF6B35] hover:underline">contact us</Link> immediately and we will do our best efforts to promptly remove such information from our records.
            </p>

          </div>
        </div>
      </div>

      {/* Footer section with pond background */}
      <div className="relative overflow-hidden bg-[#FFFFFF]">
        {/* Background image */}
        <img 
          src="/images/pond-3.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pond-bg-image"
          style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
        />
        {/* Vignette overlay for bottom corners */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 0% 100%, rgba(0,0,0,0.35) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 100% 100%, rgba(0,0,0,0.35) 0%, transparent 70%)
            `,
          }}
          aria-hidden="true"
        />
        {/* Content */}
        <div className="relative pt-24 md:pt-32">
          <Footer />
        </div>
      </div>
    </main>
  )
}

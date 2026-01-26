import type { Metadata } from "next";
import { CtaFooterSection } from "@/components/sections/cta-footer-section"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Security",
  description: "Learn about Duckie's security practices, data protection, compliance certifications, and enterprise-grade infrastructure.",
};

export default function SecurityPage() {
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
            src="/images/Abstract Blue Composition.webp"
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
              Security
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

            {/* 1. Terms of Service */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-0 mb-6">1. Terms of Service</h2>
            
            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">1.1. Provider Liability for Data Breaches</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie&apos;s contract and terms of service outline the liability in the event of a data breach or compromise of the customer&apos;s environment. Specific details regarding Duckie&apos;s liability can be found in the official terms of service document. It is recommended that customers review this document thoroughly to understand the full extent of Duckie&apos;s liability and the protections offered in case of a security incident.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              For the most up-to-date and accurate information on liability clauses, customers should refer directly to the <Link href="/terms" className="text-[#FF6B35] hover:underline">terms of service</Link>.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">1.2. Service Level Agreement (SLA) and Performance Guarantees</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie has an active Service Level Agreement (SLA) in place that outlines minimum performance standards and guarantees. Our SLA specifically addresses system availability and incident response times, ensuring a high level of service quality for clients.
            </p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li><strong className="text-[#1a1a1a]">Uptime Guarantee:</strong> Duckie commits to maintaining a 99.9% uptime for our services, ensuring minimal disruption to client operations.</li>
              <li><strong className="text-[#1a1a1a]">Incident Response and Resolution:</strong> Our SLA defines specific response and resolution times for different severity levels of incidents.</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">1.3. Right of Termination for Material Breach of Privacy and Security Obligations</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              In the event that a party materially breaches their privacy and security obligations as outlined in the terms of service, the other party retains the right to terminate the agreement.
            </p>

            {/* 2. Data Ownership */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">2. Data Ownership</h2>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">2.1. Provider&apos;s Rights to Customer Data and Account Information</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie does not reserve any rights to use, disclose, or make public customers&apos; account information or data.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              Our policy prohibits any unauthorized use, disclosure, or publication of customer data or account information. This applies to all forms of customer data, including but not limited to personal information, transaction records, and any other data stored within Duckie&apos;s systems.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">2.2. Preservation of Customer Data Intellectual Property Rights</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              In accordance with our data ownership policies and practices, the intellectual property rights of our customers&apos; data remain fully intact. Customers retain all rights, title, and interest in their data, including any intellectual property rights associated with that data.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">2.3. Provider&apos;s Rights to Customer Data After Removal</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              In accordance with our data ownership policies, Duckie does not retain any rights to customer data after it has been removed from our system.
            </p>

            {/* 3. Compliance/Regulatory */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">3. Compliance/Regulatory</h2>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">3.1. Industry Standard Security Certifications</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              We are actively working in the process of obtaining SOC-2 compliance. We have partnered with Thoropass, a reputable compliance automation platform, to support us.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              We will keep our clients and partners informed of our progress throughout the SOC-2 compliance process and will provide updates on any additional certifications we may pursue in the future to further strengthen our security and privacy practices.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">3.2. Provision of Independent Audit Reports to Customers</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              In accordance with our commitment to transparency and regulatory compliance, we confirm that customers will receive a copy of any independent audit reports upon their finalization.
            </p>

            {/* 4. Third Party Reliance */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">4. Third Party Reliance</h2>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">4.1. Third-Party Service Providers and Relationships</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie relies on several third-party service providers, which have been carefully selected and assessed to ensure they meet our security and compliance standards. The following outlines our key third-party relationships:
            </p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li><strong className="text-[#1a1a1a]">Amazon Web Services (AWS):</strong> Provides cloud hosting and infrastructure services.</li>
              <li><strong className="text-[#1a1a1a]">Anthropic:</strong> Offers advanced AI capabilities.</li>
              <li><strong className="text-[#1a1a1a]">OpenAI:</strong> Provides machine learning and natural language processing services.</li>
              <li><strong className="text-[#1a1a1a]">Sentry:</strong> Utilized for application performance monitoring and error tracking.</li>
              <li><strong className="text-[#1a1a1a]">Supabase:</strong> Offers database and backend-as-a-service solutions.</li>
              <li><strong className="text-[#1a1a1a]">Weaviate:</strong> Provides vector database capabilities for efficient data storage and retrieval.</li>
            </ul>
            <p className="text-[#444] mb-4 leading-relaxed">We have implemented the following measures:</p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li><strong className="text-[#1a1a1a]">Compliance Frameworks:</strong> All of our third-party providers adhere to recognized compliance frameworks, such as SOC 2.</li>
              <li><strong className="text-[#1a1a1a]">Independent Assessments:</strong> We have conducted independent assessments of each vendor to verify their security posture and compliance with our requirements.</li>
              <li><strong className="text-[#1a1a1a]">Documentation Availability:</strong> Detailed assessment reports for each third-party provider are available upon request to our customers.</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">4.2. Monitoring of Upstream Providers and Third-Party Vendors</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              We recognize the critical importance of maintaining service continuity, compliance, and security across our entire supply chain. To address potential risks associated with upstream providers and third-party vendors, we have implemented a robust monitoring system in collaboration with Thoropass.
            </p>

            {/* 5. Disaster Recovery */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">5. Disaster Recovery</h2>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">5.1. Disaster Recovery Plan Implementation</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              We have implemented a comprehensive disaster recovery plan to ensure business continuity and data protection in the event of unforeseen circumstances.
            </p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li><strong className="text-[#1a1a1a]">Regular Backups:</strong> The provider conducts systematic backups of critical data and systems to minimize potential data loss.</li>
              <li><strong className="text-[#1a1a1a]">Failover Procedures:</strong> Established protocols are in place to swiftly transition operations to alternative systems or locations in case of primary system failure.</li>
              <li><strong className="text-[#1a1a1a]">Data Restoration Processes:</strong> Procedures have been developed to efficiently restore data and services to their normal operational state following a disaster event.</li>
            </ul>
            <p className="text-[#444] mb-4 leading-relaxed">
              The complete disaster recovery plan documentation is available upon request.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">5.2. Failover Site Certification and Standards</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie maintains robust disaster recovery measures, which include the implementation of failover sites. Key points regarding our failover sites:
            </p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li><strong className="text-[#1a1a1a]">Availability:</strong> We have established multiple failover sites to support our operations in case of emergencies.</li>
              <li><strong className="text-[#1a1a1a]">Cloud-based Infrastructure:</strong> Our failover sites are configured through our cloud service provider.</li>
              <li><strong className="text-[#1a1a1a]">Geographic Distribution:</strong> To enhance resilience and minimize the risk of regional disruptions, our failover sites are distributed across multiple regions within the United States.</li>
              <li><strong className="text-[#1a1a1a]">Security and Availability Standards:</strong> It is crucial to note that all our failover sites are held to the same security and availability standards as our primary facility.</li>
              <li><strong className="text-[#1a1a1a]">Certification:</strong> The failover sites adhere to the same certification requirements as our primary facility.</li>
            </ul>

            {/* 6. Provider Access Control */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">6. Provider Access Control</h2>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">6.1. Provider and Third-Party Access to Customer Data</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Access to customer data and environments is strictly limited. Currently, two individuals within the Duckie organization have direct access to customer data:
            </p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li>Chief Technology Officer (CTO) - Joel Ritossa</li>
              <li>Technical Lead - Xingfan Xia</li>
            </ul>
            <p className="text-[#444] mb-4 leading-relaxed">In addition to internal access, we utilize services from two third-party vendors:</p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li>Amazon Web Services (AWS)</li>
              <li>Supabase</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">6.2. Internal Access Control Practices</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Access to customer data is granted exclusively to internal engineering leads, who have been vetted and deemed necessary for operational purposes.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">To enforce these access control policies, we use comprehensive permission controls. These controls are designed to:</p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li>Implement the principle of least privilege, ensuring that employees have access only to the specific data and systems required for their roles.</li>
              <li>Establish role-based access control, aligning access rights with job responsibilities and organizational hierarchy.</li>
              <li>Regularly review and update access permissions to maintain the integrity of our access control system.</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">6.3. Deprovisioning of Access to Customer Data</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              We maintain a strict policy regarding the deprovisioning of access to customer data, environments, and applications that store customer data. We ensure that access is revoked within 24 hours after a user leaves or is terminated from our provider services.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie&apos;s access management system is configured to automatically trigger the deprovisioning process upon notification of an employee&apos;s departure or termination.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              Regular reviews are conducted to verify the effectiveness of this deprovisioning process.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">6.4. Public Internet Accessibility of Customer Data</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Customer data and/or environment will not be accessible from the public internet. Duckie&apos;s infrastructure and access controls are designed to prevent any direct connection between customer data and the public internet.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">6.5. Multi-Factor Authentication for Remote Access</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              In accordance with our security protocols, multi-factor authentication (MFA) is required for all Duckie employees accessing the customer&apos;s environment or data.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">6.6. LLM Data Access and Retention</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie utilizes a combination of open-source and closed-source language models (LLMs) to provide its services. Our approach to LLM data access and retention is designed to maximize data security and privacy:
            </p>

            <h4 className="text-lg md:text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">6.6.1. Open-source Models</h4>
            <p className="text-[#444] mb-4 leading-relaxed">
              Open-source models used by Duckie do not share data with third-party vendors, ensuring complete data isolation.
            </p>

            <h4 className="text-lg md:text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">6.6.2. Closed-source Models</h4>
            <p className="text-[#444] mb-4 leading-relaxed">By default, for closed-source models, we use OpenAI and Anthropic:</p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li>We maintain a zero-day retention policy with OpenAI, ensuring that no customer data is stored beyond the immediate processing needs. OpenAI&apos;s commercial terms can be found at: <a href="https://openai.com/enterprise-privacy/" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] hover:underline">https://openai.com/enterprise-privacy/</a></li>
              <li>Anthropic does not use customer data for training purposes, further protecting data privacy. Anthropic&apos;s commercial terms can be found at: <a href="https://www.anthropic.com/legal/commercial-terms" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] hover:underline">https://www.anthropic.com/legal/commercial-terms</a></li>
            </ul>

            <h4 className="text-lg md:text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">6.6.3. AWS Bedrock Option</h4>
            <p className="text-[#444] mb-4 leading-relaxed">Customers can elect to use only models available in AWS Bedrock:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#444] mb-4">
              <li>AWS Bedrock maintains a zero retention policy for all customer data.</li>
              <li>No customer data is used for model training purposes.</li>
              <li>As stated in AWS documentation: &quot;Amazon Bedrock doesn&apos;t store or log your prompts and completions. Amazon Bedrock doesn&apos;t use your prompts and completions to train any AWS models and doesn&apos;t distribute them to third parties.&quot; (<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] hover:underline">Learn more</a>)</li>
            </ul>

            <h4 className="text-lg md:text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">6.6.4. Self-hosted Option</h4>
            <p className="text-[#444] mb-4 leading-relaxed">Duckie offers a fully self-hosted version for customers with heightened security requirements:</p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li>Customers can deploy Duckie on their own cloud infrastructure.</li>
              <li>Customers have the ability to define their own model endpoints, providing complete control over data flow and storage.</li>
            </ul>

            <h4 className="text-lg md:text-xl font-semibold text-[#1a1a1a] mt-6 mb-3">6.6.5. Data Privacy Assurance</h4>
            <p className="text-[#444] mb-4 leading-relaxed">
              Regardless of the chosen deployment option (default, AWS Bedrock, or self-hosted), we do not use your personal data to train any large language models or foundational models where there is a risk of exposure to third parties. Your personal data remains secure and is exclusively used to fulfill our contractual obligations and provide you with our services.
            </p>

            {/* 7. Application/Infrastructure Security */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">7. Application/Infrastructure Security</h2>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">7.1. Dedicated Data Storage for Customer Environments</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie&apos;s system architecture employs silo&apos;d data collections.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">7.2. Data Transmission Protection and Encryption</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              To ensure the security of transmitted data, we implement Transport Layer Security (TLS) protocols.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">7.3. Data Protection through Encryption at Rest</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              We implement data protection measures to ensure the security of stored information. The primary method employed is encryption at rest.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">7.4. Vulnerability Assessments and Penetration Testing</h3>
            <p className="text-[#444] mb-4 leading-relaxed">We have implemented a schedule of vulnerability assessments and penetration testing:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#444] mb-4">
              <li>We conduct thorough vulnerability assessments on a quarterly basis. These assessments are designed to identify potential security weaknesses in our systems, applications, and infrastructure.</li>
              <li>In addition to vulnerability assessments, we also perform in-depth penetration testing on an annual basis.</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">7.5. Secure Application Development Standards and Protocols</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie adheres to the Open Web Application Security Project (OWASP) guidelines for secure application development.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              As part of our commitment to these standards, we have implemented automated security testing procedures. These automated tests are integrated into our development pipeline.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">7.6. Application Security Measures in Production Environment</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Our production environment employs a set of application security measures and controls to ensure the integrity, confidentiality, and availability of our systems and data. These measures include:
            </p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li><strong className="text-[#1a1a1a]">Database Logging and Auditing:</strong> We implement robust database logging and auditing mechanisms to track and monitor all database activities.</li>
              <li><strong className="text-[#1a1a1a]">Network Intrusion Detection/Prevention Systems (IDS/IPS):</strong> Our production environment is equipped with advanced network IDS/IPS to detect and prevent potential security threats and unauthorized access attempts in real-time.</li>
              <li><strong className="text-[#1a1a1a]">Access Control Lists (ACLs):</strong> We utilize ACLs to restrict network traffic and enforce granular access controls.</li>
              <li><strong className="text-[#1a1a1a]">Identity and Access Management (IAM) Policies:</strong> IAM policies are implemented to manage user identities, permissions, and access rights across our production environment.</li>
              <li><strong className="text-[#1a1a1a]">Monitoring and Alerting:</strong> Monitoring and alerting systems are in place to provide real-time visibility into our production environment.</li>
              <li><strong className="text-[#1a1a1a]">Backup and Recovery:</strong> We maintain backup and recovery procedures to ensure business continuity and data integrity in the event of system failures or security breaches.</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">7.7. Administrative Web Interface Access</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              As part of our services, customers will be granted access to an administrative web interface to manage their data.
            </p>

            {/* 8. Incident Detection/Response */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">8. Incident Detection/Response</h2>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">8.1. Security Incident and Breach Response Plan</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie maintains security incident and breach response plans to address potential security threats and data breaches effectively.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              For further information or to request access to the detailed plan, please contact our security compliance team at <a href="mailto:founders@duckie.ai" className="text-[#FF6B35] hover:underline">founders@duckie.ai</a>.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">8.2. Customer Notification Process for Security Incidents</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Duckie will notify customers in the event their environment or data is involved in a security incident. Security incident notifications are sent to customers via email.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">Our security incident notifications include the following key information:</p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li>The nature of the security incident</li>
              <li>Specific details about the affected customer data</li>
              <li>Steps being taken to mitigate the issue and prevent future occurrences</li>
            </ul>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">8.3. Customer Incident Reporting Mechanism</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Customers can report any security-related issues by sending an email to <a href="mailto:founders@duckie.ai" className="text-[#FF6B35] hover:underline">founders@duckie.ai</a>. This email address serves as the primary point of contact for all security incident reports and concerns from our customers.
            </p>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">8.4. Security and Audit Log Retention</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              Security logs are retained for a period of 6 months. These logs capture various security-related events and activities within our systems.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">
              Audit logs are maintained indefinitely.
            </p>

            {/* 9. Self-Hosted Solution */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mt-12 mb-6">9. Self-Hosted Solution</h2>

            <h3 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] mt-8 mb-4">9.1. Self-Hosted Solution Availability</h3>
            <p className="text-[#444] mb-4 leading-relaxed">
              We offer a comprehensive self-hosted version of Duckie to meet the security and compliance needs of our clients.
            </p>
            <p className="text-[#444] mb-4 leading-relaxed">Key features of our self-hosted solution include:</p>
            <ul className="list-decimal pl-6 space-y-2 text-[#444] mb-4">
              <li><strong className="text-[#1a1a1a]">On-premises deployment:</strong> The software can be installed and operated within the customer&apos;s own data centers or private cloud environments.</li>
              <li><strong className="text-[#1a1a1a]">Data sovereignty:</strong> All data generated and processed by the software remains within the customer&apos;s environment, addressing data residency and privacy concerns.</li>
              <li><strong className="text-[#1a1a1a]">Enhanced security:</strong> Customers can apply their existing security measures and policies to our solution.</li>
              <li><strong className="text-[#1a1a1a]">Compliance adherence:</strong> The self-hosted solution supports customers in meeting various regulatory and compliance standards by maintaining full control over their data and processing.</li>
              <li><strong className="text-[#1a1a1a]">Custom LLM models:</strong> The self-hosted solution can integrate and utilize custom language models. Customers can configure Duckie to use their own proprietary LLMs or fine-tuned models that have been specifically adapted to their domain or use case.</li>
            </ul>

          </div>
        </div>
      </div>

      {/* CTA + Footer section with pond background */}
      <CtaFooterSection />
    </main>
  )
}

import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Privacy Policy</h1>
          <Link href="/">
            <span className="text-sm text-blue-500 underline">Go Back</span>
          </Link>
        </header>
        <section className="text-sm text-gray-600">
          <p className="mb-6 text-center">Last Updated: 2024-14-06</p>

          <p className="mb-4">
            This Privacy Policy outlines how we collect, use, and protect your
            personal and non-personal information when you use our website
            located at{" "}
            <a
              href="https://micro-saas-finder.vercel.app/"
              className="text-blue-500 underline"
            >
              https://micro-saas-finder.vercel.app/
            </a>
            .
          </p>

          <p className="mb-4">
            By accessing or using the Website, you agree to the terms of this
            Privacy Policy. If you do not agree with the practices described in
            this policy, please do not use the Website.
          </p>

          <h2 className="text-lg font-semibold text-blue-600 mt-8 mb-2">
            1. Introduction
          </h2>
          <p className="mb-4">
            Welcome to MicroSaasFinder, the only tool you need to find micro
            saas ideas your customers are already looking for. We are committed
            to protecting your privacy. This Privacy Policy outlines our
            practices regarding the collection, use, and protection of your
            personal information.
          </p>

          <h2 className="text-lg font-semibold text-blue-600 mt-8 mb-2">
            2. Information We Collect
          </h2>
          <p className="mb-4">
            <strong>Personal Data:</strong> We collect personal information such
            as your name, email address, and payment information when you use
            our services.
          </p>
          <p className="mb-4">
            <strong>Non-Personal Data:</strong> We also collect non-personal
            data through web cookies to enhance your experience on our website.
          </p>

          <h2 className="text-lg font-semibold text-blue-600 mt-8 mb-2">
            3. Purpose of Data Collection
          </h2>
          <p className="mb-4">
            Your personal data is collected solely for the purpose of order
            processing and providing you with our services.
          </p>

          <h2 className="text-lg font-semibold text-blue-600 mt-8 mb-2">
            4. Data Sharing and Disclosure
          </h2>
          <p className="mb-4">
            We respect your privacy and do not share your personal data with any
            third parties.
          </p>

          <h2 className="text-lg font-semibold text-blue-600 mt-8 mb-2">
            5. Children&apos;s Privacy
          </h2>
          <p className="mb-4">
            MicroSaasFinder does not knowingly collect any personal information
            from children. If you are under 18, please do not use our services.
          </p>

          <h2 className="text-lg font-semibold text-blue-600 mt-8 mb-2">
            6. Updates to Our Privacy Policy
          </h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. All updates
            will be communicated to our users via email.
          </p>

          <h2 className="text-lg font-semibold text-blue-600 mt-8 mb-2">
            7. Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions or concerns about our Privacy Policy,
            please contact us at{" "}
            <a
              href="mailto:assemghor.reda@gmail.com"
              className="text-blue-500 underline"
            >
              assemghor.reda@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
``;

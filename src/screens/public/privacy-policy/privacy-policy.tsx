import { InfoPage } from "@/components/info-page/info-page";

export const PrivacyPolicy = () => {
  return <InfoPage title="Privacy Policy" content={privacyPolicyContent} />;
};

const privacyPolicyContent = [
  "At Socialpound, we respect your privacy and are committed to protecting any personal information you share with us. This Privacy Policy outlines how we collect, use, and protect your data when you use our platform.",
  "1. Information We Collect: When you sign up for Socialpound, we collect your email, name, picture and google sub through Google OAuth for authentication purposes. No additional personal data is collected unless you voluntarily provide it.",
  "2. How We Use Your Information: The data we collect is used solely for enhancing the user experience on the platform or necessary to provide platform functionality (e.g., Google for OAuth).",
  "3. Data Security: We take reasonable steps to secure your personal information and prevent unauthorized access, but please be aware that Socialpound is a learning platform and may have limited security measures in place.",
  "4. Third-Party Services: Socialpound integrates with third-party services such as Google OAuth for login. By using these services, you also agree to their respective privacy policies.",
  "5. User Rights: You have the right to request access to deletion of your personal data. To do so, please contact us at souravscchoudhary@gmail.com",
  "6. Changes to the Privacy Policy: We may update this policy to reflect changes in our practices or relevant laws. Any updates will be posted on this page, and continued use of the platform signifies your acceptance of the new policy.",
  "7. Contact Information: If you have any questions or concerns about this Privacy Policy, please contact us at souravscchoudhary@gmail.com",
];

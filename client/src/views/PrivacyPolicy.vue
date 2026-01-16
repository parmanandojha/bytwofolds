<template>
  <div data-scroll-container class="min-h-screen bg-white overflow-x-hidden">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 lg:py-32">
      <div class="mb-10 sm:mb-12 md:mb-16">
        <router-link to="/" class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-light text-xs sm:text-sm uppercase tracking-wider mb-6 sm:mb-8 transition-colors">
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path>
          </svg>
          <span>Back to Home</span>
        </router-link>
        <div class="mb-6 sm:mb-8 flex justify-center">
          <img src="/twofolds.svg" alt="TwoFolds Logo" class="h-8 sm:h-10" />
        </div>
        <div class="mb-4 sm:mb-6">
          <span class="text-xs uppercase tracking-widest text-gray-500 font-medium">Legal</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 sm:mb-8 leading-tight">
          Privacy Policy
        </h1>
        <p class="text-base sm:text-lg text-gray-600 font-light">
          Last updated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </p>
      </div>

      <div class="space-y-8 sm:space-y-10 md:space-y-12 text-sm sm:text-base text-gray-700 leading-relaxed font-light">
        <section>
          <h2 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Introduction</h2>
          <p>
            TwoFolds ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
        </section>

        <section>
          <h2 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Information We Collect</h2>
          <p class="mb-3 sm:mb-4">We may collect information about you in a variety of ways. The information we may collect includes:</p>
          <ul class="list-disc list-inside space-y-2 ml-2 sm:ml-4">
            <li><strong class="font-normal">Personal Data:</strong> Name, email address, phone number, and other contact information that you voluntarily provide when filling out forms on our website.</li>
            <li><strong class="font-normal">Business Information:</strong> Details about your business, goals, website requirements, and budget information.</li>
            <li><strong class="font-normal">Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, and pages visited.</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">How We Use Your Information</h2>
          <p class="mb-3 sm:mb-4">We use the information we collect to:</p>
          <ul class="list-disc list-inside space-y-2 ml-2 sm:ml-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Respond to your inquiries and communicate with you about our services</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Analyze website usage and trends</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Data Storage and Security</h2>
          <p>
            We store your information securely using industry-standard security measures. Your data is stored in JSON format on our servers and is protected against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Data Sharing and Disclosure</h2>
          <p class="mb-3 sm:mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
          <ul class="list-disc list-inside space-y-2 ml-2 sm:ml-4">
            <li>With your explicit consent</li>
            <li>To comply with legal obligations or respond to legal requests</li>
            <li>To protect our rights, privacy, safety, or property</li>
            <li>In connection with a business transfer or merger</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Your Rights</h2>
          <p class="mb-3 sm:mb-4">You have the right to:</p>
          <ul class="list-disc list-inside space-y-2 ml-2 sm:ml-4">
            <li>Access and receive a copy of your personal data</li>
            <li>Request correction of inaccurate or incomplete data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Cookies and Tracking Technologies</h2>
          <p>
            We may use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section>
          <h2 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section>
          <h2 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Contact Us</h2>
          <p class="mb-3 sm:mb-4">
            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <p>
            <strong class="font-normal">Email:</strong> ojha96p@gmail.com<br />
            <strong class="font-normal">Website:</strong> <a href="/" class="underline hover:text-gray-900 transition-colors">TwoFolds</a>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import LocomotiveScroll from 'locomotive-scroll'

let locomotiveScroll = null

onMounted(() => {
  locomotiveScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: false,
    resetNativeScroll: true
  })

  window.addEventListener('resize', () => {
    if (locomotiveScroll) locomotiveScroll.update()
  })
})

onUnmounted(() => {
  if (locomotiveScroll) {
    locomotiveScroll.destroy()
  }
})
</script>

<style scoped>
</style>

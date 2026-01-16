<template>
  <div data-scroll-container class="min-h-screen bg-white overflow-x-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
      <!-- Logo and Warning -->
      <div class="mb-8 sm:mb-10 md:mb-12 text-center">
        <div class="mb-4 sm:mb-6 flex justify-center">
          <img src="/twofolds.svg" alt="TwoFolds Logo" class="h-8 sm:h-10" />
        </div>
        <div class="mb-4 sm:mb-6 inline-block border border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <p class="text-xs sm:text-sm text-gray-600 font-light italic">
            ⚠️ Warning: We only take on 4 new projects per month to ensure quality. Secure your spot now.
          </p>
        </div>
      </div>

      <!-- Trusted By Logos -->
      <div ref="logosRef" class="mb-6 sm:mb-8">
        <div class="mb-3 sm:mb-4 text-center">
          <span class="text-xs uppercase tracking-widest text-gray-500 font-medium">Trusted by</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-center justify-items-center max-w-4xl mx-auto">
          <div class="flex items-center justify-center h-16 w-full opacity-100">
            <img 
              src="/logos/pransform-logo.avif" 
              alt="Pransform Logo" 
              class="max-h-12 max-w-full object-contain"
            />
          </div>
          <div class="flex items-center justify-center h-16 w-full opacity-100">
            <img 
              src="/logos/vhp-logo.jpg" 
              alt="VHP Logo" 
              class="max-h-12 max-w-full object-contain"
            />
          </div>
          <div class="flex items-center justify-center h-16 w-full opacity-100">
            <img 
              src="/logos/narasha-logo.svg" 
              alt="Narasha Logo" 
              class="max-h-12 max-w-full object-contain"
            />
          </div>
        </div>
      </div>

      <div class="max-w-2xl mx-auto">
        <div class="mb-6 sm:mb-8">
          <div class="flex items-center gap-1 sm:gap-2 max-w-md mx-auto">
            <div
              v-for="step in 8"
              :key="step"
              :class="[
                'h-px flex-1 transition-all',
                currentStep >= step ? 'bg-gray-900' : 'bg-gray-200'
              ]"
            ></div>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-8 sm:pt-10 md:pt-12">
          <!-- Step 1: Name -->
          <div v-if="currentStep === 1" ref="stepRef" class="step-content">
            <h2 class="text-2xl sm:text-3xl font-light text-gray-900 mb-6 sm:mb-8">Let's get started. Who are we speaking with?</h2>
            <div class="mb-6 sm:mb-8">
              <input
                v-model="formData.name"
                type="text"
                placeholder="Enter your name"
                class="w-full px-0 py-3 sm:py-4 border-0 border-b border-gray-300 focus:border-gray-900 outline-none bg-transparent text-base sm:text-lg font-light transition-colors"
              />
            </div>
            <button
              @click="nextStep"
              :disabled="!formData.name"
              class="group inline-flex items-center gap-2 border border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900 w-full sm:w-auto justify-center"
            >
              <span>Next</span>
              <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
              </svg>
            </button>
          </div>

          <!-- Step 2: Email -->
          <div v-if="currentStep === 2" ref="stepRef" class="step-content">
            <h2 class="text-2xl sm:text-3xl font-light text-gray-900 mb-6 sm:mb-8">Awesome! What's your best email, {{ formData.name || '[Name]' }}?</h2>
            <div class="mb-6 sm:mb-8">
              <input
                v-model="formData.email"
                type="email"
                placeholder="Enter your email"
                :class="[
                  'w-full px-0 py-3 sm:py-4 border-0 border-b outline-none bg-transparent text-base sm:text-lg font-light transition-colors',
                  formData.email && !isValidEmail(formData.email) 
                    ? 'border-red-500' 
                    : 'border-gray-300 focus:border-gray-900'
                ]"
              />
              <p v-if="formData.email && !isValidEmail(formData.email)" class="mt-2 text-xs sm:text-sm text-red-600 font-light">
                Please enter a valid email address
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                @click="prevStep"
                class="group inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path>
                </svg>
                <span>Back</span>
              </button>
              <button
                @click="nextStep"
                :disabled="!formData.email || !isValidEmail(formData.email)"
                class="group inline-flex items-center justify-center gap-2 border border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900"
              >
                <span>Next</span>
                <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Step 3: Phone -->
          <div v-if="currentStep === 3" ref="stepRef" class="step-content">
            <h2 class="text-2xl sm:text-3xl font-light text-gray-900 mb-6 sm:mb-8">What's your phone number?</h2>
            <div class="mb-6 sm:mb-8">
              <input
                v-model="formData.phone"
                type="tel"
                placeholder="Enter your phone number"
                :class="[
                  'w-full px-0 py-3 sm:py-4 border-0 border-b outline-none bg-transparent text-base sm:text-lg font-light transition-colors',
                  formData.phone && !isValidPhone(formData.phone) 
                    ? 'border-red-500' 
                    : formData.phone && isValidPhone(formData.phone)
                    ? 'border-green-500'
                    : 'border-gray-300 focus:border-gray-900'
                ]"
              />
              <p v-if="formData.phone && !isValidPhone(formData.phone)" class="mt-2 text-xs sm:text-sm text-red-600 font-light">
                Please enter a valid 10-digit Indian phone number
              </p>
              <p v-else-if="formData.phone && isValidPhone(formData.phone)" class="mt-2 text-xs sm:text-sm text-gray-600 font-light">
                ✓ Valid phone number
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                @click="prevStep"
                class="group inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path>
                </svg>
                <span>Back</span>
              </button>
              <button
                @click="nextStep"
                :disabled="!formData.phone || !isValidPhone(formData.phone)"
                class="group inline-flex items-center justify-center gap-2 border border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900"
              >
                <span>Next</span>
                <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Step 4: Goal -->
          <div v-if="currentStep === 4" ref="stepRef" class="step-content">
            <h2 class="text-2xl sm:text-3xl font-light text-gray-900 mb-6 sm:mb-8">What is the primary goal for your website right now?</h2>
            <div class="mb-6 sm:mb-8">
              <input
                v-model="formData.goal"
                type="text"
                placeholder="Enter your goal"
                class="w-full px-0 py-3 sm:py-4 border-0 border-b border-gray-300 focus:border-gray-900 outline-none bg-transparent text-base sm:text-lg font-light transition-colors"
              />
            </div>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                @click="prevStep"
                class="group inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path>
                </svg>
                <span>Back</span>
              </button>
              <button
                @click="nextStep"
                :disabled="!formData.goal"
                class="group inline-flex items-center justify-center gap-2 border border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900"
              >
                <span>Next</span>
                <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Step 5: Website Option -->
          <div v-if="currentStep === 5" ref="stepRef" class="step-content">
            <h2 class="text-2xl sm:text-3xl font-light text-gray-900 mb-6 sm:mb-8">Are we building a new empire from scratch or blowing up an existing site?</h2>
            <div class="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
              <label class="flex items-center p-4 sm:p-6 border border-gray-300 hover:border-gray-900 cursor-pointer transition-all duration-300" :class="formData.websiteOption === 'have' ? 'border-gray-900 bg-gray-50' : ''">
                <input
                  v-model="formData.websiteOption"
                  type="radio"
                  value="have"
                  class="mr-3 sm:mr-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-900"
                />
                <span class="font-light text-base sm:text-lg">Complete Website Redesign</span>
              </label>
              <label class="flex items-center p-4 sm:p-6 border border-gray-300 hover:border-gray-900 cursor-pointer transition-all duration-300" :class="formData.websiteOption === 'need' ? 'border-gray-900 bg-gray-50' : ''">
                <input
                  v-model="formData.websiteOption"
                  type="radio"
                  value="need"
                  class="mr-3 sm:mr-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-900"
                />
                <span class="font-light text-base sm:text-lg">Starting from Scratch</span>
              </label>
            </div>
            <div v-if="formData.websiteOption === 'have'" class="mb-6 sm:mb-8">
              <input
                v-model="formData.websiteUrl"
                type="url"
                placeholder="Enter your website URL"
                class="w-full px-0 py-3 sm:py-4 border-0 border-b border-gray-300 focus:border-gray-900 outline-none bg-transparent text-base sm:text-lg font-light transition-colors"
              />
            </div>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                @click="prevStep"
                class="group inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path>
                </svg>
                <span>Back</span>
              </button>
              <button
                @click="nextStep"
                :disabled="!formData.websiteOption || (formData.websiteOption === 'have' && !formData.websiteUrl)"
                class="group inline-flex items-center justify-center gap-2 border border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900"
              >
                <span>Next</span>
                <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Step 6: About Business -->
          <div v-if="currentStep === 6" ref="stepRef" class="step-content">
            <h2 class="text-2xl sm:text-3xl font-light text-gray-900 mb-6 sm:mb-8">What's your business is Service/Product? Little brief about it.</h2>
            <div class="mb-6 sm:mb-8">
              <textarea
                v-model="formData.aboutBusiness"
                rows="6"
                placeholder="Enter details about your business"
                class="w-full px-0 py-3 sm:py-4 border-0 border-b border-gray-300 focus:border-gray-900 outline-none bg-transparent text-base sm:text-lg font-light resize-none transition-colors"
              ></textarea>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                @click="prevStep"
                class="group inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path>
                </svg>
                <span>Back</span>
              </button>
              <button
                @click="nextStep"
                :disabled="!formData.aboutBusiness"
                class="group inline-flex items-center justify-center gap-2 border border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-900"
              >
                <span>Next</span>
                <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Step 7: Budget (Optional) -->
          <div v-if="currentStep === 7" ref="stepRef" class="step-content">
            <h2 class="text-2xl sm:text-3xl font-light text-gray-900 mb-6 sm:mb-8">What is your allocated budget for this transformation? (Optional)</h2>
            <div class="mb-6 sm:mb-8">
              <div class="mb-4 sm:mb-6">
                <div class="flex justify-between mb-3 sm:mb-4">
                  <span class="text-xs sm:text-sm text-gray-500 font-light">₹20,000</span>
                  <span class="text-lg sm:text-xl font-normal text-gray-900">₹{{ formatBudget(formData.budget) }}</span>
                  <span class="text-xs sm:text-sm text-gray-500 font-light">₹1,50,000</span>
                </div>
                <input
                  v-model.number="formData.budget"
                  type="range"
                  min="20000"
                  max="150000"
                  step="5000"
                  class="w-full h-px bg-gray-200 appearance-none cursor-pointer slider"
                />
              </div>
              <button
                @click="formData.budget = null"
                class="text-xs sm:text-sm text-gray-500 hover:text-gray-900 underline font-light"
              >
                Skip this step
              </button>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                @click="prevStep"
                class="group inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
              >
                <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"></path>
                </svg>
                <span>Back</span>
              </button>
              <button
                @click="nextStep"
                class="group inline-flex items-center justify-center gap-2 border border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
              >
                <span>Submit the form</span>
                <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Step 8: Thank You -->
          <div v-if="currentStep === 8" ref="stepRef" class="step-content text-center">
            <div class="mb-8 sm:mb-10 md:mb-12">
              <div class="w-12 h-12 sm:w-16 sm:h-16 border-2 border-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                <svg class="w-6 h-6 sm:w-8 sm:h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 class="text-3xl sm:text-4xl font-light text-gray-900 mb-4 sm:mb-6">Thank You!</h2>
              <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light px-2">
                You've taken the first step toward business growth. Most business owners never get this far. Someone from our team will reach out to you within 24 hours to discuss your project in detail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-black text-white py-8 sm:py-12 md:py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 md:gap-8">
          <div class="text-center md:text-left">
            <p class="text-xs sm:text-sm text-gray-400 font-light">
              © {{ new Date().getFullYear() }} TwoFolds. All rights reserved.
            </p>
          </div>
          <div class="flex items-center gap-6 sm:gap-8">
            <router-link
              to="/privacy-policy"
              class="text-xs sm:text-sm text-gray-400 hover:text-white font-light uppercase tracking-wider transition-colors"
            >
              Privacy Policy
            </router-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'

const currentStep = ref(1)
const stepRef = ref(null)
const submitting = ref(false)
const logosRef = ref(null)
let locomotiveScroll = null

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  goal: '',
  websiteOption: '',
  websiteUrl: '',
  aboutBusiness: '',
  budget: 20000
})

const API_URL = 'http://localhost:5001/api'

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

const isValidPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/
  return phoneRegex.test(cleaned) && cleaned.length >= 10 && cleaned.length <= 13
}

const formatBudget = (amount) => {
  if (!amount) return '0'
  return new Intl.NumberFormat('en-IN').format(amount)
}

const nextStep = async () => {
  if (currentStep.value === 7) {
    await submitForm()
  } else {
    animateStepChange(() => {
      currentStep.value++
    })
  }
}

const prevStep = () => {
  animateStepChange(() => {
    currentStep.value--
  })
}

const animateStepChange = (callback) => {
  if (stepRef.value) {
    gsap.to(stepRef.value, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        callback()
        nextTick(() => {
          if (stepRef.value) {
            gsap.fromTo(stepRef.value, 
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.3 }
            )
          }
          if (locomotiveScroll) locomotiveScroll.update()
        })
      }
    })
  } else {
    callback()
  }
}

const submitForm = async () => {
  try {
    submitting.value = true
    
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      goal: formData.goal,
      websiteOption: formData.websiteOption,
      websiteUrl: formData.websiteOption === 'have' ? formData.websiteUrl : null,
      aboutBusiness: formData.aboutBusiness,
      budget: formData.budget && formData.budget > 0 ? formData.budget : null
    }
    
    console.log('Submitting form with payload:', payload)

    const response = await fetch(`${API_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      console.error('Server error:', errorData)
      throw new Error(errorData.error || `Server error: ${response.status}`)
    }

    const result = await response.json()
    console.log('Form submitted successfully:', result)
    
    animateStepChange(() => {
      currentStep.value = 8
    })
  } catch (error) {
    console.error('Error submitting form:', error)
    alert(`Failed to submit form: ${error.message || 'Please try again.'}`)
    submitting.value = false
  }
}

const animateLogos = () => {
  nextTick(() => {
    if (logosRef.value) {
      const logoItems = logosRef.value.querySelectorAll('img')
      gsap.fromTo(logoItems,
        { opacity: 0, y: 30 },
        { 
          opacity: 0.6, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          delay: 0.2
        }
      )
    }
  })
}

watch(currentStep, () => {
  nextTick(() => {
    if (stepRef.value && currentStep.value !== 8) {
      gsap.fromTo(stepRef.value,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 }
      )
    }
    animateLogos()
    if (locomotiveScroll) locomotiveScroll.update()
  })
})

onMounted(() => {
  // Initialize Locomotive Scroll
  locomotiveScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: false,
    resetNativeScroll: true
  })

  window.addEventListener('resize', () => {
    if (locomotiveScroll) locomotiveScroll.update()
  })

  animateLogos()

  setTimeout(() => {
    if (locomotiveScroll) locomotiveScroll.update()
  }, 500)
})

onUnmounted(() => {
  if (locomotiveScroll) {
    locomotiveScroll.destroy()
  }
})
</script>

<style scoped>
.step-content {
  min-height: 300px;
}

@media (min-width: 640px) {
  .step-content {
    min-height: 400px;
  }
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #000;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #000;
  cursor: pointer;
  border: none;
}
</style>

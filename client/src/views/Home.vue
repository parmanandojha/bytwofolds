<template>
  <div data-scroll-container class="min-h-screen bg-white overflow-x-hidden">
    <!-- Hero Section -->
    <section ref="heroRef" class="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      <!-- WebGL Background -->
      <WebGLBackground />
      
      <!-- Subtle grid background -->
      <div class="absolute inset-0 opacity-[0.03] z-0">
        <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 50px 50px;"></div>
      </div>
      
      <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
        <div class="mb-8 sm:mb-12 md:mb-16 flex justify-center" ref="logoRef">
          <img src="/twofolds.svg" alt="TwoFolds Logo" class="h-8 sm:h-10 brightness-0 invert opacity-90" />
        </div>
        
        <div class="text-center mb-8 sm:mb-10 md:mb-12">
          <div class="inline-block mb-2 sm:mb-3">
            <span class="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400 font-medium">Revenue-First Design</span>
          </div>
        </div>
        
        <h1 ref="headlineRef" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-6 sm:mb-8 leading-[1.1] max-w-5xl mx-auto tracking-tight text-center px-2">
          Most Websites are Just<br class="hidden sm:block" />
          <span class="font-normal italic text-gray-300">"Digital Paperweights."</span><br />
          <span class="font-normal">We Build High-Performance Revenue Engines.</span>
        </h1>
        
        <p ref="subheadlineRef" class="text-base sm:text-lg text-gray-400 mb-10 sm:mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed text-center font-light px-4">
          Stop wasting money on "pretty" websites that don't sell. We build custom-coded, lightning-fast digital assets designed to grab your customers by the throat and force them to take action.
        </p>
        
        <div class="flex justify-center px-4">
          <router-link
            ref="ctaRef"
            to="/form"
            class="group inline-flex items-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
          >
            <span>Get Your Strategic Call</span>
            <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- The Confrontation Section -->
    <section ref="confrontationRef" class="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="mb-12 sm:mb-16 md:mb-20">
          <div class="mb-3 sm:mb-4">
            <span class="text-xs uppercase tracking-widest text-gray-500 font-medium">The Problem</span>
          </div>
          <h2 ref="confrontationTitle" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-8 sm:mb-10 md:mb-12 leading-tight">
            The Brutal Truth About<br class="hidden sm:block" />
            <span class="font-normal">Your Current Website</span>
          </h2>
        </div>
        
        <div ref="confrontationCard" class="border-t border-gray-200 pt-8 sm:pt-12 md:pt-16 mb-12 sm:mb-16 md:mb-20">
          <p class="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 sm:mb-8 font-light">
            Most web agencies are "artists," not "business growth partners." They focus on fancy colors and "vibes" while your bounce rate skyrockets and your competitors steal your market share.
          </p>
          <p class="text-xl sm:text-2xl md:text-3xl text-gray-900 leading-tight font-normal">
            If your website isn't your #1 salesperson, it's a liability. At Two Folds, we don't just "design." We engineer digital experiences using latest technologies and best practices to create a website that not only looks great but also performs at its best.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          <div ref="feature1" class="border-t border-gray-200 pt-6 sm:pt-8">
            <div class="mb-4 sm:mb-6">
              <div class="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-lg sm:text-xl font-normal text-gray-900 mb-3 sm:mb-4">Built to Convert</h3>
            <p class="text-sm sm:text-base text-gray-600 leading-relaxed font-light">Every pixel is placed with one goal—getting you a lead.</p>
          </div>

          <div ref="feature2" class="border-t border-gray-200 pt-6 sm:pt-8">
            <div class="mb-4 sm:mb-6">
              <div class="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-lg sm:text-xl font-normal text-gray-900 mb-3 sm:mb-4">Insanely Fast</h3>
            <p class="text-sm sm:text-base text-gray-600 leading-relaxed font-light">No bloated templates. Clean code so your site loads before your customer can blink.</p>
          </div>

          <div ref="feature3" class="border-t border-gray-200 pt-6 sm:pt-8">
            <div class="mb-4 sm:mb-6">
              <div class="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-lg sm:text-xl font-normal text-gray-900 mb-3 sm:mb-4">Impossible to Ignore</h3>
            <p class="text-sm sm:text-base text-gray-600 leading-relaxed font-light">World-class animations that stop the scroll and build instant authority.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Section -->
    <section ref="serviceRef" class="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="mb-12 sm:mb-16 md:mb-20">
          <div class="mb-3 sm:mb-4">
            <span class="text-xs uppercase tracking-widest text-gray-500 font-medium">Our Approach</span>
          </div>
          <h2 ref="serviceTitle" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 sm:mb-8 leading-tight">
            Custom-Coded Excellence.<br class="hidden sm:block" />
            <span class="font-normal">No Templates. No Excuses.</span>
          </h2>
          <p class="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed font-light">
            We specialize in high-end, custom-built websites for businesses that refuse to look "average." Whether you are an interior designer in Delhi or a global tech firm, your digital front is your first impression. Make it count.
          </p>
        </div>

        <div class="space-y-12 sm:space-y-14 md:space-y-16">
          <div ref="service1" class="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start">
            <div class="w-full md:w-1/3">
              <div class="flex items-center gap-3 mb-3 sm:mb-4">
                <div class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                </div>
                <div class="text-xs uppercase tracking-widest text-gray-500 font-medium">01</div>
              </div>
              <h3 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Custom UI/UX Design</h3>
            </div>
            <div class="w-full md:w-2/3">
              <p class="text-gray-600 text-base sm:text-lg leading-relaxed font-light">A unique look that mirrors your brand's DNA. No "off-the-shelf" designs that make you look like everyone else.</p>
            </div>
          </div>

          <div ref="service2" class="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start">
            <div class="w-full md:w-1/3">
              <div class="flex items-center gap-3 mb-3 sm:mb-4">
                <div class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div class="text-xs uppercase tracking-widest text-gray-500 font-medium">02</div>
              </div>
              <h3 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">GSAP & High-End Animations</h3>
            </div>
            <div class="w-full md:w-2/3">
              <p class="text-gray-600 text-base sm:text-lg leading-relaxed font-light">We use "Awwwards-level" motion graphics to create a cinematic experience that keeps users engaged.</p>
            </div>
          </div>

          <div ref="service3" class="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start">
            <div class="w-full md:w-1/3">
              <div class="flex items-center gap-3 mb-3 sm:mb-4">
                <div class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div class="text-xs uppercase tracking-widest text-gray-500 font-medium">03</div>
              </div>
              <h3 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Mobile-First Architecture</h3>
            </div>
            <div class="w-full md:w-2/3">
              <p class="text-gray-600 text-base sm:text-lg leading-relaxed font-light">80% of your traffic is on a phone. We ensure your mobile experience is smoother than a desktop.</p>
            </div>
          </div>

          <div ref="service4" class="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start">
            <div class="w-full md:w-1/3">
              <div class="flex items-center gap-3 mb-3 sm:mb-4">
                <div class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <div class="text-xs uppercase tracking-widest text-gray-500 font-medium">04</div>
              </div>
              <h3 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">SEO-Ready Foundation</h3>
            </div>
            <div class="w-full md:w-2/3">
              <p class="text-gray-600 text-base sm:text-lg leading-relaxed font-light">We don't just build for humans; we build for Google. Our clean code ensures you rank higher, faster.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why We Are Different -->
    <section ref="differentRef" class="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-black text-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="mb-12 sm:mb-16 md:mb-20">
          <div class="mb-3 sm:mb-4">
            <span class="text-xs uppercase tracking-widest text-gray-400 font-medium">The Difference</span>
          </div>
          <h2 ref="differentTitle" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 sm:mb-8 leading-tight">
            Why Businesses Trust Us<br class="hidden sm:block" />
            <span class="font-normal">to Build Their Digital Future</span>
          </h2>
        </div>

        <div ref="comparisonCard" class="border-t border-b border-white/10 py-10 sm:py-12 md:py-16">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16">
            <div>
              <div class="mb-8">
                <span class="text-xs uppercase tracking-widest text-gray-400 mb-4 block font-medium">The "Average" Agency</span>
                <div class="w-16 h-px bg-white/20 mb-6"></div>
              </div>
              <ul class="space-y-6">
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span class="text-gray-300 font-light">Uses slow, clunky WordPress templates.</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span class="text-gray-300 font-light">Focuses on "Looking Nice."</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span class="text-gray-300 font-light">Leaves you hanging after launch.</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span class="text-gray-300 font-light">Hidden fees and messy code.</span>
                </li>
              </ul>
            </div>

            <div>
              <div class="mb-8">
                <span class="text-xs uppercase tracking-widest text-gray-400 mb-4 block font-medium">TwoFolds</span>
                <div class="w-16 h-px bg-white/20 mb-6"></div>
              </div>
              <ul class="space-y-6">
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-white font-light">Custom-coded for speed and security.</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-white font-light">Focuses on Result Driven and Conversions.</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-white font-light">Provides a Growth Roadmap for the future.</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-white font-light">Transparent pricing and clean architecture.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Section -->
    <section ref="portfolioRef" class="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="mb-12 sm:mb-16 md:mb-20">
          <div class="mb-3 sm:mb-4">
            <span class="text-xs uppercase tracking-widest text-gray-500 font-medium">Portfolio</span>
          </div>
          <h2 ref="portfolioTitle" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 sm:mb-8 leading-tight">
            See the Results<br class="hidden sm:block" />
            <span class="font-normal">for Yourself</span>
          </h2>
          <p class="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed font-light">
            Don't take our word for it. See the high-performance assets we've built for industry leaders.
          </p>
        </div>

        <div class="space-y-12 sm:space-y-14 md:space-y-16">
          <div ref="portfolio1" class="border-t border-gray-200 pt-8 sm:pt-10 md:pt-12">
            <div class="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start">
              <div class="w-full md:w-1/2">
                <div class="mb-4 sm:mb-6 overflow-hidden rounded-sm border border-gray-200 bg-white">
                  <a href="https://narasha.com" target="_blank" class="block group">
                    <img 
                      src="/logos/narasha.png" 
                      alt="Narasha.com Website Screenshot"
                      class="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                      @error="handlePortfolioImageError($event)"
                    />
                  </a>
                </div>
              </div>
              <div class="w-full md:w-1/2">
                <h3 class="text-xl sm:text-2xl font-normal text-gray-900 mb-2">Narasha.com</h3>
                <p class="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 font-light">E-commerce Excellence</p>
                <a href="https://narasha.com" target="_blank" class="inline-flex items-center gap-2 text-sm sm:text-base text-gray-900 hover:text-gray-600 font-light border-b border-gray-900 hover:border-gray-600 transition-colors pb-1">
                  View Site
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div ref="portfolio2" class="border-t border-gray-200 pt-8 sm:pt-10 md:pt-12">
            <div class="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start">
              <div class="w-full md:w-1/2">
                <div class="mb-4 sm:mb-6 overflow-hidden rounded-sm border border-gray-200 bg-white">
                  <a href="https://smarttek.co.th" target="_blank" class="block group">
                    <img 
                      src="/logos/smarttek.png" 
                      alt="Smarttek.co.th Website Screenshot"
                      class="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                      @error="handlePortfolioImageError($event)"
                    />
                  </a>
                </div>
              </div>
              <div class="w-full md:w-1/2">
                <h3 class="text-xl sm:text-2xl font-normal text-gray-900 mb-2">Smarttek.co.th</h3>
                <p class="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 font-light">Technical Authority</p>
                <a href="https://smarttek.co.th" target="_blank" class="inline-flex items-center gap-2 text-sm sm:text-base text-gray-900 hover:text-gray-600 font-light border-b border-gray-900 hover:border-gray-600 transition-colors pb-1">
                  View Site
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div ref="portfolio3" class="border-t border-gray-200 pt-8 sm:pt-10 md:pt-12">
            <div class="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start">
              <div class="w-full md:w-1/2">
                <div class="mb-4 sm:mb-6 overflow-hidden rounded-sm border border-gray-200 bg-white">
                  <a href="https://pransform.com" target="_blank" class="block group">
                    <img 
                      src="/logos/pransform.png" 
                      alt="Pransform.com Website Screenshot"
                      class="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                      @error="handlePortfolioImageError($event)"
                    />
                  </a>
                </div>
              </div>
              <div class="w-full md:w-1/2">
                <h3 class="text-xl sm:text-2xl font-normal text-gray-900 mb-2">Pransform.com</h3>
                <p class="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 font-light">Service-Based Conversion</p>
                <a href="https://pransform.com" target="_blank" class="inline-flex items-center gap-2 text-sm sm:text-base text-gray-900 hover:text-gray-600 font-light border-b border-gray-900 hover:border-gray-600 transition-colors pb-1">
                  View Site
                  <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trusted By Logos -->
    <section class="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 border-t border-gray-200">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="mb-8 sm:mb-10 md:mb-12 text-center">
          <span class="text-xs uppercase tracking-widest text-gray-500 font-medium">Trusted by</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 md:gap-16 items-center justify-items-center">
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
    </section>

    <!-- Process Section -->
    <section ref="processRef" class="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="mb-12 sm:mb-16 md:mb-20">
          <div class="mb-3 sm:mb-4">
            <span class="text-xs uppercase tracking-widest text-gray-500 font-medium">How We Work</span>
          </div>
          <h2 ref="processTitle" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 sm:mb-8 leading-tight">
            Our Process<br class="hidden sm:block" />
            <span class="font-normal">From Concept to Launch</span>
          </h2>
          <p class="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed font-light">
            A streamlined approach that ensures your website is built right, launched fast, and performs from day one.
          </p>
        </div>

        <div class="space-y-12 sm:space-y-14 md:space-y-16">
          <div ref="process1" class="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start">
            <div class="w-full md:w-1/4">
              <div class="flex items-center gap-3 mb-3 sm:mb-4">
                <div class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-gray-900 rounded-full">
                  <span class="text-sm sm:text-base font-normal text-gray-900">01</span>
                </div>
              </div>
            </div>
            <div class="w-full md:w-3/4">
              <h3 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Discovery & Strategy</h3>
              <p class="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
                We start with a deep dive into your business, goals, and target audience. This isn't just a chat—it's a strategic audit that identifies exactly what's needed to convert visitors into customers.
              </p>
            </div>
          </div>

          <div ref="process2" class="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start">
            <div class="w-full md:w-1/4">
              <div class="flex items-center gap-3 mb-3 sm:mb-4">
                <div class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-gray-900 rounded-full">
                  <span class="text-sm sm:text-base font-normal text-gray-900">02</span>
                </div>
              </div>
            </div>
            <div class="w-full md:w-3/4">
              <h3 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Design & Development</h3>
              <p class="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
                Our team creates custom designs that aren't just beautiful—they're conversion-focused. Then we build with clean, fast code that Google loves and users trust.
              </p>
            </div>
          </div>

          <div ref="process3" class="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start">
            <div class="w-full md:w-1/4">
              <div class="flex items-center gap-3 mb-3 sm:mb-4">
                <div class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-gray-900 rounded-full">
                  <span class="text-sm sm:text-base font-normal text-gray-900">03</span>
                </div>
              </div>
            </div>
            <div class="w-full md:w-3/4">
              <h3 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Testing & Optimization</h3>
              <p class="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
                Before launch, we test everything. Speed, mobile responsiveness, SEO, and user experience. We fix issues before your customers see them.
              </p>
            </div>
          </div>

          <div ref="process4" class="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-start">
            <div class="w-full md:w-1/4">
              <div class="flex items-center gap-3 mb-3 sm:mb-4">
                <div class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-gray-900 rounded-full">
                  <span class="text-sm sm:text-base font-normal text-gray-900">04</span>
                </div>
              </div>
            </div>
            <div class="w-full md:w-3/4">
              <h3 class="text-xl sm:text-2xl font-normal text-gray-900 mb-3 sm:mb-4">Launch & Growth</h3>
              <p class="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
                We launch your site and provide a growth roadmap. You don't just get a website—you get a partner committed to your long-term success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section ref="faqRef" class="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        <div class="mb-12 sm:mb-16 md:mb-20">
          <div class="mb-3 sm:mb-4">
            <span class="text-xs uppercase tracking-widest text-gray-500 font-medium">FAQ</span>
          </div>
          <h2 ref="faqTitle" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 sm:mb-8 leading-tight">
            Frequently Asked<br class="hidden sm:block" />
            <span class="font-normal">Questions</span>
          </h2>
          <p class="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed font-light">
            Everything you need to know before getting started.
          </p>
        </div>

        <div class="space-y-4 sm:space-y-6">
          <div ref="faq1" class="border-t border-gray-200 pt-6 sm:pt-8">
            <h3 class="text-lg sm:text-xl font-normal text-gray-900 mb-3 sm:mb-4">How long does it take to build a website?</h3>
            <p class="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
              Typically, a custom website takes 4-8 weeks from start to launch. This includes design, development, testing, and optimization. Complex projects may take longer, but we'll provide a clear timeline during our initial consultation.
            </p>
          </div>

          <div ref="faq2" class="border-t border-gray-200 pt-6 sm:pt-8">
            <h3 class="text-lg sm:text-xl font-normal text-gray-900 mb-3 sm:mb-4">Do you work with businesses outside of India?</h3>
            <p class="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
              Yes, absolutely. While we're based in India, we work with clients globally. Our process is designed to work seamlessly across time zones, and we're experienced in creating websites for international markets.
            </p>
          </div>

          <div ref="faq3" class="border-t border-gray-200 pt-6 sm:pt-8">
            <h3 class="text-lg sm:text-xl font-normal text-gray-900 mb-3 sm:mb-4">What's included in your website package?</h3>
            <p class="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
              Every project includes custom design, responsive development, SEO optimization, mobile-first architecture, and a growth roadmap. We also provide training on how to manage your content and ongoing support.
            </p>
          </div>

          <div ref="faq4" class="border-t border-gray-200 pt-6 sm:pt-8">
            <h3 class="text-lg sm:text-xl font-normal text-gray-900 mb-3 sm:mb-4">Can you redesign my existing website?</h3>
            <p class="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
              Yes. We specialize in both new builds and complete redesigns. We'll audit your current site, identify what's not working, and rebuild it with modern technology and conversion-focused design.
            </p>
          </div>

          <div ref="faq5" class="border-t border-gray-200 pt-6 sm:pt-8">
            <h3 class="text-lg sm:text-xl font-normal text-gray-900 mb-3 sm:mb-4">Do you provide ongoing support after launch?</h3>
            <p class="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
              Yes. We offer maintenance packages and ongoing support. We also provide a growth roadmap to help you scale your website as your business grows. You're not just getting a website—you're getting a long-term partner.
            </p>
          </div>

          <div ref="faq6" class="border-t border-gray-200 pt-6 sm:pt-8">
            <h3 class="text-lg sm:text-xl font-normal text-gray-900 mb-3 sm:mb-4">What makes you different from other agencies?</h3>
            <p class="text-base sm:text-lg text-gray-600 leading-relaxed font-light">
              We don't use templates. We don't use bloated page builders. We build custom-coded, high-performance websites that are designed to convert. Every pixel is intentional, every line of code is clean, and every decision is data-driven.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section ref="finalCtaRef" class="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-black text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        <div class="mb-8 sm:mb-10 md:mb-12">
          <span class="text-xs uppercase tracking-widest text-gray-400 font-medium">Get Started</span>
        </div>
        <h2 ref="finalCtaTitle" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-8 sm:mb-10 md:mb-12 leading-tight">
          Ready to Stop Losing Leads<br class="hidden sm:block" />
          <span class="font-normal">to Your Competitors?</span>
        </h2>
        
        <p class="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 leading-relaxed font-light max-w-2xl mx-auto">
          Don't hire us yet. First, let us prove we know our stuff.
        </p>
        
        <p class="text-sm sm:text-base text-gray-300 mb-8 sm:mb-10 md:mb-12 leading-relaxed font-light max-w-2xl mx-auto px-2">
          Claim your <span class="text-white font-normal">100% FREE Strategic Call for Your Result Driven Website for Your Business</span> ($500 Value). We will audit your current site (or your idea) and tell you exactly what is stopping you from making more money online.
        </p>

        <div class="mb-8 sm:mb-10 md:mb-12 inline-block border border-white/20 px-4 sm:px-6 py-3 sm:py-4">
          <p class="text-xs sm:text-sm text-white font-light italic">
            ⚠️ Warning: We only take on 4 new projects per month to ensure quality. Secure your spot now.
          </p>
        </div>

        <router-link
          to="/form"
          class="group inline-flex items-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-normal px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300 text-xs sm:text-sm uppercase tracking-wider"
        >
          <span>Get Your Strategic Call</span>
          <svg class="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
          </svg>
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black text-white py-6 sm:py-8">
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
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import LocomotiveScroll from 'locomotive-scroll'
import WebGLBackground from '../components/WebGLBackground.vue'

const heroRef = ref(null)
const logoRef = ref(null)
const headlineRef = ref(null)
const subheadlineRef = ref(null)
const ctaRef = ref(null)
const confrontationRef = ref(null)
const confrontationTitle = ref(null)
const confrontationCard = ref(null)
const feature1 = ref(null)
const feature2 = ref(null)
const feature3 = ref(null)
const serviceRef = ref(null)
const serviceTitle = ref(null)
const service1 = ref(null)
const service2 = ref(null)
const service3 = ref(null)
const service4 = ref(null)
const differentRef = ref(null)
const differentTitle = ref(null)
const comparisonCard = ref(null)
const portfolioRef = ref(null)
const portfolioTitle = ref(null)
const portfolio1 = ref(null)
const portfolio2 = ref(null)
const portfolio3 = ref(null)
const processRef = ref(null)
const processTitle = ref(null)
const process1 = ref(null)
const process2 = ref(null)
const process3 = ref(null)
const process4 = ref(null)
const faqRef = ref(null)
const faqTitle = ref(null)
const faq1 = ref(null)
const faq2 = ref(null)
const faq3 = ref(null)
const faq4 = ref(null)
const faq5 = ref(null)
const faq6 = ref(null)
const finalCtaRef = ref(null)
const finalCtaTitle = ref(null)
const scrollContainer = ref(null)
let locomotiveScroll = null

// Handle portfolio image errors - show placeholder
const handlePortfolioImageError = (event) => {
  const img = event.target
  const container = img.closest('.overflow-hidden')
  if (container) {
    img.style.display = 'none'
    container.innerHTML = `
      <div class="aspect-[16/10] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div class="text-gray-400 text-sm font-light">Screenshot coming soon</div>
      </div>
    `
  }
}

onMounted(() => {
  // Initialize Locomotive Scroll
  locomotiveScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: false,
    resetNativeScroll: true
  })

  // Update scroll on window resize
  window.addEventListener('resize', () => {
    if (locomotiveScroll) locomotiveScroll.update()
  })
  nextTick(() => {
    // Subtle hero animations
    if (logoRef.value) {
      gsap.fromTo(logoRef.value,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power2.out' }
      )
    }

    if (headlineRef.value) {
      gsap.fromTo(headlineRef.value,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.3 }
      )
    }

    if (subheadlineRef.value) {
      gsap.fromTo(subheadlineRef.value,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power2.out' }
      )
    }

    if (ctaRef.value) {
      gsap.fromTo(ctaRef.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.9, ease: 'power2.out' }
      )
    }

    // Scroll-triggered animations - subtle and refined
    const animateOnScroll = (element, delay = 0) => {
      if (!element) return
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo(entry.target,
              { opacity: 0, y: 40 },
              { 
                opacity: 1, 
                y: 0,
                duration: 1, 
                delay, 
                ease: 'power2.out' 
              }
            )
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.1 })

      observer.observe(element)
    }

    // Animate all sections with subtle timing
    animateOnScroll(confrontationTitle.value, 0.1)
    animateOnScroll(confrontationCard.value, 0.2)
    animateOnScroll(feature1.value, 0)
    animateOnScroll(feature2.value, 0.1)
    animateOnScroll(feature3.value, 0.2)
    animateOnScroll(serviceTitle.value, 0.1)
    animateOnScroll(service1.value, 0)
    animateOnScroll(service2.value, 0.1)
    animateOnScroll(service3.value, 0.2)
    animateOnScroll(service4.value, 0.3)
    animateOnScroll(differentTitle.value, 0.1)
    animateOnScroll(comparisonCard.value, 0.2)
    animateOnScroll(portfolioTitle.value, 0.1)
    animateOnScroll(portfolio1.value, 0)
    animateOnScroll(portfolio2.value, 0.1)
    animateOnScroll(portfolio3.value, 0.2)
    animateOnScroll(processTitle.value, 0.1)
    animateOnScroll(process1.value, 0)
    animateOnScroll(process2.value, 0.1)
    animateOnScroll(process3.value, 0.2)
    animateOnScroll(process4.value, 0.3)
    animateOnScroll(faqTitle.value, 0.1)
    animateOnScroll(faq1.value, 0)
    animateOnScroll(faq2.value, 0.1)
    animateOnScroll(faq3.value, 0.2)
    animateOnScroll(faq4.value, 0.3)
    animateOnScroll(faq5.value, 0.4)
    animateOnScroll(faq6.value, 0.5)
    animateOnScroll(finalCtaTitle.value, 0.1)

    // Update Locomotive Scroll after animations
    setTimeout(() => {
      if (locomotiveScroll) locomotiveScroll.update()
    }, 1000)
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

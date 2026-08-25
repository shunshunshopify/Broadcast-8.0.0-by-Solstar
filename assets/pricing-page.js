/**
 * Enables Broadcast's existing AOS styles on the pricing template without
 * changing the store-wide animation preference.
 */
(() => {
  if (document.body.dataset.animations === 'true') return;

  const animated = new WeakSet();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const reveal = (elements) => {
    elements.forEach((element) => element.classList.add('aos-animate'));
  };

  const observe = (scope = document) => {
    const elements = [...scope.querySelectorAll('[data-aos]:not(.aos-animate)')].filter(
      (element) => !animated.has(element)
    );

    if (!elements.length) return;

    elements.forEach((element) => animated.add(element));

    if (reducedMotion || !('IntersectionObserver' in window)) {
      reveal(elements);
      return;
    }

    const individualObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    const anchorGroups = new Map();

    elements.forEach((element) => {
      const selector = element.dataset.aosAnchor;

      if (!selector) {
        individualObserver.observe(element);
        return;
      }

      let anchor = null;
      try {
        anchor = document.querySelector(selector);
      } catch (error) {
        // Invalid selectors fall back to observing the animated element.
      }

      if (!anchor) {
        individualObserver.observe(element);
        return;
      }

      const group = anchorGroups.get(anchor) || [];
      group.push(element);
      anchorGroups.set(anchor, group);
    });

    const anchorObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(anchorGroups.get(entry.target) || []);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    anchorGroups.forEach((elementsInGroup, anchor) => anchorObserver.observe(anchor));
  };

  observe();
  document.addEventListener('shopify:section:load', (event) => observe(event.target));
})();

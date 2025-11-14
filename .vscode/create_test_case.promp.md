---
tools: ['playwright']
mode: 'agent'
---
- When asked to explore a website:
  1. Navigate to the specified URL in the browser.
  2. Explore key functionality of the site.
- Create end to end test for the key functionality of the site.
  1. Page Object Model (POM) - To centralize selectors and actions.
    - Define the selectors as contant.
  2. Custom fixtures - For reusable functions.
  3. Centralized constants - For URLs and credentials.
  4. Centralized constants - For mock data.
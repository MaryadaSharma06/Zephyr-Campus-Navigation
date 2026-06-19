# Zephyr Premium UI - Quick Reference Guide

## 🚀 Quick Start Code Snippets

### 1. Basic Page Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Page - Zephyr</title>
  <!-- Import premium theme FIRST -->
  <link rel="stylesheet" href="premium-theme.css">
  <!-- Then your page-specific styles -->
  <link rel="stylesheet" href="your-page.css">
  <!-- Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
</head>
<body>
  <!-- Your content here -->
</body>
</html>
```

---

### 2. Premium Navigation

```html
<nav class="navbar">
  <div class="nav-container">
    <div class="nav-logo">
      <img src="IMG_4164 (1).PNG" alt="Logo" class="logo-image">
      <span>Zephyr</span>
    </div>
    
    <div class="nav-links">
      <a href="page1.html">Navigation 1</a>
      <a href="page2.html">Navigation 2</a>
      <a href="login-signup.html">
        <button class="sign-in-btn">LOGIN / SIGNUP</button>
      </a>
    </div>
  </div>
</nav>
```

---

### 3. Buttons

**Primary Button:**
```html
<button class="btn btn-primary">Click Me</button>
```

**Secondary Button:**
```html
<button class="btn btn-secondary">Secondary</button>
```

**Outline Button:**
```html
<button class="btn btn-outline">Outline</button>
```

**Different Sizes:**
```html
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-lg">Large</button>
```

---

### 4. Cards

**Basic Card:**
```html
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    <p>Your content here</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

**Image Card (Featured):**
```html
<div class="card">
  <img src="image.jpg" alt="Featured">
  <div>
    <h3>Location Name</h3>
    <p>Description goes here</p>
    <button class="btn btn-primary btn-sm">Explore</button>
  </div>
</div>
```

---

### 5. Grid Layouts

**2-Column Grid:**
```html
<div class="grid grid-2">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
</div>
```

**3-Column Grid:**
```html
<div class="grid grid-3">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

**4-Column Grid:**
```html
<div class="grid grid-4">
  <div class="card">1</div>
  <div class="card">2</div>
  <div class="card">3</div>
  <div class="card">4</div>
</div>
```

---

### 6. Forms

**Basic Form Group:**
```html
<div class="form-group">
  <label for="email">Email Address</label>
  <input type="email" id="email" name="email" placeholder="your@email.com">
</div>
```

**Text Area:**
```html
<div class="form-group">
  <label for="message">Message</label>
  <textarea id="message" name="message" placeholder="Your message..."></textarea>
</div>
```

**Complete Form:**
```html
<form>
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message"></textarea>
  </div>

  <button type="submit" class="btn btn-primary">Send Message</button>
</form>
```

---

### 7. Hero Section

```html
<div class="hero">
  <img src="hero-image.jpg" alt="Hero">
  <div class="hero-content">
    <h1>Welcome to Zephyr</h1>
    <p>Discover amazing things</p>
    <button class="btn btn-primary">Get Started</button>
  </div>
</div>
```

---

### 8. Animations

**Fade In:**
```html
<div class="animate-fade-in">Content fades in</div>
```

**Slide In Up:**
```html
<div class="animate-slide-in-up">Slides in from bottom</div>
```

**Slide In Left:**
```html
<div class="animate-slide-in-left">Slides in from left</div>
```

**Scale In:**
```html
<div class="animate-scale-in">Scales in from small</div>
```

---

### 9. Footer

```html
<footer>
  <div class="container">
    <div class="footer-container">
      <div class="footer-column">
        <h4>About</h4>
        <p>Zephyr - Campus Navigation</p>
      </div>

      <div class="footer-column">
        <h4>Quick Links</h4>
        <a href="#">Home</a>
        <a href="#">Gallery</a>
        <a href="#">Contact</a>
      </div>

      <div class="footer-column">
        <h4>Connect</h4>
        <div class="social-icons">
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <p>&copy; 2024 Zephyr. All rights reserved.</p>
  </div>
</footer>
```

---

### 10. Utility Classes

**Spacing:**
```html
<div class="mt-lg">Margin top large</div>
<div class="mb-md">Margin bottom medium</div>
<div class="mt-xl mb-lg">Multiple margins</div>
```

**Text Alignment:**
```html
<div class="text-center">Centered text</div>
<div class="text-right">Right-aligned text</div>
```

**Opacity:**
```html
<div class="opacity-50">50% opacity</div>
<div class="opacity-75">75% opacity</div>
```

**Borders & Shadows:**
```html
<div class="rounded shadow-md">Rounded with shadow</div>
<div class="rounded-lg shadow-lg">More rounded, bigger shadow</div>
```

**Flexbox:**
```html
<div class="flex">Flex container with gap</div>
<div class="flex flex-col">Flex column</div>
<div class="flex flex-between">Space between</div>
<div class="flex flex-center">Centered</div>
```

---

## 🎨 CSS Variables Reference

### Colors
```css
--primary-color: #0066cc;
--primary-dark: #0052a3;
--primary-light: #e6f2ff;
--secondary-color: #00d4ff;
--accent-color: #667eea;
--accent-dark: #764ba2;
--success-color: #10b981;
--warning-color: #f59e0b;
--danger-color: #ef4444;
--info-color: #0284c7;
```

### Spacing
```css
--spacing-xs: 0.25rem;      /* 4px */
--spacing-sm: 0.5rem;       /* 8px */
--spacing-md: 1rem;         /* 16px */
--spacing-lg: 1.5rem;       /* 24px */
--spacing-xl: 2rem;         /* 32px */
--spacing-2xl: 3rem;        /* 48px */
--spacing-3xl: 4rem;        /* 64px */
```

### Border Radius
```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

### Shadows
```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

### Transitions
```css
--transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 🔧 Common Customizations

### Change Primary Color
```css
:root {
  --primary-color: #your-color;
}
```

### Change Spacing Scale
```css
:root {
  --spacing-md: 1.2rem; /* Make everything more spacious */
}
```

### Add New Animation
```css
@keyframes myAnimation {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-my-anim {
  animation: myAnimation 0.5s ease-out;
}
```

### Change Font
```css
body {
  font-family: 'Your Font', sans-serif;
}
```

---

## ✅ Best Practices

1. **Always import premium-theme.css first**
   ```html
   <link rel="stylesheet" href="premium-theme.css">
   <link rel="stylesheet" href="page-styles.css">
   ```

2. **Use CSS variables for consistency**
   ```css
   color: var(--primary-color);  /* ✅ Good */
   color: #0066cc;               /* ❌ Avoid */
   ```

3. **Combine utility classes efficiently**
   ```html
   <div class="card mt-lg mb-lg shadow-lg">  /* ✅ Good */
   <div class="card">                        /* ❌ Incomplete */
   ```

4. **Use semantic HTML**
   ```html
   <div class="card">                  /* ✅ Semantic */
   <div class="box">                   /* ❌ Generic */
   ```

5. **Test on mobile**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

---

## 🐛 Troubleshooting

**Styles not applying?**
- Ensure `premium-theme.css` is imported
- Check file paths are correct
- Clear browser cache

**Colors look different?**
- Check CSS variable values
- Inspect element to see applied styles
- Verify color contrast

**Animations not working?**
- Check browser support
- Verify class names are correct
- Use `--transition-base` for standard animations

**Responsive not working?**
- Verify viewport meta tag
- Check media queries in dev tools
- Test at exact breakpoints

---

## 📱 Responsive Breakpoints

```css
/* Mobile First - Default styles are mobile */

/* Tablet: 768px and up */
@media (min-width: 768px) {
  /* Tablet styles */
}

/* Desktop: 1024px and up */
@media (min-width: 1024px) {
  /* Desktop styles */
}

/* Large Desktop: 1280px and up */
@media (min-width: 1280px) {
  /* Large desktop styles */
}
```

---

## 🎓 Learning Resources

- Study `login-signup.html` for form examples
- Review `homepage.css` for real-world implementations
- Check `premium-theme.css` for component definitions
- Read `DESIGN_GUIDE.md` for comprehensive documentation

---

**Happy coding with Zephyr Premium UI!** 🚀

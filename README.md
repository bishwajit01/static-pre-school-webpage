# static-pre-school-webpage
A Step Ahead Preschool is a responsive static website designed for a Ranchi-based preschool to showcase programs, safety practices, parent testimonials, and contact details while enabling quick admission enquiries through a simple, mobile-friendly interface.


# A Step Ahead Preschool - Static Website

This folder contains a responsive static marketing website for **A Step Ahead Preschool, Ranchi**.

The site is built using plain HTML, CSS, and JavaScript, and is designed to run directly in a browser without a backend.

## Project Path

`/Users/bishwajit.vikram/@SourceCode/personal/Websites/AStepAhead_1.4`

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Google Fonts (`Nunito`)

## Main Features

- Responsive layout for desktop and mobile
- Sticky header with mobile navigation toggle
- Hero section with CTA actions
- Auto-discovered image slider from `images/slide*.webp`
- Program sections (Playgroup, Nursery, LKG, UKG)
- Curriculum carousel
- Animated stats counters (Intersection Observer)
- Testimonials carousel with dots and autoplay
- FAQ accordion
- Enquiry form with client-side validation
- Toast feedback and WhatsApp redirect flow on enquiry submit
- Contact section with map embed, call, email, and WhatsApp links
- Floating back-to-top button

## Folder Structure

```text
AStepAhead_1.4/
├── AStepAhead.html      # Main page markup
├── AStepAhead.css       # Styling and responsive design
├── AStepAhead.js        # UI interactions and animations
├── ReadMe.md            # Project documentation
├── images/
│   ├── slide1.webp
│   ├── slide2.webp
│   ├── slide3.webp
│   ├── slide4.webp
│   └── slide5.webp
└── qrcode/
	├── qrcode.png
	└── qrcode.webp
```

## Run Locally

### Option 1: Open directly

Open `AStepAhead.html` in any modern browser.

### Option 2: Serve with a local HTTP server (recommended)

From this folder:

```bash
python3 -m http.server 8000
```

Then visit:

`http://localhost:8000/AStepAhead.html`

## Important Configuration

### 1) WhatsApp number in form submission

In `AStepAhead.js`, update this placeholder:

```js
const whatsapp = `https://wa.me/91XXXXXXXXXX?text=${msg}`;
```

Replace `91XXXXXXXXXX` with your actual WhatsApp number in international format (country code + number, no `+` or spaces).

### 2) Contact details

Verify and update contact details in `AStepAhead.html`:

- Phone links (`tel:`)
- Email link (`mailto:`)
- WhatsApp links (`wa.me`)
- Address text
- Maps URL/embed link

## Image Slider Rules

The hero image slider auto-discovers files using this pattern:

- `images/slide1.webp`
- `images/slide2.webp`
- `images/slide3.webp`
- ...

Notes:

- Current discovery checks only `.webp` files.
- Images must be sequentially named.
- The scanner stops after several misses to avoid long probing.

## Accessibility Notes

- Semantic sections and landmark structure
- `aria-label` usage on interactive controls
- Keyboard-friendly buttons and links
- Live region toast for form status updates

## Browser Compatibility

Works on current versions of:

- Chrome
- Edge
- Firefox
- Safari

## Deployment

This is a static site and can be deployed to any static host, such as:

- GitHub Pages
- Netlify
- Vercel (static)
- AWS S3 + CloudFront
- Nginx / Apache static hosting

## Future Improvements

- Replace simulated form submission with real backend/API integration
- Add analytics (GA4 or privacy-friendly alternative)
- Add sitemap and robots.txt for SEO
- Compress and pre-optimize images further
- Add unit tests for JS utilities and form validation logic

---

If you maintain multiple versions (`AStepAhead_1.3`, `AStepAhead_1.4`, etc.), keep this README version-specific so behavior changes remain clearly documented.

# DHANABHON.COM | Terminal Portfolio

An interactive web terminal portfolio showcasing a command-line interface aesthetic. Experience a unique portfolio presentation through terminal commands.

**Live Demo**: [https://dhanabhon.github.io/](https://dhanabhon.github.io/)

## Features

- **Interactive Terminal Interface** - Command-based navigation
- **Password-Protected Easter Eggs** - Hidden commands and secrets
- **Responsive Design** - Works on desktop and mobile devices
- **Accessible** - ARIA labels and semantic HTML
- **Secure** - XSS protection and secure external link handling
- **Custom Animations** - Typing effects and smooth transitions
- **Command History** - Navigate previous commands with arrow keys

## Quick Start

Simply open `index.html` in a web browser, or visit the live site. Type `help` to see available commands.

### Available Commands

- `help` - Display all available commands
- `whois` - Learn about Tom
- `whoami` - Visit the main portfolio site
- `socials` - View social media links
- `projects` - View GitHub projects
- `email` - Get contact email
- `history` - View command history
- `clear` - Clear the terminal
- `banner` - Display the header
- `secret` - Find the hidden password (hint: check the console!)
- And more...

## Technology Stack

- **HTML5** - Semantic markup with ARIA accessibility
- **CSS3** - Custom animations and responsive design
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JavaScript
- **GitHub Pages** - Static site hosting

## Recent Enhancements (v2.0.0)

### Security Improvements ✅
- Fixed XSS vulnerabilities by sanitizing user input
- Added `noopener noreferrer` to external links
- Implemented HTML escaping for all user-generated content
- Wrapped code in IIFEs to prevent global namespace pollution

### Code Quality ✅
- Replaced deprecated `keyCode` API with modern `key` API
- Added comprehensive JSDoc comments
- Implemented error handling throughout
- Removed inline event handlers
- Added constants for magic numbers
- Improved variable naming (e.g., `git` → `historyIndex`)
- Reduced code duplication with helper functions

### Accessibility ✅
- Added semantic HTML (`<main>`, proper roles)
- Implemented ARIA labels and live regions
- Added `lang` attribute to HTML
- Improved keyboard navigation
- Added screen reader support

### SEO ✅
- Added comprehensive meta tags
- Implemented Open Graph tags for social media
- Added Twitter Card metadata
- Included canonical URL
- Optimized page title and description

## Project Structure

```
dhanabhon.github.io/
├── index.html          # Main HTML with semantic structure
├── css/
│   └── style.css       # Terminal styling and animations
├── js/
│   ├── main.js         # Core terminal logic and commands
│   ├── commands.js     # Command data and content
│   └── caret.js        # Cursor and input handling
├── img/
│   └── favicon.ico     # Site favicon
├── README.md           # This file
└── LICENCE             # MIT License
```

## Development

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/dhanabhon/dhanabhon.github.io.git
cd dhanabhon.github.io
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js with http-server
npx http-server
```

3. Make your changes and test locally

### Code Style

- Use ES6+ JavaScript features
- Follow JSDoc commenting standards
- Maintain 2-space indentation
- Use meaningful variable names
- Add error handling for all functions

### Adding New Commands

1. Add command data to `js/commands.js`
2. Add case handler in `commander()` function in `js/main.js`
3. Update the `help` array in `commands.js`

Example:
```javascript
// In commands.js
const myNewCommand = [
  "<br>",
  "This is my new command output",
  "<br>"
];

// In main.js commander() function
case "mycommand":
  loopLines(myNewCommand, "color2 margin", 80);
  break;
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Load Time**: < 1 second
- **Total Size**: ~1.2 MB
- **No External Dependencies**: All assets are self-contained

## Security

This project follows security best practices:
- Input sanitization to prevent XSS
- Secure external link handling
- No eval() or unsafe code execution
- Content Security Policy ready

## License

This project is licensed under the MIT License - see the [LICENCE](LICENCE) file for details.

## Credits

- Original inspiration: [FKCODES](https://fkcodes.com/)
- Developed by: [Tom Dhanabhon](https://dhanabhon.com/)
- Enhanced with security, accessibility, and modern best practices

## Contact

- **Email**: tom@dhanabhon.com
- **Twitter**: [@TomDhanabhon](https://twitter.com/TomDhanabhon)
- **LinkedIn**: [dhanabhon](https://www.linkedin.com/in/dhanabhon/)
- **GitHub**: [dhanabhon](https://github.com/dhanabhon/)

---

Made with ❤️ by Tom Dhanabhon
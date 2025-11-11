/**
 * Terminal Web Application
 * A secure, interactive web terminal for portfolio display
 */
(function() {
  'use strict';

  // Constants for keyboard keys
  const KEYS = {
    ENTER: 'Enter',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    F5: 'F5'
  };

  // DOM Elements
  let before = document.getElementById("before");
  let liner = document.getElementById("liner");
  let command = document.getElementById("typer");
  let textarea = document.getElementById("texter");
  let terminal = document.getElementById("terminal");

  // State variables
  let historyIndex = 0;
  let isPasswordCorrect = false;
  let commandHistory = [];

  // Initialize password mode flag accessible to caret.js
  window.terminalPasswordMode = false;

  /**
   * Escapes HTML to prevent XSS attacks
   * @param {string} unsafe - The unsafe string to escape
   * @returns {string} The escaped string
   */
  function escapeHtml(unsafe) {
    if (typeof unsafe !== 'string') return '';
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * Initialize the terminal
   */
  function init() {
    try {
      setTimeout(function() {
        loopLines(banner, "", 80);
        textarea.focus();
      }, 100);

      // Setup event listeners
      window.addEventListener("keyup", enterKey);

      // Handle click on command area to focus textarea
      const commandArea = document.getElementById("command");
      if (commandArea) {
        commandArea.addEventListener("click", function() {
          if (textarea) textarea.focus();
        });
      }

      // Handle textarea input events
      if (textarea) {
        textarea.addEventListener("keyup", function(e) {
          if (window.typeIt) window.typeIt(textarea, e);
        });

        textarea.addEventListener("keydown", function(e) {
          if (window.typeIt) window.typeIt(textarea, e);
          if (window.moveIt) window.moveIt(textarea.value.length, e);
        });

        textarea.addEventListener("keypress", function(e) {
          if (window.typeIt) window.typeIt(textarea, e);
        });
      }

      // Easter egg in console
      console.log(
        "%cYou hacked my password!😠",
        "color: #04ff00; font-weight: bold; font-size: 24px;"
      );
      console.log("%cPassword: '" + password + "' - I wonder what it does?🤔", "color: grey");

      // Initialize textarea
      textarea.value = "";
      command.textContent = "";
    } catch (error) {
      console.error("Terminal initialization error:", error);
      addLine("Terminal initialization failed. Please refresh.", "error", 0);
    }
  }

  // Handle errors globally
  window.addEventListener('error', function(e) {
    console.error('Terminal error:', e.error);
  });

  /**
   * Handles keyboard input
   * @param {KeyboardEvent} e - The keyboard event
   */
  function enterKey(e) {
    try {
      // F5 key to reload
      if (e.key === KEYS.F5) {
        document.location.reload(true);
        return;
      }

      if (window.terminalPasswordMode) {
        // Password mode - mask input
        let maskedInput = "*".repeat(textarea.value.length);
        command.textContent = maskedInput;

        if (textarea.value === password) {
          isPasswordCorrect = true;
        }

        if (isPasswordCorrect && e.key === KEYS.ENTER) {
          loopLines(secret, "color2 margin", 120);
          command.textContent = "";
          textarea.value = "";
          isPasswordCorrect = false;
          window.terminalPasswordMode = false;
          liner.classList.remove("password");
        } else if (e.key === KEYS.ENTER) {
          addLine("Wrong password", "error", 0);
          command.textContent = "";
          textarea.value = "";
          window.terminalPasswordMode = false;
          liner.classList.remove("password");
        }
      } else {
        // Normal command mode
        if (e.key === KEYS.ENTER) {
          let userCommand = textarea.value.trim();
          commandHistory.push(userCommand);
          historyIndex = commandHistory.length;

          // Display command with escaped HTML to prevent XSS
          addLine("anonymous@dhanabhon.com:~$ " + escapeHtml(userCommand), "no-animation", 0);
          commander(userCommand.toLowerCase());
          command.textContent = "";
          textarea.value = "";
        }

        // Arrow up - previous command
        if (e.key === KEYS.ARROW_UP && historyIndex > 0) {
          historyIndex -= 1;
          textarea.value = commandHistory[historyIndex];
          command.textContent = textarea.value;
        }

        // Arrow down - next command
        if (e.key === KEYS.ARROW_DOWN && historyIndex < commandHistory.length) {
          historyIndex += 1;
          if (commandHistory[historyIndex] === undefined) {
            textarea.value = "";
          } else {
            textarea.value = commandHistory[historyIndex];
          }
          command.textContent = textarea.value;
        }
      }
    } catch (error) {
      console.error("Key handler error:", error);
    }
  }

  /**
   * Executes commands entered by the user
   * @param {string} cmd - The command to execute
   */
  function commander(cmd) {
    try {
      switch (cmd.toLowerCase()) {
        case "help":
          loopLines(help, "color2 margin", 80);
          break;
        case "whois":
          loopLines(whois, "color2 margin", 80);
          break;
        case "whoami":
          openLink("Opening DHANABHON.COM", dhanabhon);
          break;
        case "credit":
          loopLines(credit, "color2 margin", 80);
          break;
        case "version":
          loopLines(version, "color2 margin", 80);
          break;
        case "changelog":
          loopLines(changelog, "color2 margin", 80);
          break;
        case "hbd":
          setTimeout(function() {
            loopLines(hbd1, "", 100);
            textarea.focus();
          }, 100);
          setTimeout(function() {
            loopLines(hbd2, "", 100);
            textarea.focus();
          }, 2000);
          setTimeout(function() {
            loopLines(hbd3, "", 100);
            textarea.focus();
          }, 4000);
          break;
        case "231185":
          setTimeout(function() {
            loopLines(wish, "color2 margin", 100);
            textarea.focus();
          }, 100);
          break;
        case "261185":
          setTimeout(function() {
            addLine("Wrong! Is not your date of birth. try again!", "color2", 100);
            textarea.focus();
          }, 100);
          break;
        case "sudo":
          addLine("Oh no, you're not admin...", "color2", 80);
          setTimeout(function() {
            newTab('https://youtu.be/YnmjpuCm2PA?si=BfJRDUR9SN99MXR0&t=86'); // newTab handles refocusing automatically
          }, 1000);
          break;
        case "socials":
          loopLines(socials, "color2 margin", 80);
          break;
        case "secret":
          liner.classList.add("password");
          window.terminalPasswordMode = true;
          break;
        case "projects":
          openLink("Opening my project on GitHub...", github);
          break;
        case "password":
          addLine("<span class=\"inherit\"> Lol! You're joking, right? You\'re gonna have to try harder than that!😂</span>", "error", 100);
          break;
        case "history":
          addLine("<br>", "", 0);
          loopLines(commandHistory, "color2", 80);
          addLine("<br>", "command", 80 * commandHistory.length + 50);
          break;
        case "email":
          addLine('Opening mailto:<a href="mailto:tom@dhanabhon.com">tom@dhanabhon.com</a>...', "color2", 80);
          newTab(email); // newTab handles refocusing automatically
          break;
        case "clear":
          setTimeout(function() {
            terminal.innerHTML = '<a id="before"></a>';
            before = document.getElementById("before");
          }, 1);
          break;
        case "banner":
          loopLines(banner, "", 80);
          break;
        // Social media commands
        case "twitter":
          openLink("Opening Twitter...", twitter);
          break;
        case "linkedin":
          openLink("Opening LinkedIn...", linkedin);
          break;
        case "github":
          openLink("Opening GitHub...", github);
          break;
        case "stackoverflow":
          openLink("Opening StackOverflow...", stackoverflow);
          break;
        default:
          addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
          break;
      }
    } catch (error) {
      console.error("Commander error:", error);
      addLine("An error occurred executing the command.", "error", 0);
    }
  }

  /**
   * Opens a URL in a new tab with security measures
   * @param {string} link - The URL to open
   */
  function newTab(link) {
    try {
      setTimeout(function() {
        const anchor = document.createElement('a');
        anchor.href = link;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.click();

        // Refocus textarea after link opens to prevent terminal from getting stuck
        setTimeout(function() {
          if (textarea) {
            textarea.focus();
          }
        }, 100);
      }, 500);
    } catch (error) {
      console.error("Error opening link:", error);
      addLine("Failed to open link.", "error", 0);
    }
  }

  /**
   * Opens a link with a message - common pattern for social/external links
   * @param {string} message - The message to display
   * @param {string} link - The URL to open
   */
  function openLink(message, link) {
    addLine(message, "color2", 0);
    newTab(link); // newTab now handles refocusing automatically
  }

  /**
   * Adds a line to the terminal output
   * @param {string} text - The text to display (can contain trusted HTML)
   * @param {string} style - The CSS class to apply
   * @param {number} time - Delay before adding the line (ms)
   */
  function addLine(text, style, time) {
    try {
      let processedText = "";
      // Convert double spaces to non-breaking spaces for formatting
      for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) === " " && text.charAt(i + 1) === " ") {
          processedText += "&nbsp;&nbsp;";
          i++;
        } else {
          processedText += text.charAt(i);
        }
      }

      setTimeout(function() {
        let next = document.createElement("p");
        // Note: innerHTML is used here for trusted content from commands.js
        // User input is escaped before being passed to this function
        next.innerHTML = processedText;
        next.className = style;

        before.parentNode.insertBefore(next, before);
        window.scrollTo(0, document.body.offsetHeight);
      }, time);
    } catch (error) {
      console.error("Error adding line:", error);
    }
  }

  /**
   * Adds multiple lines to the terminal with a delay between each
   * @param {Array<string>} lines - Array of lines to display
   * @param {string} style - The CSS class to apply
   * @param {number} time - Delay between each line (ms)
   */
  function loopLines(lines, style, time) {
    try {
      if (!Array.isArray(lines)) {
        console.error("loopLines: expected array, got:", typeof lines);
        return;
      }
      lines.forEach(function(item, index) {
        addLine(item, style, index * time);
      });
    } catch (error) {
      console.error("Error in loopLines:", error);
    }
  }

  // Initialize the terminal when DOM is ready
  init();

})();

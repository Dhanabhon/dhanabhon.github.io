/**
 * Caret and Input Handler
 * Manages cursor positioning and text input display
 */
(function() {
  'use strict';

  // Constants for keyboard keys
  const KEYS = {
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight'
  };

  let cursor;

  /**
   * Initialize cursor positioning
   */
  function init() {
    cursor = document.getElementById("cursor");
    if (cursor) {
      cursor.style.left = "0px";
    }
  }

  /**
   * Removes newline characters from text
   * @param {string} txt - The text to process
   * @returns {string} Text without newlines
   */
  function removeNewlines(txt) {
    return txt ? txt.replace(/\n/g, '') : '';
  }

  /**
   * Handles text input and displays it in the command line
   * @param {HTMLElement} from - The textarea element
   * @param {Event} e - The event object
   */
  window.typeIt = function(from, e) {
    try {
      e = e || window.event;
      const outputElement = document.getElementById("typer");
      const inputText = from.value;

      if (outputElement) {
        // Check if in password mode (shared via window object)
        if (!window.terminalPasswordMode) {
          // Use textContent to prevent XSS attacks
          outputElement.textContent = removeNewlines(inputText);
        }
      }
    } catch (error) {
      console.error("Error in typeIt:", error);
    }
  };

  /**
   * Handles cursor movement with arrow keys
   * @param {number} count - The length of the current input
   * @param {KeyboardEvent} e - The keyboard event
   */
  window.moveIt = function(count, e) {
    try {
      e = e || window.event;
      if (!cursor) return;

      const currentLeft = parseInt(cursor.style.left) || 0;
      const minLeft = 0 - ((count - 1) * 10);

      if (e.key === KEYS.ARROW_LEFT && currentLeft >= minLeft) {
        cursor.style.left = (currentLeft - 10) + "px";
      } else if (e.key === KEYS.ARROW_RIGHT && (currentLeft + 10) <= 0) {
        cursor.style.left = (currentLeft + 10) + "px";
      }
    } catch (error) {
      console.error("Error in moveIt:", error);
    }
  };

  /**
   * Helper function for getting elements by ID
   * @param {string} elid - The element ID
   * @returns {HTMLElement|null} The element or null
   */
  window.$ = function(elid) {
    return document.getElementById(elid);
  };

  /**
   * Override alert to use console.log for better UX
   * @param {string} txt - The text to log
   */
  window.alert = function(txt) {
    console.log(txt);
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
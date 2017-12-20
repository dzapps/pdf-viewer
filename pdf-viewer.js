(function() {
  'use strict';

  class PdfViewer {
    /**
     * Initiates the class.
     * Sets up the overlay and toolbar.
     */
    constructor() {
      this.pdfsupport = this.checkSupport();
      this.overlay = this.createOverlay();
      this.pdf_url = '';
    }

    /**
     * Check the browser supports PDF viewing.
     */
    checkSupport() {
      // return false;
      if (navigator && navigator.mimeTypes && navigator.mimeTypes['application/pdf']) {
          return true;
      }
      // if browser is Firefox and version 19+
      var firefox_regex = new RegExp('Firefox/([0-9]+)');
      var matches = [];
      if (matches = navigator.userAgent.match(firefox_regex)) {
        if (matches[1] > 19) {
          return true;
        }
      }
      return false;
    }

    /**
     * If the browser doesn't support PDF viewing then create a fallback message
     * and prompt the user to download the file.
     */
    fallbackDownload(pdf_url) {
      var fallback = document.createElement('div');
      fallback.setAttribute('class', 'pdf-view');
      var fallback_inner = document.createElement('div');
      fallback_inner.setAttribute('class', 'pdf-view-no-support');
      fallback_inner.innerHTML = '<p>PDF view isn\'t supported on your browser.<p><p><a class="pdf-view-download" download href="' + pdf_url +'"><span class="icon icon-download">Download the file</a><p>';
      fallback.appendChild(fallback_inner);
      return fallback;
    }

    /**
     * Creates the link that prompts the user to download the PDF.
     * The user should be forced to download the file when clicking the link.
     * @todo: Should this be done via the "download" attribute? can we force it will javascript?
     */
    toolbarDownloadLink(pdf_url) {
      var link = document.createElement('a');
      link.setAttribute('href', pdf_url);
      link.setAttribute('download', pdf_url);
      link.setAttribute('class', 'pdf-download');
      var link_text = document.createElement('span');
      link_text.setAttribute('class', 'icon-download');
      link_text.appendChild(document.createTextNode("Download PDF"));
      link.appendChild(link_text);
      return link;
    }

    /**
     * Creates a link that will be used to close (and destroy) the overlay.
     * @todo: Register and event listener and create a close icon.
     */
    toolbarCloseLink(parent) {
      var close = document.createElement('a');
      close.setAttribute('href', '#close');
      close.setAttribute('class', 'pdf-viewer-close');
      var close_text = document.createElement('span');
      close_text.setAttribute('class', 'icon-close');
      close_text.appendChild(document.createTextNode("Close"));
      close.appendChild(close_text);
      var self = this;
      close.addEventListener('click', this.closeOverlay.bind(this))
      parent.appendChild(close);
      return close;
    }

    /**
     * Generates the markup to display the PDF in an overlay.
     */
    createOverlay() {
      // Create the overlay to display the PDF.
      var overlay = document.createElement('div');
      overlay.className = 'pdf-viewer-overlay';
      this.createToolbar(overlay);
      // Add the overlay to the DOM.
      document.body.appendChild(overlay);
      return overlay;
    }

    /**
     * Destroys the PDF iFrame and download button.
     */
    closeOverlay() {
      this.overlay.style.display = 'none';
    }

    openOverlay() {
      this.overlay.style.display = 'block';
    }

    /**
     * Generate the markup for the viewer toolbar.
     * The toolbar allows the user to download the PDF or close the overlay.
     */
    createToolbar(parent) {
      // Create the toolbar to close the overlay or download the PDF.
      var toolbar = document.createElement('div');
      toolbar.setAttribute('class', 'pdf-viewer-toolbar');
      this.toolbarCloseLink(toolbar);
      parent.appendChild(toolbar);
    }

    /**
     * Load the PDF in an iframe.
     */
    getPDFView(pdf_url) {
      var elem = document.createElement('iframe');
      elem.setAttribute('src', pdf_url);
      elem.setAttribute('class', 'pdf-view');
      return elem;
    }

    /**
     * Update the overlay to display the given pdf URL.
     */
    presentInOverlay(pdf_url) {
      if (this.pdf_url != pdf_url) {
        this.pdf_url = pdf_url;
        var pdf = (this.pdfsupport ? this.getPDFView(pdf_url) : this.fallbackDownload(pdf_url));
        // Remove old pdf.
        var oldpdf = this.overlay.querySelector('.pdf-view');
        if (oldpdf !== null) {
          oldpdf.remove();
        }
        // Add the new.
        this.overlay.appendChild(pdf);
      }
      this.openOverlay();
    }
  }

  // Export the class so that it's available.
  window.PdfViewer = PdfViewer;
})();

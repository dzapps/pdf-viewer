# PDF Viewer

This helper displays PDF content in an overlay when supported otherwise a fallback message is displayed with a download link.

## Usage

```
<link rel="stylesheet" href="pdf_viewer/viewer-styles.css">

<script type="text/javascript" src="pdf_viewer/pdf-viewer.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<script type="text/javascript">
  (function($) {
    $(function() {
      // Initiate the viewer.
      var pdfViewer = new PdfViewer();
      // Add an event listener to all <a> that link to a .pdf
      $('a[href*=\'.pdf\']').on('click', function(e) {
        var href = $(this).attr('href');
        // Present the
        pdfViewer.presentInOverlay(href);
        e.preventDefault();
      });
    })
  })(jQuery);
</script>
```

// Mermaid Diagram Initialization
document.addEventListener('DOMContentLoaded', function() {
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#00ADD8',
        primaryBorderColor: '#00ADD8',
        lineColor: '#F97583',
        secondaryColor: '#238636',
        tertiaryColor: '#1a1a2e'
      },
      flowchart: { htmlLabels: true, curve: 'basis' },
      sequence: { actorMargin: 50, showSequenceNumbers: true },
      securityLevel: 'strict' // Changed from 'loose' for security
    });
    mermaid.run();
  }
});

// Mermaid Diagram Initialization — Dark Theme Matching AegisGate Design
document.addEventListener('DOMContentLoaded', function() {
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        // Background colors (dark theme)
        primaryColor: '#1a1f2e',
        primaryTextColor: '#f8fafc',
        primaryBorderColor: '#38bdf8',
        lineColor: '#38bdf8',
        secondaryColor: '#11141d',
        secondaryTextColor: '#f8fafc',
        secondaryBorderColor: '#10b981',
        tertiaryColor: '#0a0c10',
        tertiaryTextColor: '#94a3b8',
        tertiaryBorderColor: '#64748b',
        mainBkg: '#1a1f2e',
        nodeBkg: '#1a1f2e',
        clusterBkg: '#11141d',
        clusterBorder: '#38bdf8',
        titleColor: '#f8fafc',
        edgeLabelBackground: '#1a1f2e',
        fontSize: '14px',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      },
      flowchart: { 
        htmlLabels: true, 
        curve: 'basis',
        padding: 20,
        nodeSpacing: 50,
        rankSpacing: 50
      },
      sequence: { 
        actorMargin: 50, 
        showSequenceNumbers: true,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        messageAlign: 'center',
        mirrorActors: false,
        bottomMarginAdj: 1,
        useMaxWidth: true,
        rightAngles: true,
        showSequenceNumbers: false
      },
      securityLevel: 'strict'
    });
    mermaid.run();
  }
});

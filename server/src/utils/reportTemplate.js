export const getReportHtml = (report) => `
  <html>
    <head>
      <style>
        body { font-family: Arial; padding: 20px; }
        h1 { color: #2d3748; }
        h2 { margin-top: 20px; }
        ul { margin-left: 20px; }
        .violation { margin-bottom: 15px; border: 1px solid #ccc; padding: 10px; }
      </style>
    </head>
    <body>
      <h1>Accessibility Report</h1>
      <p><strong>URL:</strong> ${report.url || "Uploaded HTML"}</p>
      <p><strong>User Agent:</strong> ${report.environment?.userAgent}</p>
      <p><strong>Window:</strong> ${report.environment?.windowWidth}x${report.environment?.windowHeight}</p>

      <h2>Summary</h2>
      <ul>
        <li>Total Violations: ${report.summary?.totalViolations}</li>
        <li>Total Passes: ${report.summary?.totalPasses}</li>
        <li>Total Incomplete: ${report.summary?.totalIncomplete}</li>
        <li>Total Inapplicable: ${report.summary?.totalInapplicable}</li>
      </ul>

      <h2>Violations</h2>
      ${report.violations?.map(v => `
        <div class="violation">
          <strong>${v.id}</strong> - ${v.description}
          <p><strong>Impact:</strong> ${v.impact}</p>
          <p><a href="${v.helpUrl}" target="_blank">${v.help}</a></p>
          <p><strong>Tags:</strong> ${v.tags.join(', ')}</p>
          ${v.nodes?.map(n => `
            <div style="margin-left:20px">
              <code>${n.html}</code>
              <p>Target: ${n.target.join(', ')}</p>
              <p>${n.failureSummary}</p>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </body>
  </html>
`;

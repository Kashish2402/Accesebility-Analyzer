import React from 'react';

export default function PdfTemplate({ result }) {
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  };

  const thStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    backgroundColor: 'gray',
    fontWeight: 'bold',
    textAlign: 'left',
  };

  const oddStyle = {
    backgroundColor: '#f2f2f2',
  };

  const tdStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
    verticalAlign: 'top',
  };

  const sectionStyle = {
    marginTop: '24px',
  };

  const renderDataTable = (title, data) => (
    <div style={sectionStyle}>
      <h2 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 'bold' }}>{title}</h2>
      <table style={{ ...tableStyle, pageBreakInside: 'auto' }}>
        <thead>
          <tr style={{ pageBreakInside: 'avoid' }}>
            <th style={thStyle}>#</th>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr key={i} style={i % 2 === 0 ? oddStyle : undefined}>
                <td style={tdStyle}>{i + 1}</td>
                <td style={tdStyle}>{item.id}</td>
                <td style={tdStyle}>{item.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={tdStyle}>No items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        color: '#000',
        backgroundColor: '#fff',
        padding: '32px',
        width: '100%',
        fontSize: '14px',
      }}
    >
      <h1 style={{ fontSize: '32px', marginBottom: '24px', textAlign: 'center', fontWeight: 'bold' }}>
        Accessibility Report
      </h1>

      {/* Environment Info Table */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>Environment Summary</h2>
        <table style={tableStyle}>
          <tbody>
            <tr style={oddStyle}>
              <td style={tdStyle}><strong>User Agent</strong></td>
              <td style={tdStyle}>{result?.environment?.userAgent || 'N/A'}</td>
            </tr>
            <tr>
              <td style={tdStyle}><strong>Window Size</strong></td>
              <td style={tdStyle}>
                {result?.environment?.windowWidth} x {result?.environment?.windowHeight}
              </td>
            </tr>
            <tr style={oddStyle}>
              <td style={tdStyle}><strong>URL</strong></td>
              <td style={tdStyle}>{result?.url || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary Table */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>Audit Summary</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Violations</th>
              <th style={thStyle}>Passes</th>
              <th style={thStyle}>Incomplete</th>
              <th style={thStyle}>Inapplicable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={tdStyle}>{result?.violations?.length || 0}</td>
              <td style={tdStyle}>{result?.passes?.length || 0}</td>
              <td style={tdStyle}>{result?.incomplete?.length || 0}</td>
              <td style={tdStyle}>{result?.inapplicable?.length || 0}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Detailed Result Tables */}
      {renderDataTable('Violations', result.violations)}
      {renderDataTable('Passes', result.passes)}
      {renderDataTable('Incomplete', result.incomplete)}
      {renderDataTable('Inapplicable', result.inapplicable)}
    </div>
  );
}

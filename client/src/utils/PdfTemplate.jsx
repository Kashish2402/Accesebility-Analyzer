import React from 'react'
import Summary from '../components/Summary'
import Violation from '../components/Violation'

function PdfTemplate({ result }) {
  return (
    <div className="bg-white text-black w-[80vw] flex flex-col items-center justify-center p-5 gap-10">
      <h1 className="text-3xl font-bold">Accessibility Report</h1>

      <div className="flex flex-wrap items-center justify-center gap-5">
        <div className="w-[200px] h-[100px] bg-gray-300 flex flex-col items-center justify-center rounded">
          <h1 className="text-2xl font-bold">{result.violations?.length || 0}</h1>
          <h2 className="font-semibold">Violations</h2>
        </div>
        <div className="w-[200px] h-[100px] bg-gray-300 flex flex-col items-center justify-center rounded">
          <h1 className="text-2xl font-bold">{result.passes?.length || 0}</h1>
          <h2 className="font-semibold">Passes</h2>
        </div>
        <div className="w-[200px] h-[100px] bg-gray-300 flex flex-col items-center justify-center rounded">
          <h1 className="text-2xl font-bold">{result.incomplete?.length || 0}</h1>
          <h2 className="font-semibold">Incomplete</h2>
        </div>
        <div className="w-[200px] h-[100px] bg-gray-300 flex flex-col items-center justify-center rounded">
          <h1 className="text-2xl font-bold">{result.inapplicable?.length || 0}</h1>
          <h2 className="font-semibold">Inapplicable</h2>
        </div>
      </div>

      <div className="w-full">
        <Summary data={result} />
      </div>

      <div className="w-full">
        <Violation topic="Violations" data={result.violations} />
      </div>
      <div className="w-full">
        <Violation topic="Inapplicable" data={result.inapplicable} />
      </div>
      <div className="w-full">
        <Violation topic="Passes" data={result.passes} />
      </div>
      <div className="w-full">
        <Violation topic="Incomplete" data={result.incomplete} />
      </div>
    </div>
  );
}

export default PdfTemplate;

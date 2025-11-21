import React, { useState, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { Play, RefreshCw, Cpu, Box, Trash2 } from 'lucide-react';
import { curriculum } from './data/curriculum';
import { MemoryBlock } from './components/MemoryBlock';

const App = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("Ready to compile...");
  const [memoryState, setMemoryState] = useState({ stack: [], heap: [] });
  const [isRunning, setIsRunning] = useState(false);

  const currentLesson = curriculum[currentLessonIndex];

  useEffect(() => {
    setCode(currentLesson.initialCode);
    setOutput("Ready...");
    setMemoryState({ stack: [], heap: [] });
  }, [currentLessonIndex]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput("Compiling...");
    
    // シミュレーション実行 (教育用なので、実際のコンパイルではなくシナリオデータをロードする)
    setTimeout(() => {
      setMemoryState(currentLesson.simulationConfig);
      setOutput(currentLesson.simulationConfig.output);
      setIsRunning(false);
    }, 800);
  };

  const handleReset = () => {
    setCode(currentLesson.initialCode);
    setMemoryState({ stack: [], heap: [] });
    setOutput("Reset complete.");
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 font-sans overflow-hidden">
      {/* Sidebar / Curriculum */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-blue-500 flex items-center gap-2">
            <Cpu size={20} /> C-Forge
          </h1>
          <p className="text-xs text-gray-500 mt-1">Visual Memory Debugger</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {curriculum.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => setCurrentLessonIndex(idx)}
              className={`w-full text-left p-3 text-sm border-b border-gray-800 hover:bg-gray-800 transition-colors ${
                currentLessonIndex === idx ? 'bg-blue-900/20 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="font-bold text-gray-300">{lesson.id}</div>
              <div className="text-gray-400 truncate">{lesson.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-gray-800 flex items-center justify-between px-4 bg-gray-900">
          <div>
            <h2 className="font-bold">{currentLesson.title}</h2>
            <p className="text-xs text-gray-400">{currentLesson.description}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-sm transition-colors">
              <RefreshCw size={16} /> Reset
            </button>
            <button onClick={handleRun} className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm font-bold shadow-lg shadow-blue-900/50 transition-all">
              <Play size={16} /> Run Code
            </button>
          </div>
        </div>

        {/* Workspace */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Area */}
          <div className="flex-1 border-r border-gray-800 flex flex-col">
            <Editor
              height="70%"
              defaultLanguage="c"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 16 },
                fontFamily: "'JetBrains Mono', monospace"
              }}
            />
            {/* Console Output */}
            <div className="h-[30%] bg-black border-t border-gray-800 p-4 font-mono text-sm overflow-y-auto">
              <div className="text-gray-500 mb-2 uppercase text-xs tracking-wider">Terminal Output</div>
              <pre className={output.includes("Error") ? "text-red-400" : "text-green-400"}>
                {output}
              </pre>
            </div>
          </div>

          {/* Visualizer Area */}
          <div className="w-96 bg-gray-900 flex flex-col border-l border-gray-800">
            <div className="p-3 border-b border-gray-800 bg-gray-800/50 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Box size={14} /> Memory Map
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Stack Section */}
              <div>
                <h3 className="text-sm font-bold text-purple-400 mb-2 flex items-center justify-between">
                  STACK MEMORY <span className="text-xs text-gray-600">High Address</span>
                </h3>
                <div className="bg-gray-950 border border-gray-700 rounded-lg overflow-hidden shadow-inner">
                  {memoryState.stack.length === 0 ? (
                    <div className="p-4 text-center text-gray-600 text-xs italic">No stack variables</div>
                  ) : (
                    memoryState.stack.map((item, i) => <MemoryBlock key={i} {...item} />)
                  )}
                </div>
              </div>

              {/* Heap Section */}
              <div>
                <h3 className="text-sm font-bold text-orange-400 mb-2 flex items-center justify-between">
                  HEAP MEMORY <span className="text-xs text-gray-600">Low Address</span>
                </h3>
                <div className="bg-gray-950 border border-gray-700 rounded-lg overflow-hidden shadow-inner min-h-[100px]">
                  {memoryState.heap.length === 0 ? (
                    <div className="p-4 text-center text-gray-600 text-xs italic">Empty (No dynamic allocation)</div>
                  ) : (
                    memoryState.heap.map((item, i) => <MemoryBlock key={i} {...item} />)
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

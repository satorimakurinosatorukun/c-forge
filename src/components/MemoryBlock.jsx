import React from 'react';

export const MemoryBlock = ({ address, name, value, type, isPointer, isAllocated = true }) => {
  return (
    <div className={`border-b border-gray-700 p-2 flex items-center justify-between text-xs font-mono transition-all duration-500 ${isAllocated ? 'bg-gray-800' : 'bg-red-900/30'}`}>
      <div className="w-24 text-gray-500">{address}</div>
      
      <div className="flex-1 flex flex-col px-2">
        {name && <span className="text-blue-400 font-bold">{name}</span>}
        <span className="text-gray-400">{type}</span>
      </div>

      <div className={`w-24 text-right font-bold ${isPointer ? 'text-purple-400' : 'text-green-400'}`}>
        {value}
        {isPointer && <span className="block text-[10px] text-gray-600">pointer</span>}
      </div>
    </div>
  );
};

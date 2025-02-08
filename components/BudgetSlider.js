'use client'
import React, { useState } from 'react';

const BudgetSlider = () => {
  const [totalBudget, setTotalBudget] = useState(5000);
  const [showSummary, setShowSummary] = useState(true);
  const [categories, setCategories] = useState([
    { name: 'Housing', emoji: '🏠', percentage: 35, amount: 1750 },
    { name: 'Food', emoji: '🍳', percentage: 15, amount: 750 },
    { name: 'Transportation', emoji: '🚗', percentage: 10, amount: 500 },
    { name: 'Utilities', emoji: '💡', percentage: 10, amount: 500 },
    { name: 'Healthcare', emoji: '🏥', percentage: 10, amount: 500 },
    { name: 'Entertainment', emoji: '🎮', percentage: 5, amount: 250 },
    { name: 'Savings', emoji: '💰', percentage: 10, amount: 500 },
    { name: 'Other', emoji: '📦', percentage: 5, amount: 250 }
  ]);

  // Handler functions remain the same...
  const handlePercentageChange = (index, newValue) => {
    if (isNaN(newValue)) return;
    const newCategories = [...categories];
    const oldValue = newCategories[index].percentage;
    const diff = newValue - oldValue;
    
    const remainingCategories = newCategories.filter((_, i) => i !== index);
    const totalRemaining = remainingCategories.reduce((sum, cat) => sum + cat.percentage, 0);
    
    if (totalRemaining > 0) {
      remainingCategories.forEach(cat => {
        cat.percentage = Math.max(0, cat.percentage - (diff * (cat.percentage / totalRemaining)));
        cat.amount = Math.round((totalBudget * cat.percentage) / 100);
      });
    }
    
    newCategories[index].percentage = newValue;
    newCategories[index].amount = Math.round((totalBudget * newValue) / 100);
    setCategories(newCategories);
  };

  const handleAmountChange = (index, newAmount) => {
    if (isNaN(newAmount)) return;
    const newCategories = [...categories];
    const newPercentage = (newAmount / totalBudget) * 100;
    newCategories[index].percentage = newPercentage;
    newCategories[index].amount = newAmount;
    setCategories(newCategories);
  };

  return (
    <div className="min-h-screen bg-white w-full max-w-[430px] mx-auto flex flex-col pb-safe-bottom">
      <div className="px-5 py-12 flex-1 overflow-y-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Budget Tracker</h1>
        
        <div className="mb-8">
          <label className="block text-xl mb-3 text-gray-700">Monthly Budget</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Math.max(0, Number(e.target.value) || 0))}
              className="w-full p-4 pl-8 text-xl border rounded-xl text-gray-800 bg-gray-50"
            />
          </div>
        </div>

        <div className="space-y-5">
          {categories.map((category, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.emoji}</span>
                  <span className="text-lg font-medium text-gray-700">{category.name}</span>
                </div>
                <span className="text-lg font-medium text-gray-600">
                  {Math.round(category.percentage)}%
                </span>
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                value={category.percentage || 0}
                onChange={(e) => handlePercentageChange(index, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-3"
              />
              
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={category.amount || 0}
                  onChange={(e) => handleAmountChange(index, Number(e.target.value))}
                  className="w-full p-3 pl-8 border rounded-xl text-right text-lg text-gray-800 bg-white"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-50 rounded-xl border border-gray-200">
          <button 
            onClick={() => setShowSummary(!showSummary)}
            className="w-full flex items-center justify-between p-4 text-lg font-medium text-gray-800 hover:text-gray-600"
          >
            <span>Summary</span>
            <span>{showSummary ? '▼' : '▲'}</span>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showSummary ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="px-4 pb-4 space-y-3">
              {categories.map((category, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <span className="text-base text-gray-700">
                    <span className="text-xl mr-2">{category.emoji}</span>
                    {category.name}
                  </span>
                  <div className="text-right">
                    <div className="text-base font-medium text-gray-800">
                      ${Math.round(category.amount)}/mo
                    </div>
                    <div className="text-sm text-gray-600">
                      ${Math.round(category.amount * 12)}/yr
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center font-medium">
                  <span className="text-lg text-gray-800">Total</span>
                  <div className="text-right">
                    <div className="text-lg text-gray-800">${totalBudget}/mo</div>
                    <div className="text-base text-gray-600">${totalBudget * 12}/yr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSlider;
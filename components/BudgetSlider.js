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

  // Handlers remain the same
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
    <div className="min-h-screen bg-white flex justify-center">
      <div className="w-[380px] px-4 pt-12 pb-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Budget Tracker</h1>
        
        <div className="mb-10">
          <h2 className="text-2xl mb-4">Monthly Budget</h2>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">$</span>
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Math.max(0, Number(e.target.value) || 0))}
              className="w-full p-4 pl-8 text-xl border rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-8">
          {categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl">{category.emoji}</span>
                <span className="text-2xl">{category.name}</span>
              </div>
              
              <div className="text-xl font-medium">
                {Math.round(category.percentage)}%
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                value={category.percentage || 0}
                onChange={(e) => handlePercentageChange(index, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">$</span>
                <input
                  type="number"
                  value={category.amount || 0}
                  onChange={(e) => handleAmountChange(index, Number(e.target.value))}
                  className="w-full p-4 pl-8 text-xl border rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button 
            onClick={() => setShowSummary(!showSummary)}
            className="w-full p-4 text-xl font-medium text-left flex justify-between items-center"
          >
            <span>Summary</span>
            <span>{showSummary ? '▼' : '▲'}</span>
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showSummary ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-4 pt-4">
              {categories.map((category, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-xl">
                    <span className="mr-2">{category.emoji}</span>
                    {category.name}
                  </span>
                  <div>
                    <div className="text-xl">${Math.round(category.amount)}/mo</div>
                    <div className="text-gray-600">${Math.round(category.amount * 12)}/yr</div>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center font-medium">
                  <span className="text-xl">Total</span>
                  <div>
                    <div className="text-xl">${totalBudget}/mo</div>
                    <div className="text-gray-600">${totalBudget * 12}/yr</div>
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
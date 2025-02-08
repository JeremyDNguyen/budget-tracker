'use client'
import React, { useState, useEffect } from 'react';

const BudgetSlider = () => {
  const [totalBudget, setTotalBudget] = useState(5000);
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

  useEffect(() => {
    // Update amounts when total budget changes
    const newCategories = categories.map(cat => ({
      ...cat,
      amount: Math.round((totalBudget * cat.percentage) / 100)
    }));
    setCategories(newCategories);
  }, [totalBudget]);

  const handlePercentageChange = (index, newValue) => {
    if (isNaN(newValue)) return;
    
    const newCategories = [...categories];
    const oldValue = newCategories[index].percentage;
    const diff = newValue - oldValue;
    
    // Adjust other categories proportionally
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
    
    if (isNaN(newPercentage)) return;
    
    const oldValue = newCategories[index].percentage;
    const diff = newPercentage - oldValue;
    
    // Adjust other categories proportionally
    const remainingCategories = newCategories.filter((_, i) => i !== index);
    const totalRemaining = remainingCategories.reduce((sum, cat) => sum + cat.percentage, 0);
    
    if (totalRemaining > 0) {
      remainingCategories.forEach(cat => {
        cat.percentage = Math.max(0, cat.percentage - (diff * (cat.percentage / totalRemaining)));
        cat.amount = Math.round((totalBudget * cat.percentage) / 100);
      });
    }
    
    newCategories[index].percentage = newPercentage;
    newCategories[index].amount = newAmount;
    setCategories(newCategories);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Budget Allocation Tool</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700">Total Monthly Budget ($)</label>
        <input
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(Math.max(0, Number(e.target.value) || 0))}
          className="w-full p-2 border rounded text-gray-800"
        />
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium min-w-32 text-gray-700">
                {category.emoji} {category.name}
              </span>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={category.percentage || 0}
                  onChange={(e) => handlePercentageChange(index, Number(e.target.value))}
                  className="w-32"
                />
                <div className="flex gap-2 items-center">
                  <span className="text-sm text-gray-700">$</span>
                  <input
                    type="number"
                    value={category.amount || 0}
                    onChange={(e) => handleAmountChange(index, Number(e.target.value))}
                    className="w-24 p-1 border rounded text-right text-gray-800"
                  />
                </div>
                <div className="text-sm text-gray-600 w-16">
                  {Math.round(category.percentage || 0)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-medium mb-4 text-gray-800">Summary</h3>
        <div className="grid grid-cols-1 gap-3">
          {categories.map((category, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-700">{category.emoji} {category.name}</span>
              <div className="text-right">
                <div className="text-gray-800">${Math.round(category.amount || 0)}/month</div>
                <div className="text-sm text-gray-600">${Math.round((category.amount || 0) * 12)}/year</div>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-3 mt-2">
            <div className="flex justify-between items-center font-medium">
              <span className="text-gray-800">Total:</span>
              <div className="text-right">
                <div className="text-gray-800">${totalBudget}/month</div>
                <div className="text-sm text-gray-600">${totalBudget * 12}/year</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSlider;
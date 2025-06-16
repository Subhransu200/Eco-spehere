
import React, { useState } from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const carbonReductionSuggestions = [
    "Switch to LED lights - reduce carbon by 80%",
    "Use public transport - save 2.6 tons CO2/year",
    "Eat less meat - reduce footprint by 0.8 tons/year",
    "Solar panels - offset 3-4 tons CO2 annually",
    "Bike to work - save 1.6 tons CO2/year",
    "Energy-efficient appliances - reduce 30% energy use",
    "Plant trees - 1 tree absorbs 48 lbs CO2/year",
    "Reduce water heating - save 300 lbs CO2/year"
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const randomSuggestions = carbonReductionSuggestions
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setSuggestions(randomSuggestions);
      setIsLoading(false);
    }, 1000);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      {/* Search Trigger Button */}
      {!isExpanded && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-700 hover:text-eco-green transition-colors"
          onClick={handleExpand}
        >
          <Search className="h-5 w-5" />
        </Button>
      )}

      {/* Expanded Search Field */}
      <div className={cn(
        "absolute right-0 top-0 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out",
        isExpanded 
          ? "w-80 opacity-100 scale-100 z-50" 
          : "w-0 opacity-0 scale-95 pointer-events-none"
      )}>
        {isExpanded && (
          <div className="p-4 space-y-3">
            {/* Search Input */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Ask AI how to reduce carbon footprint..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 pr-4 border-eco-green/30 focus:border-eco-green"
                  autoFocus
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-8 w-8 text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isLoading}
              className="w-full bg-eco-green hover:bg-eco-green-dark"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  AI is thinking...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Ask AI
                </div>
              )}
            </Button>

            {/* AI Suggestions */}
            {suggestions.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-eco-green-dark flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI Carbon Reduction Tips
                </h4>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      className="p-2 bg-eco-green/5 rounded-md border border-eco-green/20 text-sm text-gray-700 hover:bg-eco-green/10 transition-colors cursor-pointer"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={handleClose}
        />
      )}
    </div>
  );
};

export default SearchBar;

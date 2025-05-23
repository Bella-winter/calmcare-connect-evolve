
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface SpecialtyFilterProps {
  specialties: string[];
  selectedSpecialties: string[];
  onSpecialtyChange: (specialties: string[]) => void;
}

export const SpecialtyFilter = ({ 
  specialties, 
  selectedSpecialties, 
  onSpecialtyChange 
}: SpecialtyFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSpecialty = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      onSpecialtyChange(selectedSpecialties.filter(s => s !== specialty));
    } else {
      onSpecialtyChange([...selectedSpecialties, specialty]);
    }
  };

  const clearAllFilters = () => {
    onSpecialtyChange([]);
    setIsOpen(false);
  };

  const getSpecialtyColor = (specialty: string) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200',
      'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200',
      'bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200',
      'bg-pink-100 text-pink-800 border-pink-300 hover:bg-pink-200',
      'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200',
    ];
    return colors[specialty.length % colors.length];
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 hover:bg-emerald-50 hover:border-emerald-300 smooth-transition"
        >
          <Filter className="w-4 h-4" />
          Filter by Specialty
          {selectedSpecialties.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selectedSpecialties.length}
            </Badge>
          )}
        </Button>

        {selectedSpecialties.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-charcoal-600 hover:text-red-600 smooth-transition"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="glass-card p-4 rounded-lg animate-fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {specialties.map((specialty) => {
              const isSelected = selectedSpecialties.includes(specialty);
              return (
                <Badge
                  key={specialty}
                  variant={isSelected ? "default" : "outline"}
                  className={`cursor-pointer smooth-transition text-center py-2 ${
                    isSelected
                      ? 'bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600'
                      : getSpecialtyColor(specialty)
                  }`}
                  onClick={() => toggleSpecialty(specialty)}
                >
                  {specialty}
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      {selectedSpecialties.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-charcoal-600 dark:text-charcoal-300 font-medium">
            Active filters:
          </span>
          {selectedSpecialties.map((specialty) => (
            <Badge
              key={specialty}
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 border-emerald-300 cursor-pointer hover:bg-red-100 hover:text-red-800 hover:border-red-300 smooth-transition"
              onClick={() => toggleSpecialty(specialty)}
            >
              {specialty}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

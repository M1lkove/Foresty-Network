
import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui-custom/Card';

interface FeedbackData {
  id: string;
  name: string;
  avatar?: string;
  company?: string;
  rating: number;
  date: string;
  text: string;
}

interface FeedbackCardProps {
  feedback: FeedbackData;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  // Generate star rating UI
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`star-${i}`} className="w-4 h-4 fill-foresty-400 text-foresty-400" />
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half-star" className="w-4 h-4 fill-foresty-400 text-foresty-400" />
      );
    }
    
    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-star-${i}`} className="w-4 h-4 text-muted" />
      );
    }
    
    return stars;
  };
  
  return (
    <Card variant="glass" className="h-full">
      <CardHeader className="flex flex-row items-center space-y-0 gap-4">
        <div className="h-10 w-10 rounded-full bg-muted flex-shrink-0 overflow-hidden">
          {feedback.avatar ? (
            <img 
              src={feedback.avatar} 
              alt={feedback.name} 
              className="h-full w-full object-cover" 
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-medium">
              {feedback.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{feedback.name}</h4>
          {feedback.company && (
            <p className="text-xs text-muted-foreground">{feedback.company}</p>
          )}
        </div>
        <div className="flex-shrink-0 text-xs text-muted-foreground">
          {feedback.date}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex mb-2">
          {renderStars(feedback.rating)}
        </div>
        <p className="text-sm">{feedback.text}</p>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;

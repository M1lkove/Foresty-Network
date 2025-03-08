
import React, { useState, useEffect } from 'react';
import { Star, Trophy, Award, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface FeedbackItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

const Feedback: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('feedback')
        .select(`
          id,
          rating,
          message,
          created_at,
          user_id,
          profiles:user_id (
            first_name,
            last_name,
            user_type,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching feedback:', error);
        return;
      }

      if (data) {
        const formattedFeedbacks = data.map(item => ({
          id: item.id,
          name: item.profiles ? `${item.profiles.first_name || ''} ${item.profiles.last_name || ''}` : 'Utilisateur anonyme',
          role: item.profiles?.user_type === 'job-poster' ? 'Recruteur' : 'Candidat',
          rating: item.rating,
          comment: item.message || '',
          date: new Date(item.created_at).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          avatar: item.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.profiles?.first_name || 'U')}+${encodeURIComponent(item.profiles?.last_name || 'A')}&background=random`
        }));

        setFeedbacks(formattedFeedbacks);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleStarHover = (hoveredRating: number) => {
    setHoverRating(hoveredRating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      toast({
        title: "Veuillez donner une note",
        description: "Sélectionnez entre 1 et 5 étoiles pour soumettre votre avis.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const feedbackData = {
        rating,
        message: comment,
        user_id: user?.id || null
      };
      
      const { error } = await supabase
        .from('feedback')
        .insert(feedbackData);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Merci pour votre avis !",
        description: "Votre commentaire a été soumis avec succès.",
      });
      
      setSubmitted(true);
      setName('');
      setRating(0);
      setComment('');
      
      // Fetch updated feedbacks
      fetchFeedbacks();
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la soumission de votre avis.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Avis de nos utilisateurs</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez ce que disent nos utilisateurs à propos de Foresty et partagez votre propre expérience
          </p>
        </div>

        {/* Feedback cards container */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {loading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-card rounded-lg border p-6 shadow-sm animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="flex mb-3 space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <div key={star} className="h-4 w-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))
          ) : feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-card rounded-lg border p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <img 
                    src={feedback.avatar} 
                    alt={feedback.name} 
                    className="h-12 w-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{feedback.name}</h3>
                    <p className="text-sm text-muted-foreground">{feedback.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={18} 
                      className={`${star <= feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-2">{feedback.comment}</p>
                <p className="text-xs text-muted-foreground">{feedback.date}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">Aucun avis n'a encore été ajouté. Soyez le premier à partager votre expérience !</p>
            </div>
          )}
        </div>
        
        {/* Submit feedback form */}
        <div className="max-w-lg mx-auto p-6 bg-card rounded-lg border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Partagez votre expérience</h2>
          
          {submitted ? (
            <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 rounded-md p-4 mb-4">
              <p className="font-medium">Merci pour votre avis !</p>
              <p className="mt-1">Votre commentaire a été soumis avec succès.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {!user && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Votre nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Votre évaluation
                </label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1"
                    >
                      <Star 
                        size={24} 
                        className={`cursor-pointer ${
                          star <= (hoverRating || rating) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium mb-1">
                  Votre commentaire
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-primary text-primary-foreground py-2 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors"
                disabled={rating === 0}
              >
                Soumettre mon avis
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;

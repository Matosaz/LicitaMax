import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Heart, Calendar, DollarSign, Trash2, Building, Search } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Favorite {
  id: string;
  bid_id: string;
  bid_title: string;
  bid_description: string | null;
  bid_value: number | null;
  bid_deadline: string | null;
  created_at: string;
}

export default function Favorites() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchFavorites();
  }, [user, navigate]);

  const fetchFavorites = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao carregar favoritos"
      });
    }
    setLoading(false);
  };

  const removeFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) throw error;

      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      toast({
        title: "Sucesso",
        description: "Licitação removida dos favoritos"
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Erro ao remover favorito"
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                  <Heart className="h-8 w-8 text-red-500" />
                  Meus Favoritos
                </h1>
                <p className="text-muted-foreground mt-1">
                  {favorites.length} {favorites.length === 1 ? 'licitação salva' : 'licitações salvas'}
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2"
            >
              <Building className="h-4 w-4" />
              Perfil
            </Button>
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Carregando favoritos...</p>
            </div>
          ) : favorites.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent className="pt-6">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum favorito ainda</h3>
                <p className="text-muted-foreground mb-6">
                  Você ainda não salvou nenhuma licitação. Explore e adicione licitações aos seus favoritos!
                </p>
                <Button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Explorar Licitações
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => (
                <Card key={favorite.id} className="relative group hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary" className="mb-2">
                        ID: {favorite.bid_id}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFavorite(favorite.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">
                      {favorite.bid_title}
                    </CardTitle>
                    {favorite.bid_description && (
                      <CardDescription className="line-clamp-3">
                        {favorite.bid_description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <Separator className="mb-4" />
                    
                    <div className="space-y-3">
                      {favorite.bid_value && (
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-600">
                            {formatCurrency(favorite.bid_value)}
                          </span>
                        </div>
                      )}
                      
                      {favorite.bid_deadline && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-orange-600" />
                          <span className="text-orange-600">
                            Prazo: {formatDate(favorite.bid_deadline)}
                          </span>
                        </div>
                      )}
                      
                      <div className="text-xs text-muted-foreground">
                        Salvo em {formatDate(favorite.created_at)}
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4"
                      onClick={() => {
                        // Navigate to bid details or external link
                        toast({
                          title: "Licitação",
                          description: "Funcionalidade de visualização será implementada em breve"
                        });
                      }}
                    >
                      Ver Detalhes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
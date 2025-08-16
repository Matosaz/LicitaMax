import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, User, Phone, Building, FileText, LogOut } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Mock data - replace with real authentication when backend is ready
  const mockUser = {
    email: 'usuario@exemplo.com',
    id: '1'
  };
  
  const [formData, setFormData] = useState({
    display_name: 'João Silva',
    bio: 'Especialista em licitações públicas com mais de 10 anos de experiência no setor.',
    phone: '(11) 99999-9999',
    company: 'Empresa Exemplo Ltda'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso!"
      });
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    toast({
      title: "Logout",
      description: "Logout será implementado quando o backend estiver pronto"
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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
              <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate('/favorites')}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Favoritos
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2 text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={undefined} />
                    <AvatarFallback className="text-2xl">
                      {formData.display_name ? formData.display_name[0].toUpperCase() : mockUser.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{formData.display_name || 'Usuário'}</CardTitle>
                  <CardDescription>{mockUser.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {formData.company && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="h-4 w-4" />
                        {formData.company}
                      </div>
                    )}
                    {formData.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {formData.phone}
                      </div>
                    )}
                    {formData.bio && (
                      <div>
                        <Separator className="mb-3" />
                        <p className="text-sm text-muted-foreground">{formData.bio}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Edit Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Editar Perfil
                  </CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="display_name">Nome de Exibição</Label>
                        <Input
                          id="display_name"
                          value={formData.display_name}
                          onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                          placeholder="Seu nome"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Nome da empresa"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografia</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Conte um pouco sobre você..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {loading ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
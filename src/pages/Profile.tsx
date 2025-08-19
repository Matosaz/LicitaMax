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
import { ArrowLeft, Save, User, Phone, Building, FileText, LogOut, Edit, Upload, X } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Mock data
  const mockUser = {
    email: 'usuario@exemplo.com',
    id: '1',
    joinDate: '15/03/2022'
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
        description: "Perfil atualizado com sucesso!",
        variant: "success"
      });
      setLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with breadcrumb */}
          <div className="flex flex-col space-y-6 mb-8">
            <nav className="flex items-center text-sm text-muted-foreground">
              <button 
                onClick={() => navigate('/')} 
                className="hover:text-foreground transition-colors"
              >
                Home
              </button>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium">Perfil</span>
            </nav>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
              <div className="flex gap-2">
                {!isEditing ? (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Editar Perfil
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info Card */}
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader className="text-center pb-0">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="h-32 w-32 border-4 border-primary/10">
                      {avatarPreview ? (
                        <AvatarImage src={avatarPreview} />
                      ) : (
                        <AvatarImage src={undefined} />
                      )}
                      <AvatarFallback className="text-4xl bg-gradient-to-r from-primary to-secondary text-white">
                        {formData.display_name ? formData.display_name[0].toUpperCase() : mockUser.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <label 
                        htmlFor="avatar-upload"
                        className="absolute -bottom-2 right-2 bg-background p-2 rounded-full shadow-md border cursor-pointer hover:bg-accent transition-colors"
                      >
                        <Upload className="h-4 w-4" />
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h2 className="text-xl font-semibold">{formData.display_name || 'Usuário'}</h2>
                      <p className="text-muted-foreground">{mockUser.email}</p>
                      <p className="text-sm text-muted-foreground mt-1">Membro desde {mockUser.joinDate}</p>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      {formData.company && (
                        <div className="flex items-start gap-3">
                          <Building className="h-5 w-5 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Empresa</p>
                            <p>{formData.company}</p>
                          </div>
                        </div>
                      )}
                      
                      {formData.phone && (
                        <div className="flex items-start gap-3">
                          <Phone className="h-5 w-5 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Telefone</p>
                            <p>{formData.phone}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {formData.bio && (
                      <>
                        <Separator className="my-4" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Sobre</p>
                          <p className="text-foreground">{formData.bio}</p>
                        </div>
                      </>
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
                    {isEditing ? 'Editar Perfil' : 'Informações do Perfil'}
                  </CardTitle>
                  <CardDescription>
                    {isEditing ? 'Atualize suas informações pessoais' : 'Visualize suas informações pessoais'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="display_name">Nome Completo</Label>
                          <Input
                            id="display_name"
                            value={formData.display_name}
                            onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                            placeholder="Seu nome completo"
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="company">Empresa</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Nome da empresa"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="bio">Biografia</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          placeholder="Conte um pouco sobre você, sua experiência e especializações..."
                          rows={5}
                          className="min-h-[120px]"
                        />
                        <p className="text-sm text-muted-foreground">
                          Este texto aparecerá publicamente em seu perfil.
                        </p>
                      </div>

                      <div className="flex justify-end gap-3 pt-4">
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          disabled={loading}
                          className="flex items-center gap-2"
                        >
                          <Save className="h-4 w-4" />
                          {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-muted-foreground">Nome Completo</Label>
                          <p className="mt-1">{formData.display_name}</p>
                        </div>
                        
                        <div>
                          <Label className="text-muted-foreground">Telefone</Label>
                          <p className="mt-1">{formData.phone}</p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Empresa</Label>
                        <p className="mt-1">{formData.company}</p>
                      </div>

                      <div>
                        <Label className="text-muted-foreground">Biografia</Label>
                        <p className="mt-1 whitespace-pre-line">{formData.bio}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="h-5 w-5" />
                      Documentos
                    </CardTitle>
                    <CardDescription>
                      Seus documentos cadastrados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Nenhum documento cadastrado</p>
                      <Button variant="link" className="mt-2">
                        Adicionar documento
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Building className="h-5 w-5" />
                      Licitações Recentes
                    </CardTitle>
                    <CardDescription>
                      Suas últimas participações
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Nenhuma licitação recente</p>
                      <Button variant="link" className="mt-2">
                        Ver todas
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
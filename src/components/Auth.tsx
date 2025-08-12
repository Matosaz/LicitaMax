import { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Crown, Eye, EyeOff } from "lucide-react";
import { useUser } from "@/UserContext";
import LicitaLogo from '../assets/images/TesteIcon2.png';
import LicitaBg from '../assets/images/Authbg.png';
import './Auth.css'
import { set } from "date-fns";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [tabValue, setTabValue] = useState("login");
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    uppercase: false,
    lowercase: false,
  });
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && window.location.pathname === "/login") {
        // só redireciona se estiver em outra página que não login
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);


  useEffect(() => {
    const validatePassword = () => {
      const minLength = password.length >= 8;
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const uppercase = /[A-Z]/.test(password);
      const lowercase = /[a-z]/.test(password);

      setPasswordValidations({
        minLength,
        hasNumber,
        hasSpecialChar,
        uppercase,
        lowercase,
      });
    };


    validatePassword();
  }, [password]);

  const validationStyle = (valid: boolean) => ({
    color: valid ? "green" : "red",
    fontWeight: valid ? "600" : "400",
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !displayName) {
      toast({ title: "Erro", description: "Preencha todos os campos.", variant: "destructive" });
      return;
    }
  if (Object.values(passwordValidations).includes(false)) {
    toast({
      title:"Senha inválida",
      description: "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
      variant: "warning"
    });
    return;
  }
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: displayName, email, password }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          toast({
            title: "Email já cadastrado",
            description: "Conta já cadastrada. Tente efetuar login",
            variant: "destructive",
          });
        } else if (Object.values(passwordValidations).includes(false)) {
          toast({
            title: "Senha inválida",
            description: "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.",
            variant: "warning"
          })
        }
      } else {
        setTabValue("login");

        toast({ title: "Cadastro realizado!", description: "Faça login para continuar.", variant: "success" });
     
      }
    } catch (error) {
      toast({ title: "Erro no cadastro", description: String(error), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!email || !password ) {
      toast({ title: "Erro", description: "Preencha todos os.", variant: "warning" });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {

        // 🔹 Trata erro de credenciais inválidas
        if (data.message?.toLowerCase().includes("credenciais inválidas")) {
          toast({
            title: "Credenciais inválidas",
            description: "Verifique seu email e senha e tente novamente.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Erro no login",
            description: data.message || "Erro desconhecido",
            variant: "destructive"
          });
        }
      } else {
        localStorage.setItem("token", data.data.token);
        setUser({
          name: data.data.name,
          email: data.data.email,
          });

        toast({ title: "Bem vindo!", description: "Login realizado com sucesso!", variant: "success" });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Não foi possível conectar ao servidor. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className=" min-h-screen bg-gradient-to-bl from-slate-50 to-sky-50 flex items-center justify-center p-4"
    style={{
      backgroundImage: `url(${LicitaBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-4">
            <img src={LicitaLogo} className="h-12 w-12" alt="LicitaMax Logo" />
            <h1 className="text-3xl font-bold text-primary">LicitaMax</h1>
          </div>
          <p className="text-muted-foreground text-center">
            Sua plataforma completa para licitações!
          </p>
        </div>

        <Card className="shadow-lg rounded-2xl border-0 bg-card/100 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">

            <CardTitle className="text-2xl font-bold text-sky-700">
              {tabValue === "login" ? "Que bom tê-lo de volta!" : "Crie sua conta"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Entre ou crie sua conta para continuar
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" value={tabValue} onValueChange={value => setTabValue(value)} className="w-full  rounded p-2">
              <TabsList className="grid w-full grid-cols-2 mb-6 gap-1 bg-gray-50 rounded-xl">
                <TabsTrigger
                  value="login"
                  className="flex items-center  gap-2 rounded-xl data-[state=inactive]:bg-blue-50 data-[state=inactive]:border data-[state=inactive]:border-blue-100
 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  <Lock className="h-4 w-4" />
                  Entrar
                </TabsTrigger>

                <TabsTrigger
                  value="signup"
                  className="flex items-center gap-2  rounded-xl data-[state=inactive]:bg-blue-50 data-[state=inactive]:border data-[state=inactive]:border-blue-100
 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <User className="h-4 w-4" />
                  Cadastrar
                </TabsTrigger>

              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium  text-gray-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seuemail@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium  text-gray-700">
                      Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required

                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-primary hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4 ">
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-sm font-medium  text-gray-700">
                      Nome de exibição
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="displayName"
                        type="text"
                        placeholder="Seu nome"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="pl-10  "
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium  text-gray-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium  text-gray-700">
                      Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                        minLength={8}
                        onFocus={() => setPasswordFocus(true)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {/* Tooltips de validação */}
                    {passwordFocus && (
                      <ul className="mt-1 space-y-1 text-xs">
                        <li style={validationStyle(passwordValidations.minLength)}>
                          {passwordValidations.minLength ? "✓" : "✗"} Pelo menos 8 caracteres
                        </li>
                        <li style={validationStyle(passwordValidations.uppercase)}>
                          {passwordValidations.uppercase ? "✓" : "✗"} Ao mínimo 1 letra maiúscula
                        </li>
                        <li style={validationStyle(passwordValidations.lowercase)}>
                          {passwordValidations.lowercase ? "✓" : "✗"} Ao mínimo 1 letra minúscula
                        </li>
                        <li style={validationStyle(passwordValidations.hasNumber)}>
                          {passwordValidations.hasNumber ? "✓" : "✗"} Um número
                        </li>
                        <li style={validationStyle(passwordValidations.hasSpecialChar)}>
                          {passwordValidations.hasSpecialChar ? "✓" : "✗"} Um caracter especial(ex: !@#$%^&*)
                        </li>
                      </ul>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full  rounded-2xl bg-gradient-primary hover:opacity-90 transition-opacity"
                    disabled={isLoading || Object.values(passwordValidations).includes(false)}
                  >
                    {isLoading ? "Criando conta..." : "Criar conta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
                <Crown className="h-4 w-4 text-premium" />
                <span>Comece com 5 licitações gratuitas</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          Ao criar uma conta, você concorda com nossos <span className="underline font-semibold">termos de uso</span>
        </div>
      </div>
    </div>
  );
}
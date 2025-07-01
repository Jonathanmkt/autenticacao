import { redirect } from 'next/navigation'
import { LogoutButton } from '@/components/logout-button'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  const user = data.user
  const createdAt = new Date(user.created_at || '').toLocaleDateString('pt-BR')

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Área Protegida</h1>
          <LogoutButton />
        </div>

        <Card className="overflow-hidden border border-gray-200 shadow-sm">
          <CardHeader className="bg-white p-6 border-b">
            <CardTitle className="text-xl">Bem-vindo(a) de volta!</CardTitle>
            <CardDescription className="text-gray-600">
              Sua sessão está segura e protegida
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nome</p>
                <p className="font-medium text-gray-900">
                  {user.user_metadata?.full_name || 'Não informado'}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">E-mail</p>
                <p className="font-medium text-gray-900">{user.email}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Conta criada em</p>
                <p className="font-medium text-gray-900">{createdAt}</p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex w-full items-center justify-between">
              <p className="text-sm text-gray-500">
                Sessão segura • {new Date().toLocaleTimeString('pt-BR')}
              </p>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Configurações
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Ações Rápidas</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Segurança',
                description: 'Gerencie suas configurações de segurança e senha'
              },
              {
                title: 'Atividade',
                description: 'Veja o histórico de acesso à sua conta'
              },
              {
                title: 'Notificações',
                description: 'Configure suas preferências de notificação'
              },
              {
                title: 'Preferências',
                description: 'Personalize sua experiência na plataforma'
              }
            ].map((item, index) => (
              <Card key={index} className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

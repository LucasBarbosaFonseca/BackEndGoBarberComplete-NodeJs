# Recuperação de senha

**Requisitos Funcionais**
- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário de poder resetar sua senha.

**Requisitos não funcionais**
- Utilizar Mailtrap para testar envios em ambientes de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job).

**Regras de negócio**
- O link enviado por e-mail para resetar senha, deve expirar em 2H;
- O usuário precisa confirmar a nova senha ao resetar sua senha.

# Atualização de perfil

**Requisitos Funcionais**
- O usuário deve poder atualizar seu nome, email e senha.

**Regras de negócio**
- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha.

# Painel do prestador

**Requisitos Funcionais**
- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas.

**Requisitos não funcionais**
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io.

**Regras de negócio**
- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar.

# Agendamento de serviços

**Requisitos Funcionais**
- O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador.

**Requisitos não funcionais**
- A listagem de prestadores deve ser armazenada em cache.

**Regras de negócio**
- Cada agendamento deve durar 1H exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo.